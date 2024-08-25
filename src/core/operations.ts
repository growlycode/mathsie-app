import { TwisterRandom } from "../infrastructure/random/twister";
import { iterator, shuffle } from "../infrastructure/util/array";
import { EquationWithAnswer, NewUserWorksheet, NewWorkbook } from "./workbook";

export interface NewWorksheetProps {
    leftOperand: string;
    rightOperand: string;
    operationType: string;
    operations: string[];
    numSheets: number;
    numEquationsPerSheet: number;
}

export interface Operand {
    start: number;
    end?: number;
    isRange?: boolean;
}

export const parseOperands = (numStr: string): Operand[] => {

    const splitByComma = numStr.split(',');
    const operands: Operand[] = [];
    for (var i = 0; i < splitByComma.length; i++) {
        const potential = splitByComma[i];
        const num = Number(potential);

        if (!isNaN(num)) {
            operands.push({ start: num });
            continue;
        }

        const splitByRange = potential.split('-');
        if (splitByRange.length !== 2) {
            throw new Error('Invalid range');
        }

        const start = Number(splitByRange[0]);
        const end = Number(splitByRange[1]);
        if (isNaN(start) || isNaN(end)) {
            throw new Error('Invalid range');
        }

        operands.push({ start, end, isRange: true });
    }

    return operands;

}

export interface BasicOperation {
    id: string;
    symbol: string;
    label: string;
    func: (a: number, b: number) => number;
}

export const allOperations: { [key: string]: { operations: BasicOperation[] } } =
{
    basic: {
        operations: [
            {
                id: 'add',
                symbol: '+',
                label: 'Addition',
                func: (a: number, b: number) => a + b
            },
            {
                id: 'sub',
                symbol: '-',
                label: 'Subtraction',
                func: (a: number, b: number) => a - b
            },
            {
                id: 'mult',
                symbol: '*',
                label: 'Multiplication',
                func: (a: number, b: number) => a * b
            }
        ],
    },
    family: {
        operations: [
            {
                id: 'add',
                symbol: '+',
                label: 'Addition',
                func: (a: number, b: number) => a + b
            },
            {
                id: 'sub',
                symbol: '-',
                label: 'Subtraction',
                func: (a: number, b: number) => a - b
            }
        ]
    }
};

const random = new TwisterRandom(new Date().getMilliseconds());

const countOperandsInRanges = (ops: Operand[]) => ops.reduce((acc, curr) => {
    return acc + (!curr.isRange ? 1 : curr.end! - curr.start);
}, 0);


const getOperandList = (ops: Operand[], totalEquations: number) => {

    const numLeftOperands = countOperandsInRanges(ops);

    const lOperandsForBook: number[] = [];
    const totalPerOp = Math.ceil(totalEquations / numLeftOperands);
    console.log(`Total per op: ${totalPerOp}`)

    for (let i = 0; i < ops.length; i++) {
        const op = ops[i];

        if (!op.isRange) {
            console.log(`Total [${op.start}]: ${totalPerOp}`)
            lOperandsForBook.push(...iterator(totalPerOp).map(_ => op.start));
        }
        else {
            const totalForRange = totalPerOp * (op.end! - op.start);

            console.log(`Total for range [${op.start}=${op.end!}]: ${totalForRange}`)
            lOperandsForBook.push(...iterator(totalForRange).map(_ => random.nextInt32([op.start, op.end! + 1])));
        }
    }

    const shuffled = shuffle(lOperandsForBook, (s: number, e: number) => random.nextInt32([s, e]));
    const deltaFromRequired = shuffled.length - totalEquations;
    return deltaFromRequired >= 0 ? shuffled : shuffled.slice(0, deltaFromRequired)
}

const getOperator = (operations: string[], allOps: { [key: string]: BasicOperation }): BasicOperation => {
    const idx = random.nextInt32([0, operations.length]);
    const op = operations[idx];
    return allOps[op];
}

export const createWorkbook = (props: NewWorksheetProps): NewWorkbook => {



    const { numSheets, numEquationsPerSheet, operations, operationType } = props;
    const leftOperands = parseOperands(props.leftOperand);
    const rightOperands = parseOperands(props.rightOperand);

    // Get lists of left and right operands.
    const totalEquations = numSheets * numEquationsPerSheet;
    const leftOps = getOperandList(leftOperands, totalEquations);
    const rightOps = getOperandList(rightOperands, totalEquations);

    const operationsForWb = allOperations[operationType]
        .operations
        .reduce((acc: any, curr: BasicOperation) => {
            acc[curr.id] = curr;
            return acc;
        }, {});

    // Create sheets of equations
    const sheets: NewUserWorksheet<EquationWithAnswer>[] = [];
    for (let s = 0; s < numSheets; s++) {
        const operation = getOperator(operations, operationsForWb);
        const ws: NewUserWorksheet<EquationWithAnswer> = {
            equations: iterator(numEquationsPerSheet).map(_ => {
                const left = leftOps.pop()!;
                const right = rightOps.pop()!;
                return {
                    left,
                    right,
                    hasError: false,
                    symbol: operation.symbol,
                    answer: operation.func(left, right)
                }
            })
        }
        sheets.push(ws);
    }

    return { status: 'Assigned', worksheets: sheets };
}
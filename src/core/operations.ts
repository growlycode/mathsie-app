export interface NewWorksheetProps {
    leftOperand: string;
    rightOperand: string;
    operations: string[];
    numSheets: number;
    numEquationsPerSheet: number;
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
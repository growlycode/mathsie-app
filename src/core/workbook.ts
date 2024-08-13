export interface Operator {
    symbol: string;
    func: (numLeft: number, numRight: number) => number;
}

export interface Operation {
    operandLeft: number;
    operandRight: number;
    operator: Operator;
}

export interface Worksheet {
    operations: Operation[];
}

export interface Workbook {
    title: string;
    worksheets: Worksheet[];
}

export interface UserWorkbook {
    id: string;
    workbook: Workbook;
    worksheets: UserWorksheet[];
}

export interface UserWorksheet {
    id: string;
    worksheet: Worksheet;
    canvasBytes: string | undefined;
}
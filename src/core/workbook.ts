import { CanvasPath } from "../views/components/canvas/types";

export interface Operation {
    left: number;
    right: number;
    symbol: string;
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
    svg: string | undefined;
    paths: CanvasPath[];
}

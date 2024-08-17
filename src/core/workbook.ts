import { CanvasPath } from "../views/components/canvas/types";

export interface Equation {
    left: number;
    right: number;
    symbol: string;
    hasError: boolean;
}

export interface UserWorkbook {
    id: string;
    title: string;
    worksheets: UserWorksheet[];
    hasCorrections: boolean;
}

export interface UserWorksheet {
    id: string;
    equations: Equation[];
    paths: CanvasPath[];
}

import { CanvasPath } from "../views/components/canvas/types";

export interface Equation {
    left: number;
    right: number;
    symbol: string;
}

export interface UserWorkbook {
    id: string;
    worksheets: UserWorksheet[];
    hasCorrections: boolean;
}

export interface UserWorksheet {
    id: string;
    
    equations: Equation[];
    svg: string | undefined;
    paths: CanvasPath[];
}

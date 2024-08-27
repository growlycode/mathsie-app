import { DocumentReference } from "firebase/firestore";
import { CanvasPath } from "../views/components/canvas/types";
import { User } from "./user";


export interface Equation {
    left: number;
    right: number;
    symbol: string;
    hasError: boolean;
}

export interface EquationWithAnswer extends Equation  {
    answer: number;
}

export interface NewUserWorkbook {
    title: string;
    worksheets: UserWorksheet[];
    user: User;
}

export interface UserWorkbook extends NewUserWorkbook {
    id: string;
    userId: DocumentReference;
    status: string;
}

export interface NewUserWorksheet<T extends Equation> {
    equations: T[];
}

export interface NewWorkbook {
    worksheets: NewUserWorksheet<EquationWithAnswer>[];
    status: string;
}

export interface UserWorksheet extends NewUserWorksheet<Equation> {
    id: string;
    paths: CanvasPath[];
}

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

export interface UserWorkbook {
    id: string;
    userId: DocumentReference;
    title: string;
    worksheets: UserWorksheet[];
    status: string;
    user: User;
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

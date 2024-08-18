import { DocumentReference } from "firebase/firestore";
import { CanvasPath } from "../views/components/canvas/types";
import { User } from "./user";

export interface Equation {
    left: number;
    right: number;
    symbol: string;
    hasError: boolean;
}

export interface UserWorkbook {
    id: string;
    userId: DocumentReference;
    title: string;
    worksheets: UserWorksheet[];
    status: string;
    user: User;
}

export interface UserWorksheet {
    id: string;
    equations: Equation[];
    paths: CanvasPath[];
}

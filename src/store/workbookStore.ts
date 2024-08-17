import { create } from "zustand";
import { UserWorkbook } from "../core/workbook";
import { workbookService } from "../api/workbookDb";

interface WorkbookStore {
    workbooks: UserWorkbook[];
    workbook?: UserWorkbook;
    currentPage: number;
    loading: boolean;
    error?: string | undefined;
    fetchWorkbookForUser: () => void;
    saveWorkbook: (wb: UserWorkbook) => void;
    setPage: (page: number) => void;
}

const initialState: Omit<WorkbookStore, "fetchWorkbookForUser" | "saveWorkbook" | "nextPage" | "setPage"> = {
    workbooks: [],
    loading: false,
    currentPage: 0
}


const useWorkbookStore = create<WorkbookStore>((set) => ({
    ...initialState,

    setPage: (page: number) => {
        set(s => {
            // do server save

            const currentPage = Math.min(s.workbook!.worksheets.length, page);
            return ({ ...s, currentPage });
        } )
    },

    saveWorkbook: (workbook: UserWorkbook) => {
        set(s => ({ ...s, workbook }));
    },

    fetchWorkbookForUser: async () => {
        set((state: WorkbookStore) => ({ ...state, loading: true }))
        try {
            const workbook = await workbookService.getWorkbook();
            set(s => ({ ...s, error: undefined, workbook, currentPage: 0 }))
        } catch (error: any) {
            set(s => ({ ...s, error: error.message, loading: false }))
        } finally {
            set(s => ({ ...s, loading: false }))
        }
    },

    saveWorkbookToServer: async (wb: UserWorkbook) => {
        set((state: WorkbookStore) => ({ ...state, loading: true }))
        try {
            const workbook = await workbookService.saveWorkbook(wb);
            set(s => ({ ...s, error: undefined, workbook }))
        } catch (error: any) {
            set(s => ({ ...s, error: error.message, loading: false }))
        } finally {
            set(s => ({ ...s, loading: false }))
        }
    }
}))

export default useWorkbookStore
import { create } from "zustand";
import { UserWorkbook } from "../core/workbook";
import { workbookService } from "../api/workbookService";

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
            const worksheet = s.workbook!.worksheets[currentPage];
            return ({ ...s, currentPage, worksheet: { ...worksheet} });
        } )
    },

    saveWorkbook: (workbook: UserWorkbook) => {
        set(s => ({ ...s, workbook }));
    },

    fetchWorkbookForUser: async () => {
        set((state: WorkbookStore) => ({ ...state, loading: true }))
        try {
            const workbook = await workbookService.getWorkbook();
            set(s => ({ ...s, error: undefined, workbook, currentPage: 0, worksheet: workbook.worksheets[0] }))
        } catch (error: any) {
            set(s => ({ ...s, error: error.message }))
        } finally {
            set(s => ({ ...s, loading: false }))
        }
    }
}))

export default useWorkbookStore
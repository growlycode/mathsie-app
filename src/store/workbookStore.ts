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
    showSidebar: boolean;
    toggleSidebar: () => void;
}

const initialState: Omit<WorkbookStore, "fetchWorkbookForUser" | "saveWorkbook" | "nextPage" | "setPage" | "toggleSidebar"> = {
    workbooks: [],
    loading: false,
    currentPage: 0,
    showSidebar: false
}


const useWorkbookStore = create<WorkbookStore>((set) => {

    const send = async (apiCall: () => Promise<any>) => {
        set((state: WorkbookStore) => ({ ...state, loading: true }))
        try {
            const data = await apiCall();
            set(s => ({ ...s, error: undefined, ...data }))
        } catch (error: any) {
            set(s => ({ ...s, error: error.message, loading: false }))
        } finally {
            set(s => ({ ...s, loading: false }))
        }
    }

    const saveWorkbookToServer = async (wb: UserWorkbook) => {
        send(async () => {
            const workbook = await workbookService.saveWorkbook(wb);
            return { workbook };
        });
    };

    return ({
    ...initialState,

    setPage: (page: number) => {
        set(s => {
            s.workbook && saveWorkbookToServer(s.workbook);
            const currentPage = Math.min(s.workbook!.worksheets.length, page);
            return ({ ...s, currentPage });
        } )
    },

    toggleSidebar: () => {
        set(s => ({ ...s, showSidebar: !s.showSidebar }));
    },

    saveWorkbook: (workbook: UserWorkbook) => {
        set(s => ({ ...s, workbook }));
    },

    fetchWorkbookForUser: async () => {
        return send(async () => {
            const workbook = await workbookService.getWorkbook();
            return { workbook, currentPage: 0 };
        });
    },

    saveWorkbookToServer
})
})

export default useWorkbookStore
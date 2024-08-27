import { create } from "zustand";
import { NewUserWorkbook, UserWorkbook } from "../core/workbook";
import { workbookService } from "../api/workbookDb";
import { User } from "../core/user";

interface WorkbookStore {
    students: User[];
    workbooks: UserWorkbook[];
    workbook?: UserWorkbook;
    currentPage: number;
    loading: boolean;
    error?: string | undefined;
    createWorkbook: (wb: NewUserWorkbook) => void;
    fetchWorkbookForUser: (userId: string) => void;
    fetchWorkbooks: () => void;
    fetchStudents: () => void;
    saveWorkbook: (wb: UserWorkbook) => void;
    setPage: (page: number) => void;
    showSidebar: boolean;
    toggleSidebar: () => void;
}

const initialState: Omit<WorkbookStore, "fetchStudents" | "createWorkbook" | "fetchWorkbookForUser" | "fetchWorkbooks" | "saveWorkbook" | "nextPage" | "setPage" | "toggleSidebar"> = {
    workbooks: [],
    students: [],
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
        set(s => ({ ...s, workbook: { ...workbook, status: 'started'} }));
    },

    fetchStudents: async () => {
        return send(async () => {
            const students = await workbookService.getStudents();
            return { students };
        });
    },


    fetchWorkbookForUser: async (userId: string) => {
        return send(async () => {
            const workbook = await workbookService.getWorkbook(userId);
            return { workbook, currentPage: 0 };
        });
    },

    createWorkbook: async (wb: NewUserWorkbook) => {
        return send(async () => {
            const workbook = await workbookService.createWorkbook(wb);
            return { workbook };
        });
    },

    saveWorkbookToServer,

    submitWorkbook: async (wb: UserWorkbook) => {
        return saveWorkbookToServer({...wb, status: 'submitted'})
    },

    fetchWorkbooks: async () => {
        return send(async () => {
            const workbooks = await workbookService.getWorkbooks();
            return { workbooks };
        });
    },
})
})

export default useWorkbookStore
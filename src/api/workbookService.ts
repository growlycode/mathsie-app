

import { UserWorkbook } from '../core/workbook';
import http from '../infrastructure/http/httpService';

const getWorkbook = (): Promise<UserWorkbook> => {
    return http.get("/workbook", { error: 'Failed to load current workbook for user' });
}

export const workbookService = {
    getWorkbook
};

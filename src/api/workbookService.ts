

import http from '../infrastructure/http/httpService';

const getWorkbook = (): Promise<any> => {
    return http.get("/workbook/FB65E469-C2D0-450D-A616-C4479CAF93A7", { error: 'Failed to load current workbook for user' });
}

export const workbookService = {
    getWorkbook
};

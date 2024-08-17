

import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';

import { db } from './firebase-init';
import { UserWorkbook } from '../core/workbook';


// const workbookConverter = {
//     toFirestore: (wb: UserWorkbook) => {
//         return {
//             id: 
//             title: wb.title,
//             state: wb.state,
//             country: wb.country
//             };
//     },
//     fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
//         const data = snapshot.data(options);
//         return new City(data.name, data.state, data.country);
//     }
// };



async function getWorkbook() {
    const wbRef = collection(db, 'workbooks')//.withConverter(workbookConverter);
    const q = query(wbRef, where("userId", "==", "u123456"));
    const wb = (await getDocs(q)).docs[0].data() as UserWorkbook;
    return wb;
}
async function saveWorkbook(workbook: UserWorkbook) {
    const wbRef = doc(db, 'workbooks', workbook.id)
    await setDoc(wbRef, { ...workbook })
    await updateDoc(wbRef, { timestamp: serverTimestamp() });
    return workbook;
}


export const workbookService = {
    getWorkbook,
    saveWorkbook
};

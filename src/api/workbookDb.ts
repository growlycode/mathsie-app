

import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';

import { db } from './firebase-init';
import { UserWorkbook } from '../core/workbook';
import { User } from '../core/user';


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
    const doc = (await getDocs(q)).docs[0];
    const wb = doc.data() as UserWorkbook;
    wb.id = doc.id;
    return wb;
}
async function saveWorkbook(workbook: UserWorkbook) {
    const wbRef = doc(db, 'workbooks', workbook.id)
    await setDoc(wbRef, { ...workbook })
    await updateDoc(wbRef, { timestamp: serverTimestamp() });
    return workbook;
}

async function getWorkbooks() {
    const wbRef = collection(db, 'workbooks');
    const docs = (await getDocs(wbRef)).docs;

    const uwbs: UserWorkbook[] = [];
    for (let index = 0; index < docs.length; index++) {
        const d = docs[index];
        const uwb = d.data() as UserWorkbook;
        const user = await getDoc(uwb.userId);
        uwb.user = user.data() as User;
        uwbs.push(uwb);
        
    }
    return uwbs;
}



export const workbookService = {
    getWorkbook,
    saveWorkbook,
    getWorkbooks
};

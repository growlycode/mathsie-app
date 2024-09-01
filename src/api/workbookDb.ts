

import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';

import { db } from './firebase-init';
import { NewUserWorkbook, UserWorkbook } from '../core/workbook';
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



async function getWorkbook(userId: string) {
    const wbRef = collection(db, 'workbooks')//.withConverter(workbookConverter);
    
    const userRef = doc(db, 'users', userId);
    const user = await getDoc(userRef);
    const q = query(wbRef, where("userId", "==", user.ref));
    const uwb = (await getDocs(q)).docs[0];
    const wb = uwb.data() as UserWorkbook;
    wb.id = uwb.id;
    return wb;
}

async function createWorkbook(workbook: NewUserWorkbook) {
    const userRef = doc(db, 'users', workbook.user.id);
    const wb: any = { ...workbook, userId: userRef };
    const wbRef = collection(db, 'workbooks')
    await addDoc(wbRef, wb);
    return workbook;
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
        uwb.id = d.id;
        uwbs.push(uwb);
    }
    return uwbs;
}

async function getStudents() {
    const uRef = collection(db, 'users');
    const q = query(uRef, where("groups", "array-contains", "student"));
    const students = (await getDocs(q)).docs;

    return students.map(s => ({ ...s.data(), id: s.id }) as User);
}


export const workbookService = {
    getWorkbook,
    saveWorkbook,
    getWorkbooks,
    createWorkbook,
    getStudents
};

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { db, myFirebase } from '../firebase';

export const DataFirebase = {
  useRandomID: async () => {
    const docRef = doc(db, 'MyTrips', 'Id');
    const isCheck = await getDoc(docRef);
    let id = Math.floor(Math.random() * 900000) + 100000;
    if (!isCheck.exists()) {
      await setDoc(docRef, { Id: [id] }, { merge: true });
    } else {
      const listID: number[] = isCheck.data().Id;
      while (listID.includes(id)) {
        id = Math.floor(Math.random() * 900000) + 100000;
      }
      await updateDoc(docRef, {
        Id: myFirebase.firestore.FieldValue.arrayUnion(id),
      });
    }
    return id;
  },
  useAddUserInformationIntoData: async (
    name: string,
    id: number,
    email: string,
    url: string,
    color: string,
    text: string,
  ) => {
    const docRef = doc(db, 'MyTrips', id.toString());
    const docArrayRef = doc(db, 'MyTrips', 'user list');
    const isCheck = await getDoc(docRef);
    const isCheckAray = await getDoc(docArrayRef);
    const newvalue = {
      name,
      id,
      image: {
        url,
        color,
        text,
      },
      email,
    };
    if (!isCheck.exists()) {
      await setDoc(
        docRef,
        {
          data: newvalue,
        },
        { merge: true },
      );
    }
    if (!isCheckAray.exists()) {
      await setDoc(docArrayRef, { users: [newvalue] }, { merge: true });
    } else {
      await updateDoc(docArrayRef, {
        users: myFirebase.firestore.FieldValue.arrayUnion(newvalue),
      });
    }
  },
};

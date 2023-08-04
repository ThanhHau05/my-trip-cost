import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import type { UserInformation } from '@/constants/select-options';

import { db, myFirebase } from '../firebase';

export const DataFirebase = {
  useRandomID: async () => {
    const docRef = doc(db, 'MyTrips', 'id');
    const isCheck = await getDoc(docRef);
    let id = Math.floor(Math.random() * 900000) + 100000;
    if (!isCheck.exists()) {
      await setDoc(docRef, { id: [id] }, { merge: true });
    } else {
      const listID: number[] = isCheck.data().id;
      while (listID.includes(id)) {
        id = Math.floor(Math.random() * 900000) + 100000;
      }
      await updateDoc(docRef, {
        id: myFirebase.firestore.FieldValue.arrayUnion(id),
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
  useGetUserList: async () => {
    const docRef = doc(db, 'MyTrips', 'user list');
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const userlist: UserInformation[] = isCheck.data().users;
      return userlist;
    }
    return [];
  },
};

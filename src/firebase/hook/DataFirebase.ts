import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import type {
  SelectOptionsInvitation,
  UserInformation,
} from '@/constants/select-options';

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
    uid: string,
    invitation: SelectOptionsInvitation[],
  ) => {
    const docRef = doc(db, 'UserInvitations', uid);
    const docArrayRef = doc(db, 'MyTrips', 'user list');
    const isCheck = await getDoc(docRef);
    const isCheckAray = await getDoc(docArrayRef);
    const newvalue = {
      displayName: name,
      id,
      photoURL: {
        url,
        color,
        text,
      },
      email,
      uid,
    };
    if (!isCheck.exists()) {
      await setDoc(
        docRef,
        {
          invitation,
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
  useCheckEmail: async (email: string) => {
    const docRef = doc(db, 'MyTrips', 'email');
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const { emaillist } = isCheck.data();
      if (emaillist.find((item: string) => item === email)) return true;
    }
    return false;
  },
  useAddEmailCheck: async (email: string) => {
    const docRef = doc(db, 'MyTrips', 'email');
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      await updateDoc(docRef, {
        emaillist: myFirebase.firestore.FieldValue.arrayUnion(email),
      });
    } else {
      await setDoc(docRef, { emaillist: [email] }, { merge: true });
    }
  },
};

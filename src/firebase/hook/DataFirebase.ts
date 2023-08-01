import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { db, myFirebase } from '../firebase';

export const DataFirebase = {
  useCheckName: async (name: string) => {
    const docRef = doc(db, 'MyTrips', 'Name');
    const isCheck = await getDoc(docRef);
    if (!isCheck.exists()) {
      await setDoc(docRef, { name: [name] }, { merge: true });
      return true;
    }
    const listName: string[] = isCheck.data().name;
    if (!listName.includes(name)) {
      await updateDoc(docRef, {
        name: myFirebase.firestore.FieldValue.arrayUnion(name),
      });
      return true;
    }
    return false;
  },
  useRemoveNameInData: async (name: string) => {
    const docRef = doc(db, 'MyTrips', 'Name');
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const listName: string[] = isCheck.data().name;
      if (listName.includes(name)) {
        await updateDoc(docRef, {
          name: myFirebase.firestore.FieldValue.arrayRemove(name),
        });
      }
    }
  },
  useRandomID: async () => {
    const docRef = doc(db, 'MyTrips', 'ID');
    const isCheck = await getDoc(docRef);
    let id = Math.floor(Math.random() * 999999) + 100000;
    if (!isCheck.exists()) {
      await setDoc(docRef, { ID: [id] }, { merge: true });
    } else {
      const listID: number[] = isCheck.data().ID;
      while (listID.includes(id)) {
        id = Math.floor(Math.random() * 999999) + 100000;
      }
      await updateDoc(docRef, {
        ID: myFirebase.firestore.FieldValue.arrayUnion(id),
      });
    }
    return id;
  },
};

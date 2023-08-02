import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { db, myFirebase } from '../firebase';

export const DataFirebase = {
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

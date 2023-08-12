import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import type {
  SelectOptionsInvitation,
  SelectOptionsInvoice,
  SelectOptionsTrip,
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
  useAcceptTheInvitation: async (
    uid: string,
    data: SelectOptionsInvitation,
  ) => {
    const docRef = doc(db, 'UserInvitations', uid);
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      updateDoc(docRef, {
        invitation: myFirebase.firestore.FieldValue.arrayUnion(data),
      });
    }
  },
  useDeleteInvitationTheTripInUserData: async (uid: string, id: number) => {
    const docRef = doc(db, 'UserInvitations', uid);
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const value: SelectOptionsInvitation[] = isCheck.data().invitation;
      const newArray = value.filter((item) => item.tripid !== id);
      await setDoc(docRef, {
        invitation: newArray,
      });
    }
  },
  useJoinTrip: async (id: number, uid: string) => {
    const docRef = doc(db, 'Trips', id.toString());
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const data: SelectOptionsTrip = isCheck.data().trip;
      const userlists: UserInformation[] = data.userlist;
      const updatedData = userlists.map((item) => {
        if (item.uid === uid) {
          return { ...item, status: true };
        }
        return item;
      });
      await setDoc(docRef, { trip: { ...data, userlist: updatedData } });
    }
  },
  useRefuseInvitation: async (uid: string, id: number) => {
    const docRef = doc(db, 'UserInvitations', uid);
    const docTripRef = doc(db, 'Trips', id.toString());
    const isCheck = await getDoc(docRef);
    const isCheckTrip = await getDoc(docTripRef);
    if (isCheck.exists()) {
      const data: SelectOptionsInvitation[] = isCheck.data().invitation;
      const updatedData = data.filter((item) => item.tripid !== id);
      await updateDoc(docRef, { invitation: updatedData || [] });
    }
    if (isCheckTrip.exists()) {
      const data: SelectOptionsTrip = isCheckTrip.data().trip;
      const newuserlist = data.userlist.filter((item) => item.uid !== uid);
      await setDoc(docTripRef, { trip: { ...data, userlist: newuserlist } });
    }
  },
  useRandomIdCreateTrip: async () => {
    const docRef = doc(db, 'Trips', 'id');
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
  useCreateTrip: async (id: number, data: SelectOptionsTrip) => {
    const docRef = doc(db, 'Trips', id.toString());
    const isCheck = await getDoc(docRef);
    if (!isCheck.exists()) {
      await setDoc(docRef, { trip: data }, { merge: true });
    }
  },
  useGetTrip: async (id: number) => {
    const docRef = doc(db, 'Trips', id.toString());
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const trips: SelectOptionsTrip = isCheck.data().trip;
      return trips;
    }
    return undefined;
  },
  useGetTripMaster: async (id: number) => {
    const trip = await DataFirebase.useGetTrip(id);
    if (trip) {
      const master = trip.tripmaster;
      if (master) {
        const userlist = await DataFirebase.useGetUserList();
        const user = userlist.find((item) => item.uid === master);
        return user;
      }
    }
    return undefined;
  },
  useGetInvitation: async (uid: string) => {
    const docRef = doc(db, 'UserInvitations', uid);
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const value: SelectOptionsInvitation[] = isCheck.data().invitation;
      return value;
    }
    return [];
  },
  // useDeleteUserInTrip: async (uid: string, id: number) => {
  //   const docRef = doc(db, 'Trips', id.toString());
  //   const docInvitationRef = doc(db, 'UserInvitations', uid);
  //   const trip = await DataFirebase.useGetTrip(id);
  //   if (trip) {
  //     const userInvitation = await DataFirebase.useGetInvitation(uid);
  //     const newUserInvitation = userInvitation?.filter(
  //       (item) => item.tripid !== id,
  //     );
  //     await setDoc(docInvitationRef, { invitation: newUserInvitation });
  //     const userlists = trip.userlist;
  //     const newuserlist = userlists.filter((item) => item.uid !== uid);
  //     await setDoc(docRef, { trip: { ...trip, userlist: newuserlist } });
  //   }
  // },
  useDeleteTheTrip: async (id: number) => {
    const docRef = doc(db, 'Trips', id.toString());
    const docIdListRef = doc(db, 'Trips', 'id');
    await deleteDoc(docRef);
    const isCheck = await getDoc(docIdListRef);
    if (isCheck.exists()) {
      const idlist: number[] = isCheck.data().id;
      const newidlist = idlist.filter(
        (item) => item.toString() !== id.toString(),
      );
      await setDoc(docIdListRef, { id: newidlist });
    }
  },
  useGetUserListInTrip: async (id: number) => {
    const docRef = doc(db, 'Trips', id.toString());
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const { trip } = isCheck.data();
      return trip.userlist;
    }
    return [];
  },
  useAddInvoiceIntoTripData: async (id: number, data: SelectOptionsInvoice) => {
    const docRef = doc(db, 'Trips', id.toString());
    const trip = await DataFirebase.useGetTrip(id);
    if (trip) {
      const vlaueInvoice = [...(trip.invoice || []), data];
      await setDoc(docRef, { trip: { ...trip, invoice: vlaueInvoice } });
    }
  },
  useGetInvoiceIntoTripData: async (id: number) => {
    const trip = await DataFirebase.useGetTrip(id);
    if (trip) {
      return trip.invoice;
    }
    return [];
  },
  useGetStatusTrip: async (id: number) => {
    const trip = await DataFirebase.useGetTrip(id);
    if (trip) {
      return trip.status;
    }
    return undefined;
  },
};

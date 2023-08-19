import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import type {
  SelectOptionsInvitation,
  SelectOptionsInvoice,
  SelectOptionsTrip,
  UserInformation,
  VerticalMenuUserInfo,
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
  // useGetInvitation: async (uid: string) => {
  //   const docRef = doc(db, 'UserInvitations', uid);
  //   const isCheck = await getDoc(docRef);
  //   if (isCheck.exists()) {
  //     const value: SelectOptionsInvitation[] = isCheck.data().invitation;
  //     return value;
  //   }
  //   return [];
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
  useUpdateInvoiceIntoTripData: async (
    id: number,
    data: SelectOptionsInvoice[],
  ) => {
    const docRef = doc(db, 'Trips', id.toString());
    const trip = await DataFirebase.useGetTrip(id);
    if (trip) {
      const cleanedData = data.filter(
        (item) => item.money !== 0 || item.moneySuggest !== 0,
      );
      let newValue: SelectOptionsInvoice[] = [];
      if (trip.invoice) {
        newValue = trip.invoice;
      }
      newValue?.push(...cleanedData);

      await setDoc(docRef, {
        trip: { ...trip, invoice: newValue },
      });
    }
  },
  useGetInvoiceInTripData: async (id: number) => {
    const trip = await DataFirebase.useGetTrip(id);
    if (trip) {
      return trip.invoice;
    }
    return [];
  },
  // useGetStatusTrip: async (id: number) => {
  //   const trip = await DataFirebase.useGetTrip(id);
  //   if (trip) {
  //     return trip.status;
  //   }
  //   return undefined;
  // },
  // useMinusReserveMoney: async (id: number, minusMoney: number) => {
  //   const docRef = doc(db, 'Trips', id.toString());
  //   const trip = await DataFirebase.useGetTrip(id);
  //   const reserveMoney = trip?.reservemoney;
  //   if (reserveMoney) {
  //     const newMoney = reserveMoney - minusMoney;
  //     await setDoc(docRef, { trip: { ...trip, reservemoney: newMoney } });
  //   }
  // },
  useGetUserInfoInTrip: async (uid: string, id: number) => {
    const trip = await DataFirebase.useGetTrip(id);
    if (trip) {
      const { userlist } = trip;
      if (userlist) {
        const value = userlist.find((item) => item.uid === uid);
        return value;
      }
    }
    return undefined;
  },
  useDeleteInvoice: async (id: number, idInvoice: string) => {
    const invoice = await DataFirebase.useGetInvoiceInTripData(id);
    if (invoice) {
      const newListMoney: VerticalMenuUserInfo[] = [];
      const newInvoice = invoice.filter((item) => {
        if (item.id === idInvoice) {
          newListMoney.push({
            money: (item.money || item.moneySuggest) * item.qty,
            uid: item.uid,
          });
          return false;
        }
        return true;
      });
      const docRef = doc(db, 'Trips', id.toString());
      const trip = await DataFirebase.useGetTrip(id);
      if (trip) {
        const { userlist } = trip;
        const newuserlist = userlist.map((item1) => {
          const valueFind = newListMoney?.find(
            (item2) => item2.uid === item1.uid,
          );
          if (valueFind) {
            return {
              ...item1,
              totalmoney: (item1.totalmoney || 0) - valueFind.money,
            };
          }
          return item1;
        });
        await setDoc(docRef, {
          trip: { ...trip, invoice: newInvoice, userlist: newuserlist },
        });
      }
    }
  },
  useAddTempoaryNotice: async (uid: string, trip: SelectOptionsTrip) => {
    const docRef = doc(db, 'UserInvitations', uid);
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      await setDoc(docRef, { ...isCheck.data(), temporaryNotice: trip });
    }
  },
  // useAddTripIntoUserHistory: async (uid: string, trip: SelectOptionsTrip) => {
  //   const docRef = doc(db, 'UserInvitations', uid);
  //   const isCheck = await getDoc(docRef);
  //   if (isCheck.exists()) {
  //     const valueTripHistory = isCheck.data().tripHistory;
  //     if (valueTripHistory) {
  //       await updateDoc(docRef, {
  //         ...isCheck.data(),
  //         tripHistory: myFirebase.firestore.FieldValue.arrayUnion(trip),
  //       });
  //     } else {
  //       await setDoc(docRef, { ...isCheck.data(), tripHistory: [trip] });
  //     }
  //   }
  // },
  useAddTotalForUser: async (id: number, valueUserList: UserInformation[]) => {
    const docRef = doc(db, 'Trips', id.toString());
    const trip = await DataFirebase.useGetTrip(id);
    if (trip) {
      await setDoc(docRef, { trip: { ...trip, userlist: valueUserList } });
    }
  },
  // useDeductMoneyOfUser: async (id: number, uid: string, money: number) => {
  //   const docRef = doc(db, 'Trips', id.toString());
  //   const trip = await DataFirebase.useGetTrip(id);
  //   if (trip) {
  //     const { userlist } = trip;
  //     const newuserlist = userlist.map((item) => {
  //       if (item.uid === uid) {
  //         return {
  //           ...item,
  //           totalmoney: item.totalmoney ? item.totalmoney - money : money,
  //         };
  //       }
  //       return item;
  //     });
  //     await setDoc(docRef, { trip: { ...trip, userlist: newuserlist } });
  //   }
  // },
};

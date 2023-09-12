import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import {
  handleGetTimeAndDate,
  handleRandomIdInvoice,
} from '@/components/pages';
import type {
  SelectOptionsInvitation,
  SelectOptionsInvoice,
  SelectOptionsTrip,
  UserInformation,
  VerticalMenuUserInfo,
} from '@/constants/select-options';

import { db, myFirebase } from '../firebase';

export const DataFirebase = {
  RandomID: async () => {
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
  AddUserInformationIntoData: async (
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
  GetUserList: async () => {
    const docRef = doc(db, 'MyTrips', 'user list');
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const userlist: UserInformation[] = isCheck.data().users;
      return userlist;
    }
    return [];
  },
  CheckEmail: async (email: string) => {
    const docRef = doc(db, 'MyTrips', 'email');
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const { emaillist } = isCheck.data();
      if (emaillist.find((item: string) => item === email)) return true;
    }
    return false;
  },
  AddEmailCheck: async (email: string) => {
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
  AcceptTheInvitation: async (uid: string, data: SelectOptionsInvitation) => {
    const docRef = doc(db, 'UserInvitations', uid);
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      await updateDoc(docRef, {
        invitation: myFirebase.firestore.FieldValue.arrayUnion(data),
      });
    }
  },
  DeleteInvitationTheTripInUserData: async (uid: string, id: number) => {
    const docRef = doc(db, 'UserInvitations', uid);
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const value: SelectOptionsInvitation[] = isCheck.data().invitation;
      const newArray = value.filter((item) => item.tripid !== id);
      await setDoc(docRef, {
        ...isCheck.data(),
        invitation: newArray,
      });
    }
  },
  JoinTrip: async (id: number, uid: string) => {
    const docRef = doc(db, 'Trips', id.toString());
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const data: SelectOptionsTrip = isCheck.data().trip;
      const userlists: UserInformation[] = data.userlist;
      const updatedData = userlists.map((item) => {
        if (item.uid === uid) {
          return { ...item, status: true, reload: true };
        }
        return item;
      });
      await setDoc(docRef, { trip: { ...data, userlist: updatedData } });
    }
  },
  RefuseInvitation: async (uid: string, id: number) => {
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
  RandomIdCreateTrip: async () => {
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
  CreateTrip: async (id: number, data: SelectOptionsTrip) => {
    const docRef = doc(db, 'Trips', id.toString());
    const isCheck = await getDoc(docRef);
    if (!isCheck.exists()) {
      await setDoc(docRef, { trip: data }, { merge: true });
    } else {
      await setDoc(
        docRef,
        { trip: { ...isCheck.data(), data } },
        { merge: true },
      );
    }
  },
  GetTrip: async (id: number) => {
    const docRef = doc(db, 'Trips', id.toString());
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const trips: SelectOptionsTrip = isCheck.data().trip;
      return trips;
    }
    return undefined;
  },
  GetTripMaster: async (id: number) => {
    const trip = await DataFirebase.GetTrip(id);
    if (trip) {
      const master = trip.tripmaster;
      if (master) {
        const userlist = await DataFirebase.GetUserList();
        const user = userlist.find((item) => item.uid === master);
        return user;
      }
    }
    return undefined;
  },
  DeleteTheTrip: async (id: number) => {
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
  GetUserListInTrip: async (id: number) => {
    const docRef = doc(db, 'Trips', id.toString());
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      const { trip } = isCheck.data();
      return trip.userlist;
    }
    return [];
  },
  UpdateInvoiceIntoTripData: async (
    id: number,
    data: SelectOptionsInvoice[],
  ) => {
    const docRef = doc(db, 'Trips', id.toString());
    const trip = await DataFirebase.GetTrip(id);
    if (trip) {
      let newValue: SelectOptionsInvoice[] = [];
      if (trip.invoice) {
        newValue = trip.invoice;
      }
      newValue?.push(...data);
      await setDoc(docRef, {
        trip: { ...trip, invoice: newValue },
      });
    }
  },
  GetInvoiceInTripData: async (id: number) => {
    const trip = await DataFirebase.GetTrip(id);
    if (trip) {
      return trip.invoice;
    }
    return [];
  },
  GetUserInfoInTrip: async (uid: string, id: number) => {
    const trip = await DataFirebase.GetTrip(id);
    if (trip) {
      const { userlist } = trip;
      if (userlist) {
        const value = userlist.find((item) => item.uid === uid);
        return value;
      }
    }
    return undefined;
  },
  DeleteInvoice: async (id: number, idInvoice: string) => {
    const invoice = await DataFirebase.GetInvoiceInTripData(id);
    if (invoice) {
      const newListMoney: VerticalMenuUserInfo[] = [];
      const newInvoice = invoice.filter((item) => {
        const { totalMoney, uid } = item.invoice?.info || {};
        if (item.invoice?.info.id === idInvoice && uid) {
          newListMoney.push({
            money: totalMoney || 0,
            uid,
          });
          return false;
        }
        return true;
      });
      const docRef = doc(db, 'Trips', id.toString());
      const trip = await DataFirebase.GetTrip(id);
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
  AddTempoaryNotice: async (uid: string, trip: SelectOptionsTrip) => {
    const docRef = doc(db, 'UserInvitations', uid);
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      await setDoc(docRef, { ...isCheck.data(), temporaryNotice: trip });
    }
  },
  AddTotalForUser: async (id: number, valueUserList: UserInformation[]) => {
    const docRef = doc(db, 'Trips', id.toString());
    const trip = await DataFirebase.GetTrip(id);
    if (trip) {
      await setDoc(docRef, { trip: { ...trip, userlist: valueUserList } });
    }
  },
  AddUserInTheTrip: async (
    id: number,
    newUserList: UserInformation[],
    user: UserInformation,
  ) => {
    const docRef = doc(db, 'Trips', id.toString());
    const trip = await DataFirebase.GetTrip(id);
    if (trip) {
      const { displayName, photoURL, uid } = user;
      const dataInvoice: SelectOptionsInvoice[] = [];
      const time = handleGetTimeAndDate();
      const idAddUser = handleRandomIdInvoice();
      const data: SelectOptionsInvoice = {
        addUser: {
          id: idAddUser,
          name: displayName,
          time,
          personAdded: {
            avatar: {
              url: photoURL.url || '',
              color: photoURL.color || '',
              text: photoURL.text || '',
            },
            uid,
          },
          personBeAdded: [],
        },
      };
      newUserList.map(async (item) => {
        if (item.uid) {
          if (trip.status) {
            data.addUser?.personBeAdded.push({
              avatar: {
                url: item.photoURL.url || '',
                color: item.photoURL.color || '',
                text: item.photoURL.text || '',
              },
              name: item.displayName,
              uid: item.uid,
            });
          } else {
            const dataInvatation: SelectOptionsInvitation = {
              avtmaster: {
                url: photoURL.url || '',
                color: photoURL.color || '',
                text: photoURL.text || '',
              },
              name: displayName,
              tripid: id,
              tripname: trip.tripname,
              dateandtime: time,
              status: false,
              uid: item.uid,
            };
            await DataFirebase.AcceptTheInvitation(item.uid, dataInvatation);
          }
        }
      });
      dataInvoice.push(data);
      await DataFirebase.UpdateInvoiceIntoTripData(id, dataInvoice);
      const UserList = [...trip.userlist, ...newUserList];
      const newTrip = await DataFirebase.GetTrip(id);
      await updateDoc(docRef, {
        trip: {
          ...newTrip,
          userlist: UserList,
        },
      });
    }
  },
};

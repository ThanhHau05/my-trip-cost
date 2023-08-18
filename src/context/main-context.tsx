import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useEffect, useRef, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { isCheckEmailFormat } from '@/components/pages';
import type { UserInformation } from '@/constants/select-options';
import { auth, DataFirebase } from '@/firebase';
import { selector, TripActions, UserActions } from '@/redux';

interface MainProps {
  showverticalmenu: boolean;
  setShowVerticalMenu: Dispatch<SetStateAction<boolean>>;
  sliderRef: MutableRefObject<any>;
  loadingstartnow: boolean;
  setLoadingStartNow: Dispatch<SetStateAction<boolean>>;
  onSubmitStartNow: (
    namevalue: string,
    setNameValue: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    email: string,
    setEmail: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    password: string,
    setPassword: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    url: string,
    color: string,
    text: string,
  ) => Promise<void>;
  showcreatethetrip: boolean;
  setShowCreateTheTrip: Dispatch<SetStateAction<boolean>>;
  name: {
    value: string;
    error: string;
  };
  setName: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  AddUserInformationIntoRedux: (
    id: number,
    url: string,
    color: string,
    text: string,
    name: string,
    email: string,
    uid: string,
  ) => void;
  contentconfirm: string;
  setConentConfirm: Dispatch<SetStateAction<string>>;
  onSubmitEcceptToCancelTheTrip: () => Promise<void>;
  showaddinvoice: boolean;
  setShowAddInvoice: Dispatch<SetStateAction<boolean>>;
  finishthetrip: string;
  setFinishTheTrip: Dispatch<SetStateAction<string>>;
  showtriphistory: boolean;
  setShowTripHistory: Dispatch<SetStateAction<boolean>>;
}

export const MainContext = createContext({} as MainProps);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [createUserWithEmailAndPassword, userEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const { currentUserInformation } = useSelector(selector.user);
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const dispatch = useDispatch();

  const [loadingstartnow, setLoadingStartNow] = useState(false);
  const [showverticalmenu, setShowVerticalMenu] = useState(false);
  const [showcreatethetrip, setShowCreateTheTrip] = useState(false);
  const [name, setName] = useState({ value: '', error: '' });
  const [id, setId] = useState(0);
  const [contentconfirm, setConentConfirm] = useState('');
  const [showaddinvoice, setShowAddInvoice] = useState(false);
  const [finishthetrip, setFinishTheTrip] = useState('');
  const [showtriphistory, setShowTripHistory] = useState(false);

  const sliderRef = useRef<any>();

  useEffect(() => {
    const handle = async () => {
      if (userEmailAndPassword && id !== 0 && currentUserInformation) {
        DataFirebase.useAddUserInformationIntoData(
          name.value,
          id,
          userEmailAndPassword.user.email || '',
          currentUserInformation.photoURL?.url || '',
          currentUserInformation.photoURL?.color || '',
          currentUserInformation.photoURL?.text || '',
          userEmailAndPassword.user.uid,
          [],
        );
      }
    };
    handle();
  }, [userEmailAndPassword, id, currentUserInformation]);

  const isCheckSubmitStartNow = async (
    namevalue: string,
    setNameValue: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    email: string,
    setEmail: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    password: string,
    setPassword: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
  ) => {
    let isError = false;
    const valueEmail = isCheckEmailFormat(email);
    if (!email) {
      isError = true;
      setEmail({ value: '', error: 'Please enter your email' });
    } else if (email && valueEmail) {
      isError = true;
      setEmail({ value: email, error: valueEmail });
    } else if (email && (await DataFirebase.useCheckEmail(email))) {
      isError = true;
      setEmail({ value: email, error: 'This email is already in use' });
    }
    if (!password) {
      isError = true;
      setPassword({ value: '', error: 'Please enter your password' });
    } else if (password && password.length < 8) {
      isError = true;
      setPassword({ value: password, error: 'Password is too short' });
    }
    if (!namevalue) {
      isError = true;
      setNameValue({ value: '', error: 'Please enter your name' });
    } else if (namevalue && namevalue.length <= 4) {
      isError = true;
      setNameValue({ value: namevalue, error: 'Name is too short' });
    }
    return !isError;
  };

  const onSubmitStartNow = async (
    namevalue: string,
    setNameValue: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    email: string,
    setEmail: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    password: string,
    setPassword: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    url: string,
    color: string,
    text: string,
  ) => {
    if (
      await isCheckSubmitStartNow(
        namevalue,
        setNameValue,
        email,
        setEmail,
        password,
        setPassword,
      )
    ) {
      await DataFirebase.useAddEmailCheck(email);
      createUserWithEmailAndPassword(email, password);
      const newid = await DataFirebase.useRandomID();
      AddUserInformationIntoRedux(
        newid,
        url,
        color,
        text,
        namevalue,
        userEmailAndPassword?.user.uid || '',
      );
      setId(newid);
    }
  };

  const AddUserInformationIntoRedux = (
    idValue: number,
    url: string,
    color: string,
    text: string,
    nameValue: string,
    uid: string,
  ) => {
    setTimeout(async () => {
      dispatch(
        UserActions.setCurrentUserInformation({
          id: idValue,
          photoURL: {
            url,
            color: url ? '' : color,
            text: url ? '' : text,
          },
          displayName: nameValue,
          uid,
          status: false,
        }),
      );
      setLoadingStartNow(false);
    }, 2700);
    setLoadingStartNow(true);
  };

  const onSubmitEcceptToCancelTheTrip = async () => {
    const trip = await DataFirebase.useGetTrip(currentIdJoinTrip);
    const userlists = trip?.userlist;
    if (userlists) {
      const value: UserInformation[] = userlists?.filter((item) => item.id);
      DataFirebase.useRefuseInvitation(
        currentUserInformation.uid,
        currentIdJoinTrip,
      );
      if (value.length === 1) {
        await DataFirebase.useDeleteTheTrip(currentIdJoinTrip);
      }
    }
    dispatch(TripActions.setCurrentIdJoinTrip(0));
  };

  const value = {
    showverticalmenu,
    setShowVerticalMenu,
    sliderRef,
    loadingstartnow,
    setLoadingStartNow,
    onSubmitStartNow,
    showcreatethetrip,
    setShowCreateTheTrip,
    name,
    setName,
    AddUserInformationIntoRedux,
    contentconfirm,
    setConentConfirm,
    onSubmitEcceptToCancelTheTrip,
    showaddinvoice,
    setShowAddInvoice,
    finishthetrip,
    setFinishTheTrip,
    showtriphistory,
    setShowTripHistory,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

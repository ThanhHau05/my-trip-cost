import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Slider from 'react-slick';

import type { SelectOptionsInvitation } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { auth, db } from '@/firebase';

import { MainPage } from './mainpage';
import { NotificationPage } from './notificationpage';

export const SliderPage = () => {
  const [user] = useAuthState(auth);

  const { sliderRef } = useContext(MainContext);
  const [invitationlist, setInvitationList] = useState<
    SelectOptionsInvitation[]
  >([]);

  useEffect(() => {
    console.log(invitationlist);
  }, [invitationlist]);

  useEffect(() => {
    const handleInvitation = (uid: string) => {
      if (uid) {
        const docRef = doc(db, 'UserInvitations', uid);
        onSnapshot(docRef, (data) => {
          if (data.exists()) {
            const invitationData = data.data();
            setInvitationList(invitationData.invitation);
          }
        });
      }
    };

    handleInvitation(user?.uid || '');
  }, [user]);

  const settings = {
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextandPrev />,
    prevArrow: <NextandPrev />,
  };

  return (
    <Slider ref={sliderRef} {...settings}>
      <MainPage />
      <NotificationPage />
    </Slider>
  );
};

const NextandPrev = () => {
  return <div style={{ display: 'none' }} />;
};

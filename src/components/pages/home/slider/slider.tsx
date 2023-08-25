import { useContext } from 'react';
import Slider from 'react-slick';

import type { SelectOptionsInvitation } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

import { MainPage } from './mainpage';
import { NotificationPage } from './notificationpage';

export const SliderPage = ({ data }: { data: SelectOptionsInvitation[] }) => {
  const { sliderRef, setValueCheckPage } = useContext(MainContext);

  const settings = {
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextandPrev />,
    prevArrow: <NextandPrev />,
    afterChange: (e: any) => {
      if (e === 0) {
        setValueCheckPage('home');
      } else {
        setValueCheckPage('invitation');
      }
    },
  };

  return (
    <Slider ref={sliderRef} {...settings}>
      <MainPage />
      <NotificationPage currentData={data} />
    </Slider>
  );
};

const NextandPrev = () => {
  return <div style={{ display: 'none' }} />;
};

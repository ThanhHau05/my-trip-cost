import { useContext } from 'react';
import Slider from 'react-slick';

import type { SelectOptionsInvitation } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

import { MainPage } from './mainpage';
import { NotificationPage } from './notificationpage';

export const SliderPage = ({ data }: { data: SelectOptionsInvitation[] }) => {
  const { sliderRef } = useContext(MainContext);

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
      <MainPage currentNumberOfNoti={data.length} />
      <NotificationPage currentData={data} />
    </Slider>
  );
};

const NextandPrev = () => {
  return <div style={{ display: 'none' }} />;
};

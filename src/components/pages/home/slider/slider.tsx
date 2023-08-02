import Slider from 'react-slick';

import { MainPage } from './mainpage';
import { NotificationPage } from './notificationpage';

export const SliderPage = () => {
  const settings = {
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Next />,
    prevArrow: <Prev />,
  };

  return (
    <Slider {...settings}>
      <MainPage />
      <NotificationPage />
    </Slider>
  );
};

const Next = () => {
  return <div style={{ display: 'none' }} />;
};

const Prev = () => {
  return <div style={{ display: 'none' }} />;
};

import { useContext } from 'react';

import { AmountOfMoneyOfUser, Button, VerticalMenu } from '@/components/base';
import { TripHeader, WrapperHeader } from '@/components/layout';
import { MainContext } from '@/context/main-context';

const TripDetail = () => {
  const { showverticalmenu } = useContext(MainContext);

  return (
    <WrapperHeader
      bgWhite
      header={<TripHeader tripName="Trip 1" money={50000} />}
    >
      {showverticalmenu ? (
        <VerticalMenu>
          <h2 className="pb-2 font-medium">People</h2>
          <div className="dropdown h-[calc(100%-100px)] overflow-auto">
            <AmountOfMoneyOfUser
              name="HauNguyen"
              url="https://lh3.googleusercontent.com/a/AAcHTtdb5ZItA3BDojhwftTd3N2UNjqyeIe5Fww1rX5ZWj4=s360-c-no"
              color="123455"
              text="H"
              money={60000}
            />
          </div>
          <div className="mt-2 h-12 w-full">
            <Button title="Finish the trip" />
          </div>
        </VerticalMenu>
      ) : null}
    </WrapperHeader>
  );
};

// export async function getServerSideProps(context) {
//   const { tripId } = context.query;

//   // Truy vấn dữ liệu từ Firestore hoặc API dựa trên tripId
//   // Ví dụ: const tripData = await fetchTripData(tripId);

//   // Đảm bảo trả về dữ liệu như prop để sử dụng trong component
//   return {
//     props: {
//       trip: tripData, // Thay bằng dữ liệu thực tế từ Firestore hoặc API
//     },
//   };
// }

export default TripDetail;

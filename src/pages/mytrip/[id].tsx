import { useContext } from 'react';

import {
  AmountOfMoneyOfUser,
  Button,
  Invoice,
  VerticalMenu,
} from '@/components/base';
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
      <div className="h-full w-full px-3 pt-5">
        <div className="dropdown h-[calc(100%-73px)] w-full overflow-auto pr-2">
          <div className="flex items-center">
            <div className="ml-[18px] mr-3 inline-block h-3 w-3 rounded-full bg-gray-800" />
            <div className="flex flex-col">
              <span className="text-lg">Start the trip</span>
              <span>10.00 PM - 09/08/2023</span>
            </div>
          </div>
          <Invoice
            name="HauNguyen"
            activity="Shopping"
            qty={2}
            description="buy a water bottle"
            money={50000}
            time="10.00 PM - 09/08/2023"
            url="https://lh3.googleusercontent.com/a/AAcHTtdb5ZItA3BDojhwftTd3N2UNjqyeIe5Fww1rX5ZWj4=s360-c-no"
            color="123455"
            text="H"
          />
          <Invoice
            name="HauNguyen"
            activity="Shopping"
            qty={2}
            money={50000}
            time="10.00 PM - 09/08/2023"
            url="https://lh3.googleusercontent.com/a/AAcHTtdb5ZItA3BDojhwftTd3N2UNjqyeIe5Fww1rX5ZWj4=s360-c-no"
            color="123455"
            text="H"
          />
          <Invoice
            name="HauNguyen"
            activity="Shopping"
            money={50000}
            time="10.00 PM - 09/08/2023"
            url="https://lh3.googleusercontent.com/a/AAcHTtdb5ZItA3BDojhwftTd3N2UNjqyeIe5Fww1rX5ZWj4=s360-c-no"
            color="123455"
            text="H"
          />
        </div>
        <div className="mt-3 h-12 w-full">
          <Button title="Add Invoice" />
        </div>
      </div>
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

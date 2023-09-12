import type { Dispatch, SetStateAction } from 'react';

import { Input } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';

import { onChangeCompanions } from './handle-create-the-trip';
import { RenderSearchUser } from './render-search-user';
import { RenderUserListAdded } from './RenderUserListAdded';

export const RenderOptionsInput = ({
  tripname,
  setTripName,
  setCompanions,
  companions,
  setUserListAdded,
  userlistadded,
  userlist,
}: {
  tripname: {
    value: string;
    error: string;
  };
  setTripName: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  companions: {
    value: string;
    error: string;
  };
  setCompanions: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  userlist: UserInformation[];
  userlistadded: UserInformation[];
  setUserListAdded: Dispatch<SetStateAction<UserInformation[]>>;
}) => {
  return (
    <div className="h-[calc(100%-5rem)]">
      <Input
        onChangeText={(e) => setTripName({ value: e, error: '' })}
        title="Trip name"
        value={tripname.value}
        error={tripname.error}
        maxLength={15}
      />
      <div className="mt-12 h-full">
        <Input
          onChangeText={(e) => onChangeCompanions(e, setCompanions)}
          title="Add fellow companions"
          value={companions.value}
          error={companions.error}
          placeholder="name or id"
        />
        <div className="relative mt-2 h-2/5">
          {companions.value ? (
            <RenderSearchUser
              data={userlist}
              searchvalue={companions.value}
              setUserListAdded={setUserListAdded}
              userlistadded={userlistadded}
              setInputValue={setCompanions}
            />
          ) : null}
          <div className="h-full">
            <span className="mb-2 text-sm">
              The fellow companions on the journey include:
            </span>
            <RenderUserListAdded
              data={userlistadded}
              setUserListAdded={setUserListAdded}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

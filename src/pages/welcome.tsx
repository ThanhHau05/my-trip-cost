import { useState } from 'react';

import {
  ContainerWelcome,
  CreateAccount,
  LoginByAccount,
} from '@/components/pages';

export const Welcome = () => {
  const [ischeckcreatenow, setIsCheckCreateNow] = useState(false);
  const [ischecklogin, setischecklogin] = useState(false);

  if (ischeckcreatenow || ischecklogin) {
    if (ischeckcreatenow) {
      return (
        <CreateAccount
          setBackToMainPage={setIsCheckCreateNow}
          ischeckcreatenow={ischeckcreatenow}
        />
      );
    }
    if (ischecklogin) {
      return <LoginByAccount setBackToMainPage={setischecklogin} />;
    }
    return (
      <ContainerWelcome
        setCheckLogin={setischecklogin}
        setCheckCreateNow={setIsCheckCreateNow}
      />
    );
  }
  return (
    <ContainerWelcome
      setCheckLogin={setischecklogin}
      setCheckCreateNow={setIsCheckCreateNow}
    />
  );
};

import { useContext, useEffect, useState } from 'react';

import {
  ContainerWelcome,
  CreateAccount,
  LoginByAccount,
} from '@/components/pages';
import { MainContext } from '@/context/main-context';

const Welcome = () => {
  const [ischeckcreatenow, setIsCheckCreateNow] = useState(false);
  const [ischecklogin, setischecklogin] = useState(false);
  const { setLoadingStartNow } = useContext(MainContext);

  useEffect(() => {
    setLoadingStartNow(false);
  }, []);

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

export default Welcome;

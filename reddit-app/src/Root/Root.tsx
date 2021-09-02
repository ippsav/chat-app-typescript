import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "urql";

import userSessionAtom from "#root/recoil/atoms/userSessionAtom";
import Initialised from "./Initialised";

const query = `
{
  userSession(me:true){
    user{
      username
      email
    }
    createdAt
  }
}
`;

const Root = () => {
  const [userSession, setUserSession] = useRecoilState(userSessionAtom);
  const [{ fetching, data }] = useQuery({ query });
  useEffect(() => {
    const userSession = data?.userSession ?? null;
    setUserSession(userSession);
  }, [fetching, data]);
  return fetching ? null : <Initialised />;
};

export default Root;

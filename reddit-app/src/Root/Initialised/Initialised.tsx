import userSessionAtom from "#root/recoil/atoms/userSessionAtom";
import PrivateRoute from "#root/utils/components/routing/PrivateRoute";
import { Switch } from "react-router-dom";
import { useRecoilState } from "recoil";
import Login from "./Login";
import Main from "./Main";
import Register from "./Register";

const Initialised = () => {
  const [userSession] = useRecoilState(userSessionAtom);
  return (
    <Switch>
      <PrivateRoute
        path="/register"
        allowVisit={!userSession}
        redirectTo="/"
        component={Register}
      />
      <PrivateRoute
        path="/login"
        allowVisit={!userSession}
        redirectTo="/"
        component={Login}
      />
      <PrivateRoute
        path="/"
        allowVisit={!!userSession}
        redirectTo="/login"
        component={Main}
      />
    </Switch>
  );
};

export default Initialised;

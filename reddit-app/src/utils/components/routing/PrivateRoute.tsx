import { ComponentType, FC, ReactElement } from "react";
import {
  RouteComponentProps,
  RouteProps,
  Route,
  Redirect,
} from "react-router-dom";

interface CommonProps extends RouteProps {
  allowVisit: boolean;
  redirectTo: string;
}
type Props =
  | (CommonProps & { component: ComponentType<RouteComponentProps> })
  | (CommonProps & { render: (props: RouteComponentProps) => ReactElement });

const PrivateRoute: FC<Props> = ({
  allowVisit,
  redirectTo,
  render,
  component: Component,
  ...rest
}) => {
  const renderedComponent = Component
    ? (props: RouteComponentProps) => <Component {...props} />
    : render!;
  return (
    <Route
      {...rest}
      render={(props) =>
        allowVisit ? (
          renderedComponent(props)
        ) : (
          <Redirect
            to={{ pathname: redirectTo, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

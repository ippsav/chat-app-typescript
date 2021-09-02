import {
  Button,
  Card,
  Classes,
  Elevation,
  FormGroup,
  InputGroup,
  Intent,
} from "@blueprintjs/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

import useGeneratedId from "#root/utils/hooks/useGeneratedId";
import { useMutation } from "urql";
import { useRecoilState } from "recoil";

import userSessionAtom from "#root/recoil/atoms/userSessionAtom";
import toaster from "#utils/components/toaster";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Form = styled.form`
  width: 25rem;
  margin: auto;
`;
const Header = styled.strong.attrs({ className: Classes.HEADING })`
  font-size: 1.7rem;
  display: block;
  margin-bottom: 0.75rem;
`;
const LargeFormGroup = styled(FormGroup)`
  &:nth-child(3) {
    padding-bottom: 1.24rem;
  }
  .bp3-label {
    font-size: 1rem;
  }
`;

const mutation = `
mutation Login($email:String!,$password:String!){
  createUserSession(email:$email,password:$password){
    user{
      username
      email
    }
    createdAt
  }
}
`;

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [, setUserSession] = useRecoilState(userSessionAtom);
  const generateId = useGeneratedId();
  const [_, login] = useMutation(mutation);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const onSubmit = async ({ email, password }: FormData) => {
    const res = await login({ email, password });
    if (res.error)
      toaster.show({
        intent: Intent.DANGER,
        message: res.error.graphQLErrors[0].message,
      });
    else {
      const userSession = res.data.createUserSession ?? null;
      setUserSession(userSession);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card elevation={Elevation.THREE}>
          <Header>Login</Header>
          <LargeFormGroup label="Email" labelFor={generateId("email")}>
            <InputGroup
              autoFocus
              disabled={isSubmitting}
              type="email"
              id={generateId("email")}
              placeholder="Email"
              large
              {...register("email")}
            />
          </LargeFormGroup>
          <LargeFormGroup label="Password" labelFor={generateId("password")}>
            <InputGroup
              disabled={isSubmitting}
              id={generateId("password")}
              placeholder="Password"
              type="password"
              large
              {...register("password")}
            />
          </LargeFormGroup>
          <Button
            intent={Intent.SUCCESS}
            type="submit"
            loading={isSubmitting}
            large
          >
            Login
          </Button>
          {" or "}
          <Link to="/register">Sign up</Link>
        </Card>
      </Form>
    </Wrapper>
  );
};

export default Login;

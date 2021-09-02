import userSessionAtom from "#root/recoil/atoms/userSessionAtom";
import toaster from "#root/utils/components/toaster";
import useGeneratedId from "#root/utils/hooks/useGeneratedId";
import {
  Intent,
  Card,
  Elevation,
  InputGroup,
  Button,
  Classes,
  FormGroup,
} from "@blueprintjs/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useMutation } from "urql";

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
  &:nth-child(4) {
    padding-bottom: 1.24rem;
  }
  .bp3-label {
    font-size: 1rem;
  }
`;

const mutation = `
mutation Register($email:String!,$username:String!,$password:String!){
  createUser(email:$email,username:$username,password:$password){
      username
    createdAt
  }
}
`;

interface FormData {
  email: string;
  username: string;
  password: string;
}

const Register = () => {
  const [userCreated, setUserCreated] = useState(false);
  const generateId = useGeneratedId();
  const [_, Register] = useMutation(mutation);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>();
  const onSubmit = async ({ username, email, password }: FormData) => {
    const res = await Register({ email, username, password });
    if (res.error)
      toaster.show({
        intent: Intent.DANGER,
        message: res.error.graphQLErrors[0].message,
      });
    else {
      const isCreated = !!res.data.createUser;
      setUserCreated(isCreated);
    }
  };
  return !userCreated ? (
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
          <LargeFormGroup label="Username" labelFor={generateId("username")}>
            <InputGroup
              disabled={isSubmitting}
              id={generateId("username")}
              placeholder="Username"
              large
              {...register("username")}
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
            Register
          </Button>
          {" or "}
          <Link to="/login">Sign In</Link>
        </Card>
      </Form>
    </Wrapper>
  ) : (
    <Redirect to="/login" />
  );
};

export default Register;

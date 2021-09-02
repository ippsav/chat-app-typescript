import styled from "styled-components";
import { Card } from "@blueprintjs/core";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const StyledSideBar = styled(Card)`
  width: 19%;
`;
const ChatContainer = styled.div`
  overflow: auto;
  flex: 1;
`;

const Main = () => {
  return (
    <Wrapper>
      <StyledSideBar></StyledSideBar>
      <ChatContainer></ChatContainer>
    </Wrapper>
  );
};

export default Main;

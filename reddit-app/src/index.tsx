import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { render } from "react-dom";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import { Provider } from "urql";
import { BrowserRouter } from "react-router-dom";

import client from "./api/client";
import Root from "./Root";

const GlobalStyle = createGlobalStyle`
  html,body{
    padding: 0;
    margin: 0;
  }
  html,body,#app{
    background-color: whitesmoke;
    width: 100%;
    height: 100%;
  }
`;

render(
  <Provider value={client}>
    <RecoilRoot>
      <BrowserRouter>
        <GlobalStyle />
        <Root />
      </BrowserRouter>
    </RecoilRoot>
  </Provider>,
  document.querySelector("#app")
);

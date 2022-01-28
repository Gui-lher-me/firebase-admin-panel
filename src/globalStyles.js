import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Poppins', sans-serif;
  }

  body {
    box-sizing: border-box;
    margin: 0;
    padding: 10px;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  p {
    margin: 0;
  }
`;

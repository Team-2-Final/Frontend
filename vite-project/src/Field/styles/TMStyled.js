import { createGlobalStyle } from 'styled-components';

const TMStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: "Pretendard", "Noto Sans KR", sans-serif;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, select, textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }
`;

export default TMStyle;

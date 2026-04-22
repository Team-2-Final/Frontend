import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App.jsx';
import GlobalStyle from './GlobalStyle.js';
import theme from './Field/styles/theme.js';

createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </>,
);

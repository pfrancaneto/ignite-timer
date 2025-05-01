import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router';

import { Router } from './Router';

import { defaultTheme } from './styles/theme/default';
import { GlobalStyle } from './styles/global';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

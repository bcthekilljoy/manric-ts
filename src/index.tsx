import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

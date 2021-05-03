import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7E101D',
      light: '#F98890',
      dark: '#790009',
    },
    secondary: {
      main: '#2E4389',
      light: '#6B7DB3',
      dark: '#0A1D54',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    subtitle1: {
      color: 'white',
      fontWeight: 600,
      lineHeight: '92px',
      fontSize: '1.5rem',
    },
    subtitle2: { color: 'white', fontWeight: 600 },
  },
  overrides: {
    MuiInputLabel: {
      shrink: {
        transform: 'translate(0px, 0px)',
      },
    },
    MuiInputBase: {
      root: {},
      formControl: {},
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderRadius: 4,
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: '#1D131D',
          borderRadius: '24px 0 0 24px',
        },
      },
    },
    MuiTypography: {
      root: {},
    },
  },
});

export default theme;

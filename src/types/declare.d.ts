// declare module 'axios' {
// interface AxiosRequestConfig {
//   catch?: boolean;
//   retry?: number;
//   retryDelay?: number;
// }
// }

import '@mui/material/styles';
import '@mui/material/Button';
import type { color } from '@mui/material/Button';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

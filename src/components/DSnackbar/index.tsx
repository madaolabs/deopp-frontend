import { createRoot } from 'react-dom/client';
import { Alert, Snackbar } from '@mui/material';

let flag = false;

export class DSnackbar {
  static success(text: string, duration = 2000) {
    if (flag) return;
    flag = true;
    const container = document.createElement('div');
    const JSXDom = (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        style={{ borderRadius: '20px', bottom: '60px' }}
      >
        <Alert
          severity="success"
          className="h-10 items-center break-all !py-10 !px-6"
          style={{ backgroundColor: '#222', color: '#D3D3D3', borderRadius: '20px' }}
        >
          <div>{text}</div>
        </Alert>
      </Snackbar>
    );
    const root = createRoot(container);
    root.render(JSXDom);
    document.body.appendChild(container);
    setTimeout(() => {
      flag = false;
      document.body.removeChild(container);
    }, duration);
  }

  static error(text: string, duration = 2000) {
    if (flag) return;
    flag = true;
    const container = document.createElement('div');
    const JSXDom = (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        style={{ borderRadius: '20px', bottom: '60px', padding: '30px' }}
      >
        <Alert
          severity="error"
          icon={<div className="put-icon put-icon-18">&#xe6af;</div>}
          style={{ backgroundColor: '#222', color: '#D3D3D3', borderRadius: '20px' }}
          className="h-10 items-center break-all !py-8 !px-6"
        >
          <div>{text}</div>
        </Alert>
      </Snackbar>
    );
    const root = createRoot(container);
    root.render(JSXDom);
    document.body.appendChild(container);
    setTimeout(() => {
      flag = false;
      document.body.removeChild(container);
    }, duration);
  }

  static info(text: string, duration = 2000) {
    if (flag) return;
    flag = true;
    const container = document.createElement('div');
    const JSXDom = (
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        style={{ borderRadius: '20px', bottom: '60px' }}
      >
        <Alert
          severity="info"
          icon={<div className="put-icon put-icon-18">&#xe6af;</div>}
          style={{ backgroundColor: '#222', color: '#D3D3D3', borderRadius: '20px' }}
          className="h-10 items-center"
        >
          <div>{text}</div>
        </Alert>
      </Snackbar>
    );
    const root = createRoot(container);
    root.render(JSXDom);
    document.body.appendChild(container);
    setTimeout(() => {
      flag = false;
      document.body.removeChild(container);
    }, duration);
  }
}

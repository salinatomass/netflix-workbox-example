import { Workbox } from 'workbox-window';

const registerServiceWorker = () => {
  if (process.env.NODE_ENV !== 'production') return;

  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');

    wb.addEventListener('installed', e => {
      if (e.isUpdate) {
        if (confirm('New app update is available, Click OK to refresh!')) {
          window.location.reload();
        }
      }
    });

    wb.register();
  }
};

export default registerServiceWorker;

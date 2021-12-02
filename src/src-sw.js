import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import * as googleAnalytics from 'workbox-google-analytics';
import { registerRoute } from 'workbox-routing';
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

clientsClaim();
self.skipWaiting();

// _____Precaching main files:
precacheAndRoute(self.__WB_MANIFEST);

// Google Analytics offline:
googleAnalytics.initialize();

// _____Google fonts:
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Only status success
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30,
      }),
    ],
  })
);

// _____Caching CSS and JavaScript files:
registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// _____Caching images:
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 Days
      }),
    ],
  })
);

// _____Caching third party API Response:
registerRoute(
  ({ url }) =>
    url.origin === 'https://api.themoviedb.org' ||
    url.pathname === '/3/discover/tv',
  new NetworkFirst({
    cacheName: 'movie-api-response',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 1,
      }),
    ],
  })
);

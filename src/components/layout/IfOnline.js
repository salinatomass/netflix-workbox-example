import React, { useEffect, useState } from 'react';

const IfOnline = () => {
  const [onLine, setOnLine] = useState(navigator ? navigator.onLine : true);

  const goOnline = () => setOnLine(true);
  const goOffline = () => setOnLine(true);

  useEffect(() => {
    if (!window) return;

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (onLine) return null;

  return <p className="offline">You're not online. Check the connection 😥</p>;
};

export default IfOnline;

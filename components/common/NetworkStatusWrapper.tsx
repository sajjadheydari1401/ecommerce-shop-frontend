"use client";

import { useEffect, useState } from "react";

export function NetworkStatusWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Set initial status
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOffline(!navigator.onLine);

    // Handle online/offline events
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <>
      {/* Offline Alert Banner */}
      {isOffline ? (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-3 text-center shadow-lg">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>No internet connection. Please check your network.</span>
          </div>
        </div>
      ) : (
        <div className={isOffline ? "pt-12" : ""}>{children}</div>
      )}
    </>
  );
}

"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            fontFamily: "system-ui",
          }}
        >
          <h1>Something went wrong!</h1>
          <p>
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

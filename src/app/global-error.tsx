"use client";

import { useEffect } from "react";

/**
 * Root error boundary (catches errors in the root layout itself). Must render
 * its own <html>/<body> and stay self-contained — providers aren't available
 * here. Inline styles keep it working even if CSS failed to load.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#060812",
          color: "#eaecf5",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Something went wrong
        </h1>
        <p style={{ color: "#969cb4", maxWidth: "28rem" }}>
          A critical error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            fontWeight: 600,
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}

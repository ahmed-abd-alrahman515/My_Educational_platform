"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

/**
 * Route-segment error boundary. Catches render/runtime errors in any page and
 * offers a recovery path without a hard reload.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for debugging; a real app would log to a service here.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-danger/10 text-danger">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-muted">
        An unexpected error occurred. You can try again or head back home — your
        progress is saved locally.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline">
            <Home className="h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </div>
    </Container>
  );
}

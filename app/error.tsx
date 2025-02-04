'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h1 className="text-3xl font-bold tracking-tight">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground">
            {error.message || 'An unexpected error occurred'}
          </p>
          {error.digest && (
            <p className="text-sm text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            variant="default"
            onClick={reset}
            className="w-full sm:w-auto"
          >
            Try again
          </Button>
          <Button
            variant="outline"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href="/">
              Return home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

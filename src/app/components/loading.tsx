import { Suspense } from "react";

export function Loading({ children }) {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-[var(--color-text-grey-300)] mt-4">Loading...</p>
      </div>
    }>
      {children}
    </Suspense>
  );
}
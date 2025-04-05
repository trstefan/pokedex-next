import type React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <h1 className="mt-4 text-2xl font-bold">Loading...</h1>
    </div>
  );
};

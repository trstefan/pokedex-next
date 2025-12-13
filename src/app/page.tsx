"use client";

import LandingPage from "@/components/LandingPage";

export default function Page() {
  return (
    <main className="antialiased text-foreground bg-background selection:bg-red-200 selection:text-red-900">
      <LandingPage />
    </main>
  );
}
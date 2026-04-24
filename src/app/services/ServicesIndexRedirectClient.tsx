"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ServicesIndexRedirectClient = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/pricing");
  }, [router]);

  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center text-ink/75">
      <p className="text-base">Redirecting to pricing…</p>
    </main>
  );
};

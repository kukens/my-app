"use client";

import { App } from "konsta/react";

export default function ClientRoot({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <App theme="ios">
      {children}
    </App>
  );
}

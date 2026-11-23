"use client";

import * as React from "react";

export interface LivePageContextValue {
  isLive: boolean;
  pageId?: string;
  pageTitle?: string;
  variant?: "A" | "B";
}

const LivePageContext = React.createContext<LivePageContextValue>({
  isLive: false,
  variant: "A",
});

export function LivePageProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: LivePageContextValue;
}) {
  return (
    <LivePageContext.Provider value={value}>
      {children}
    </LivePageContext.Provider>
  );
}

export function useLivePageContext() {
  return React.useContext(LivePageContext);
}

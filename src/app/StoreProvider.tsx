"use client";
import React, { useRef } from 'react';
import { makeStore, AppStore } from "../lib/store";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: Props) {

  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
    // storeRef.current.dispatch(initializeCount(count))
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
"use client";

import { create } from "zustand";
import type { StoreGet, StoreSet } from "./typing";

class GlobalStore {
  count = 1;

  constructor(
    private readonly set: StoreSet<GlobalStore>,
    private readonly get: StoreGet<GlobalStore>
  ) {}

  setCount = () => {
    this.set((state) => {
      return {
        count: state.count + 1,
      };
    });
  };
}

export const useGlobalStore = create<GlobalStore>(
  (set, get) => new GlobalStore(set, get)
);

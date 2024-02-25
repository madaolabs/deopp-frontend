export type Get<T, K, F> = K extends keyof T ? T[K] : F;

export type StoreSet<T extends object> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;

export type StoreGet<T extends object> = () => T;

/**
 * Requires at least one property of the given type T.
 * 
 * @template T - The type to require properties from.
 * @template Keys - The keys of the type T to enforce presence.
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys];

/**
 * Function type for checking if a value is defined.
 * 
 * @template T - The type of the value to check.
 * @param {T | undefined} v - The value to check for definedness.
 * @returns {boolean} - True if the value is defined, false otherwise.
 */
export interface FnIsDefined {
  <T>(v: T | undefined): boolean;
}

/**
 * Type for partial hydration props in React components.
 */
export type PartialHydrateProps = {
  minWidth?: number;
  maxWidth?: number;
  when?: () => boolean;
  children: React.ReactNode;
};
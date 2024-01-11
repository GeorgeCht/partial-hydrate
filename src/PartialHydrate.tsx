'use client'
import * as React from 'react'

/**
 * Requires at least one property of the given type T.
 *
 * @template T - The type to require properties from.
 * @template Keys - The keys of the type T to enforce presence.
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

/**
 * Function type for checking if a value is defined.
 *
 * @template T - The type of the value to check.
 * @param {T | undefined} v - The value to check for definedness.
 * @returns {boolean} - True if the value is defined, false otherwise.
 */
export interface FnIsDefined {
  <T>(v: T | undefined): boolean
}

/**
 * Type for partial hydration props in React components.
 */
export type PartialHydrateProps = {
  minWidth?: number
  maxWidth?: number
  when?: () => boolean
  children: React.ReactNode
}

function useIsFirstRender(): boolean {
  const isFirst = React.useRef(true)
  return !!isFirst.current && ((isFirst.current = false), true)
}

const isDefined: FnIsDefined = (v) => typeof v !== 'undefined' && v !== null

export const PartialHydrate: React.FC<
  RequireAtLeastOne<PartialHydrateProps, 'minWidth' | 'maxWidth' | 'when'>
> = ({ children, minWidth, maxWidth, when }) => {
  const id = 'partial:' + React.useId()
  const isClient = typeof window !== 'undefined'
  const isFirstRender = useIsFirstRender()
  const innerWidth = window.innerWidth

  const removeChildren = (id: string) => {
    if (isClient && isFirstRender) {
      const el = document.getElementById(id)
      el && (el.innerHTML = '')
    }
    return !0
  }

  const render = isDefined(when)
    ? (isClient ? when!() : true) && removeChildren(id)
    : isDefined(minWidth) && isDefined(maxWidth)
      ? (isClient ? innerWidth <= minWidth! && innerWidth >= maxWidth! : true) && removeChildren(id)
      : isDefined(minWidth)
        ? (isClient ? innerWidth <= minWidth! : true) && removeChildren(id)
        : (isClient ? innerWidth >= maxWidth! : true) && removeChildren(id)

  return (
    <div id={id} style={{ display: render ? 'contents' : 'none' }}>
      {render && children}
    </div>
  )
}

import * as React from 'react'

import { FnIsDefined, PartialHydrateProps, RequireAtLeastOne } from './types'

function useIsFirstRender(): boolean {
  const isFirst = React.useRef(true)
  return !!isFirst.current && ((isFirst.current = false), true)
}

const isDefined: FnIsDefined = (v) => typeof v !== 'undefined' && v !== null

export const PartialHydrate: React.FC<
  RequireAtLeastOne<PartialHydrateProps, 'minWidth' | 'maxWidth' | 'when'>
> = ({ children, minWidth, maxWidth, when }) => {
  const id = 'partial:' + React.useId()
  const isClient = isDefined(window)
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

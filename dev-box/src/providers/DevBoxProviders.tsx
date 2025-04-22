'use client'

import React from 'react'

import { DevBoxProvider } from '../contexts/DevBoxContext'
import { DevBoxToolsProvider } from '../contexts/DevBoxToolsContext'
import { ConsoleProvider } from '../tools/Console/Console.context'
import { InspectorProvider } from '../tools/Inspector/Inspector.context'
import { RulerProvider } from '../tools/Ruler/Ruler.context'

export const DevBoxProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <DevBoxProvider>
      <DevBoxToolsProvider>
        <RulerProvider>
          <InspectorProvider>
            <ConsoleProvider>{children}</ConsoleProvider>
          </InspectorProvider>
        </RulerProvider>
      </DevBoxToolsProvider>
    </DevBoxProvider>
  )
}

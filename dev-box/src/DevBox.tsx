import './index.css'

import React from 'react'

import { DevBoxPanel } from './DevBoxPanel'
import { DevBoxProviders } from './providers/DevBoxProviders'
import type { IDevBoxProps } from './types'

export const DevBox = (props: IDevBoxProps) => {
  return (
    <DevBoxProviders>
      <DevBoxPanel {...props} />
    </DevBoxProviders>
  )
}

import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@reach/tooltip'
import { ethers } from 'ethers'
import styled from 'styled-components'

import BridgeView from './module'

export default function BridgeViews () {
  return (
    <>
      <BridgeView></BridgeView>
    </>
  )
}
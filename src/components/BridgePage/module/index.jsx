import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@reach/tooltip'
import { ethers } from 'ethers'
import styled from 'styled-components'


import BridgeButton from './Button'

export default function BridgeViews () {
  return (
    <>
      <BridgeButton
        type="withdraw"
        isDisabled={true}
      />
    </>
  )
}
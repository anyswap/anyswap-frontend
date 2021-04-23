import React from 'react'
import BridgePage from '../../components/BridgePage'

export default function Bridge({ initialCurrency, params }) {
  return <BridgePage initialCurrency={initialCurrency} params={params} sending={true} />
}

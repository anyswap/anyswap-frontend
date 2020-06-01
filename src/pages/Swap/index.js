import React from 'react'
import ExchangePage from '../../components/ExchangePage'

export default function Swap({ initialCurrency, params }) {
  // console.log(initialCurrency)
  // console.log(params)
  return <ExchangePage initialCurrency={initialCurrency} params={params} />
}

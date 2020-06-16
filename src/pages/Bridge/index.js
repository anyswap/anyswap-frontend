import React from 'react'
import BridgePage from '../../components/BridgePage'

export default function Bridge({ initialCurrency, params }) {
  // console.log(initialCurrency)
  // console.log(params)
  return <BridgePage initialCurrency={initialCurrency} params={params}  sending={true}/>
}

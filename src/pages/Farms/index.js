import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Farms = lazy(() => import('./FarmsList'))
const Staking = lazy(() => import('./Staking'))
const MasterChef = lazy(() => import('./MasterChef'))

export default function Pool() {
  return (
    <>
      <Suspense fallback={null}>
        <Switch>
          <Route exact strict path="/farms" component={() => <Farms />} />
          <Route exact strict path="/farms/staking" component={() => <Staking />} />
          <Route exact strict path="/farms/bscfarming" component={() => <MasterChef />} />
          <Redirect to="/farms" />
        </Switch>
      </Suspense>
    </>
  )
}

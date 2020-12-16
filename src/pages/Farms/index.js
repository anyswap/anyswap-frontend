import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Farms = lazy(() => import('./FarmsList'))
const Staking = lazy(() => import('./Staking'))
const BSCfarming = lazy(() => import('./BSCfarming'))

export default function Farm({ params }) {
  // console.log(params)
  const BSCfarmingParams = () => <BSCfarming params={params} />
  return (
    <>
      <Suspense fallback={null}>
        <Switch>
          <Route exact strict path="/farms" component={() => <Farms />} />
          <Route exact strict path="/farms/staking" component={() => <Staking />} />
          {/* <Route exact strict path="/farms/bscfarming" component={() => <BSCfarming />} /> */}
          <Route strict path="/farms/bscfarming" component={BSCfarmingParams} />
          <Route
            exact
            strict
            path="/farms/bscfarming/:lpToken"
            render={({ match }) => {
              console.log(match)
              return <BSCfarming initialExchange={match.params.lpToken} />
            }}
          />
          <Redirect to="/farms" />
        </Switch>
      </Suspense>
    </>
  )
}

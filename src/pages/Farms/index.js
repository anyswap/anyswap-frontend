import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import config from '../../config'

// const Farms = lazy(() => import('./FarmsList'))
// const Staking = lazy(() => import('./Staking'))
// const BSCfarming = lazy(() => import('./BSCfarming'))

import Farms from './FarmsList'
import Staking from './Staking'
import BSCfarming from './BSCfarming'
import HTfarming from './HTfarming'
import BSCfarming2 from './BSCfarming2'

export default function Farm() {
  return (
    <>
      <Suspense fallback={null}>
        <Switch>
          <Route exact strict path="/farms" component={() => <Farms />} />
          <Route exact strict path={config.farmUrl + "staking"} component={() => <Staking />} />

          <Route exact strict path={config.farmUrl + "bscfarming"} component={() => <BSCfarming />} />
          <Route
            path={config.farmUrl + "bscfarming/:lpToken"}
            render={({ match }) => {
              return <BSCfarming initialTrade={match.params.lpToken} />
            }}
          />
          
          <Route exact strict path={config.farmUrl + "htfarming"} component={() => <HTfarming />} />
          <Route
            path={config.farmUrl + "htfarming/:lpToken"}
            render={({ match }) => {
              return <HTfarming initialTrade={match.params.lpToken} />
            }}
          />

          <Route exact strict path={config.farmUrl + "bscfarming2"} component={() => <BSCfarming2 />} />
          <Route
            path={config.farmUrl + "bscfarming2/:lpToken"}
            render={({ match }) => {
              return <BSCfarming2 initialTrade={match.params.lpToken} />
            }}
          />
          <Redirect to="/farms" />
        </Switch>
      </Suspense>
    </>
  )
}

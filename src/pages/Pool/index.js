import React, { Suspense, lazy } from 'react'
// import ReactGA from 'react-ga'
import { Switch, Route, Redirect } from 'react-router-dom'
// import ModeSelector from './ModeSelector'
import Title from '../../components/Title'
import { useTranslation } from 'react-i18next'

const AddLiquidity = lazy(() => import('./AddLiquidity'))
const RemoveLiquidity = lazy(() => import('./RemoveLiquidity'))
const CreateExchange = lazy(() => import('./CreateExchange'))

export default function Pool({ params }) {
  const { t } = useTranslation()

  const AddLiquidityParams = () => <AddLiquidity params={params} />

  const RemoveLiquidityParams = () => <RemoveLiquidity params={params} />

  const CreateExchangeParams = () => <CreateExchange params={params} />

  return (
    <>
      {/* <ModeSelector /> */}
      <Title
        title={t('addLiquidity')}
        isNavLink={true}
        tabList={[
          {
            name: t('addLiquidity'),
            path: '/add-liquidity',
            regex: /\/add-liquidity/,
            iconUrl: require('../../assets/images/icon/add-2.svg'),
            iconActiveUrl: require('../../assets/images/icon/add-2-purpl.svg')
          },
          {
            name: t('removeLiquidity'),
            path: '/remove-liquidity',
            regex: /\/remove-liquidity/,
            iconUrl: require('../../assets/images/icon/remove.svg'),
            iconActiveUrl: require('../../assets/images/icon/remove-purpl.svg')
          },
          {
            name: t('createExchange'),
            path: '/create-exchange',
            regex: /\/create-exchange.*/,
            iconUrl: require('../../assets/images/icon/create-exchange.svg'),
            iconActiveUrl: require('../../assets/images/icon/create-exchange-purpl.svg')
          }
        ]}
      ></Title>
      {/* this Suspense is for route code-splitting */}
      <Suspense fallback={null}>
        <Switch>
          <Route exact strict path="/add-liquidity" component={AddLiquidityParams} />
          <Route exact strict path="/remove-liquidity" component={RemoveLiquidityParams} />
          <Route exact strict path="/create-exchange" component={CreateExchangeParams} />
          <Route
            path="/create-exchange/:tokenAddress"
            render={({ match }) => {
              return (
                <Redirect to={{ pathname: '/create-exchange', state: { tokenAddress: match.params.tokenAddress } }} />
              )
            }}
          />
          <Redirect to="/add-liquidity" />
        </Switch>
      </Suspense>
    </>
  )
}

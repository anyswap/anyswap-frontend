import React, { Suspense, lazy } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
// import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import Web3ReactManager from '../components/Web3ReactManager'
import Header from '../components/Header'
import Footer from '../components/Footer'

import NavigationTabs from '../components/NavigationTabs'
import { isAddress, getAllQueryParams } from '../utils'

import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory()

const Swap = lazy(() => import('./Swap'))
const Send = lazy(() => import('./Send'))
const Pool = lazy(() => import('./Pool'))
const Bridge = lazy(() => import('./Bridge'))

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  height: 100vh;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  background: ${({theme}) => theme.bgColor};
`
const FooterWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  align-self: flex-end;
  box-shadow: 7px 2px 26px 0 rgba(0, 0, 0, 0.06);
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  overflow: auto;
  box-shadow: 7px 2px 26px 0 rgba(0, 0, 0, 0.06);
`

const Body = styled.div`
  max-width: 1440px;
  width: 100%;
  min-height: 100%;
  position:relative;
  padding-left: 322px;
  box-sizing: border-box;
`

const NavTabBox = styled.div`
  position: absolute;
  left: 0;
  top:0;
  bottom: 0;
  right: 322px;
  width: 322px;
  height: 100%;
  overflow:auto;
  box-shadow: 7px 2px 26px 0 rgba(0, 0, 0, 0.06);
  background: ${({theme}) => theme.bgColor};
`

const ContentBox = styled.div`
  position: absolute;
  left: 322px;
  top:0;
  bottom: 0;
  right: 0;
  padding: 40px 97px;
  background: ${({theme}) => theme.backgroundColorCont};
  overflow:auto;
`

export default function App() {
  const params = getAllQueryParams()
  return (
    <>
      <Suspense fallback={null}>
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Body>
              <Web3ReactManager>
                <BrowserRouter  history={ browserHistory }>
                  <NavTabBox>
                    <NavigationTabs />
                  </NavTabBox>
                  {/* this Suspense is for route code-splitting */}
                  <Suspense fallback={null}>
                    <ContentBox>
                      <Switch>
                        <Route exact strict path="/swap" component={() => <Swap params={params} />} />
                        <Route
                          exact
                          strict
                          path="/swap/:tokenAddress?"
                          render={({ match, location }) => {
                            console.log(match.params.tokenAddress)
                            if (isAddress(match.params.tokenAddress)) {
                              return (
                                <Swap
                                  location={location}
                                  initialCurrency={isAddress(match.params.tokenAddress)}
                                  params={params}
                                />
                              )
                            } else {
                              return <Redirect to={{ pathname: '/swap' }} />
                            }
                          }}
                        />
                        <Route exact strict path="/send" component={() => <Send params={params} />} />
                        <Route
                          exact
                          strict
                          path="/send/:tokenAddress?"
                          render={({ match }) => {
                            if (isAddress(match.params.tokenAddress)) {
                              return <Send initialCurrency={isAddress(match.params.tokenAddress)} params={params} />
                            } else {
                              return <Redirect to={{ pathname: '/send' }} />
                            }
                          }}
                        />
                        <Route
                          path={[
                            '/add-liquidity',
                            '/remove-liquidity',
                            '/create-exchange',
                            '/create-exchange/:tokenAddress?'
                          ]}
                          component={() => <Pool params={params} />}
                        />
                        <Route exact strict path="/bridge" component={() => <Bridge params={params} />} />
                        <Route
                          exact
                          strict
                          path="/send/:tokenAddress?"
                          render={({ match }) => {
                            if (isAddress(match.params.tokenAddress)) {
                              return <Bridge initialCurrency={isAddress(match.params.tokenAddress)} params={params} />
                            } else {
                              return <Redirect to={{ pathname: '/bridge' }} />
                            }
                          }}
                        />
                        <Redirect to="/swap" />
                      </Switch>
                    </ContentBox>
                  </Suspense>
                </BrowserRouter>
              </Web3ReactManager>
            </Body>
          </BodyWrapper>
          {/* <FooterWrapper>
            <Footer />
          </FooterWrapper> */}
        </AppWrapper>
      </Suspense>
    </>
  )
}

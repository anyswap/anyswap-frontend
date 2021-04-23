import React, { Suspense, lazy } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Web3ReactManager from '../components/Web3ReactManager'
import Header from '../components/Header'
import NavigationTabs from '../components/NavigationTabs'
import { isAddress, getAllQueryParams } from '../utils'

import config from '../config'

import Swap from './Swap'
import Send from './Send'
import Pool from './Pool'
import Farms from './Farms'
import Bridge from './Bridge'
import Dashboard from './Dashboard'

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
  background: ${({ theme }) => theme.contentBg};
`
const FooterWrapper = styled.div`
  width: 100%;
  min-height: 1.875rem;
  align-self: flex-end;
  box-shadow: 0.4375rem 0.125rem 1.625rem 0 rgba(0, 0, 0, 0.06);
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  overflow: auto;
  box-shadow: ${({ theme }) => theme.contentShadow};
`

const Body = styled.div`
  max-width: 1440px;
  width: 100%;
  min-height: 100%;
  position: relative;
  padding-left: 322px;
  box-sizing: border-box;
  @media screen and (max-width: 960px) {
    padding-left: 0;
  }
`

const NavTabBoxLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 322px;
  width: 322px;
  height: 100%;
  overflow: auto;
  box-shadow: ${({ theme }) => theme.contentShadow};
  background: ${({ theme }) => theme.contentBg};
  z-index: 1;
  @media screen and (max-width: 960px) {
    display: none;
  }
`
const NavTabBoxBottom = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100;
  height: auto;
  overflow: auto;
  box-shadow: ${({ theme }) => theme.contentShadow};
  background: ${({ theme }) => theme.contentBg};
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    z-index: 1;
  }
`
const ContentBox = styled.div`
  position: absolute;
  left: 322px;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 2.5rem 97px;
  background: ${({ theme }) => theme.bodyBg};
  overflow: auto;
  @media screen and (max-width: 960px) {
    width: 100%;
    height: auto;
    padding: 1.25rem 1rem 86px;
    left: 0;
  }
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
                <BrowserRouter>
                  <NavTabBoxLeft>
                    <NavigationTabs />
                  </NavTabBoxLeft>
                  <Suspense fallback={null}>
                    <ContentBox>
                      <Switch>
                        <Route exact strict path="/swap" component={() => <Swap params={params} />} />
                        <Route
                          exact
                          strict
                          path="/swap/:tokenAddress?"
                          render={({ match, location }) => {
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
                        <Route exact strict path="/dashboard" component={() => <Dashboard />} />
                        <Route
                          path={[
                            '/farms',
                            config.farmUrl + 'staking',
                            config.farmUrl + 'bscfarming',
                            config.farmUrl + 'bscfarming/:lpToken?',
                            config.farmUrl + 'htfarming',
                            config.farmUrl + 'htfarming/:lpToken?',
                            config.farmUrl + 'bscfarming2',
                            config.farmUrl + 'bscfarming2/:lpToken?',
                            config.farmUrl + 'fsnfarming',
                            config.farmUrl + 'fsnfarming/:lpToken?',
                            config.farmUrl + 'ftmfarming',
                            config.farmUrl + 'ftmfarming/:lpToken?'
                          ]}
                          component={() => <Farms params={params} />}
                        />
                        <Redirect to="/dashboard" />
                      </Switch>
                    </ContentBox>
                  </Suspense>
                  <NavTabBoxBottom>
                    <NavigationTabs />
                  </NavTabBoxBottom>
                </BrowserRouter>
              </Web3ReactManager>
            </Body>
          </BodyWrapper>
        </AppWrapper>
      </Suspense>
    </>
  )
}

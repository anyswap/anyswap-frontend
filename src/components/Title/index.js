import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const TitleBox = styled.div`
  ${({ theme }) => theme.FlexBC}
  margin-bottom:1rem;
`
const TitleTxt = styled.div`
  height: 38px;
  line-height: 38px;
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.textColorBold};
  white-space: nowrap;
  // ${({ theme }) => theme.mediaWidth.upToMedium`
  //   display:none;
  // `}
`
const TabLinkBox = styled.ul`
  ${({ theme }) => theme.FlexSC}
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    ${({ theme }) => theme.FlexC}
    height: 38px;
    font-family: 'Manrope';
    font-size: 0.75rem;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #96989e;
    border-top: 0.0625rem solid rgba(0, 0, 0, 0.04);
    border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.04);
    border-left: 0.0625rem solid rgba(0, 0, 0, 0.04);
    cursor: pointer;
    text-decoration: none;
    padding: 0 0.625rem;
    background: ${({ theme }) => theme.tabBg};
    white-space: nowrap;

    .icon {
      ${({ theme }) => theme.FlexC}
      width: 28px;
      height: 28px;
      background: #f5f5f5;
      border-radius: 100%;
      margin-right: 0.625rem;
      padding: 6px;
      img {
        display: block;
        width: 100%;
      }
    }
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      &.active {
        border: 0.0625rem solid ${({ theme }) => theme.tabBdColor};
      }
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-right: 0.0625rem solid rgba(0, 0, 0, 0.04);
      &.active {
        border: 0.0625rem solid ${({ theme }) => theme.tabBdColor};
      }
    }

    &.active {
      background: ${({ theme }) => theme.tabActiveBg};
      border: 0.0625rem solid ${({ theme }) => theme.tabBdColor};
      color: ${({ theme }) => theme.tabActiveColor};
      font-weight: bold;
      .icon {
        background: #734be2;
      }
    }
    @media screen and (max-width: 960px) {
      .icon {
        display: none;
      }
    }
  }
`

const activeClassName = 'active'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.FlexC}
  height: 38px;
  font-family: 'Manrope';
  font-size: 0.75rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${({ theme }) => theme.tabColor};
  border-top: 0.0625rem solid rgba(0, 0, 0, 0.04);
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.04);
  border-left: 0.0625rem solid rgba(0, 0, 0, 0.04);
  cursor:pointer;
  text-decoration: none;
  padding: 0 0.625rem;
  background: ${({ theme }) => theme.tabBg};
  white-space:nowrap;

  .icon {
    ${({ theme }) => theme.FlexC}
    width: 28px;
    height: 28px;
    background:#f5f5f5;
    border-radius:100%;
    margin-right:0.625rem;
  }
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    &.active {
      border: 0.0625rem solid ${({ theme }) => theme.tabBdColor};
    }
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-right: 0.0625rem solid rgba(0, 0, 0, 0.04);
    &.active {
      border: 0.0625rem solid ${({ theme }) => theme.tabBdColor};
    }
  }

  &.${activeClassName} {
    background: ${({ theme }) => theme.tabActiveBg};
    border: 0.0625rem solid ${({ theme }) => theme.tabBdColor};
    color: ${({ theme }) => theme.tabActiveColor};
    font-weight: bold;
    .icon {
      background: #734be2;
    }
  }
  @media screen and (max-width: 960px) {
    .icon {
      display:none;
    }
  }
`


export default function Title({ title, tabList = [] , isNavLink = false}) {
  const [tabIndex, setTabIndex] = useState(0)
  const [tabName, setTabName] = useState('')
  const pathname = window.location.pathname
  const activeTabKey = tabList.length > 0 ? tabList[tabList.findIndex(({ regex }) => pathname.match(regex))].name : ''
  function tabListView() {
    if (isNavLink) {
      return (
        <>
          <TabLinkBox>
            {tabList.map(({ path, name, regex, iconUrl, iconActiveUrl }) => (
              <StyledNavLink
                key={path}
                to={path}
                isActive={(_, { pathname }) => pathname.match(regex)}
              > 
                <div className='icon'>
                  <img alt={''} src={pathname.match(regex) ? iconActiveUrl : iconUrl}/>
                </div>
                {name}
              </StyledNavLink>
            ))}
          </TabLinkBox>
        </>
      )
    }

    return (
      <>
        <TabLinkBox>
          {tabList.map((item, index) => {
            return (
              <li
                key={index}
                className={tabIndex === index ? 'active' : ''}
                onClick={() => {
                  setTabIndex(index)
                  setTabName(item.name)
                  item.onTabClick(item.name)
                }}
              >
                <div className="icon">
                  {tabIndex === index ? <img alt={''} src={item.iconActiveUrl} /> : <img alt={''} src={item.iconUrl} />}
                </div>
                {item.name}
              </li>
            )
          })}
        </TabLinkBox>
      </>
    )
  }
  return (
    <>
      <TitleBox>
        <TitleTxt>{tabName ? tabName : (isNavLink ? activeTabKey : title)}</TitleTxt>
        {tabList.length > 0 ? tabListView() : ''}
      </TitleBox>
    </>
  )
}

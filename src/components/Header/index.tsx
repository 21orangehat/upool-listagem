import React from 'react'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import styled from 'styled-components'
import UpoolLogo from '../../assets/images/upool_logo.png'
import Row, { RowFixed } from '../Row'
import { networkPrefix } from 'utils/networkPrefix'
import {
  ArbitrumNetworkInfo,
  EthereumNetworkInfo,
  PolygonNetworkInfo,
  OptimismNetworkInfo,
  CeloNetworkInfo,
} from 'constants/networks'
import { DangerButton } from '../Button'

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: rgb(0, 0, 0, 0.9);
  position: absolute;
  width: 100vw;
  top: 0;
  z-index: 9999;
`

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  background-color: ${({ theme }) => theme.bg0};

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
    padding: 0.5rem 1rem;
    width: calc(100%);
    position: relative;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 0.5rem 1rem;
  `}
`

const HeaderRow = styled(RowFixed)`
  @media (max-width: 1080px) {
    width: 100%;
  }
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  @media (max-width: 1080px) {
    padding: 0.5rem;
    justify-content: flex-end;
  } ;
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
  width: fit-content;
  margin: 0 6px;
  padding: 8px 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.bg2};
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

export default function Header() {
  return (
    <NavbarContainer>
      <UniIcon>
        <img width={'100%'} src={UpoolLogo} alt="uPool" />
      </UniIcon>
      <HeaderLinks>
        <StyledNavLink
          id={`stake-nav-link`}
          to={networkPrefix(EthereumNetworkInfo) + 'pools'}
          isActive={(match, { pathname }) => ['/', '/pools'].indexOf(pathname) > -1}
        >
          Ethereum Pools
        </StyledNavLink>
        <StyledNavLink
          id={`stake-nav-link`}
          to={networkPrefix(PolygonNetworkInfo) + 'pools'}
          isActive={(match, { pathname }) => pathname === '/polygon/pools'}
        >
          Polygon Pools
        </StyledNavLink>
        <StyledNavLink
          id={`stake-nav-link`}
          to={networkPrefix(OptimismNetworkInfo) + 'pools'}
          isActive={(match, { pathname }) => pathname === '/optimism/pools'}
        >
          Optimism Pools
        </StyledNavLink>
        <StyledNavLink
          id={`stake-nav-link`}
          to={networkPrefix(ArbitrumNetworkInfo) + 'pools'}
          isActive={(match, { pathname }) => pathname === '/arbitrum/pools'}
        >
          Arbitrum Pools
        </StyledNavLink>
        <StyledNavLink
          id={`stake-nav-link`}
          to={networkPrefix(CeloNetworkInfo) + 'pools'}
          isActive={(match, { pathname }) => pathname === '/celo/pools'}
        >
          Celo Pools
        </StyledNavLink>
      </HeaderLinks>
      <a href="https://simula.orangehat.wtf" target="_blank" rel="noreferrer">
        <DangerButton>
          <span>Simular Pool</span>
        </DangerButton>
      </a>
    </NavbarContainer>
  )
}

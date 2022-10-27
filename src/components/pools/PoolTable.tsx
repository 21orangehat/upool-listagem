import React, { useCallback, Suspense, useState, useMemo, useEffect } from 'react'
import styled, { withTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { TYPE } from 'theme'
import { DarkGreyCard, GreyBadge } from 'components/Card'
import { LocalLoader } from 'components/Loader'
import { AutoColumn } from 'components/Column'
import { RowFixed } from 'components/Row'
import { formatDollarAmount } from 'utils/numbers'
import { PoolData } from 'state/pools/reducer'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { feeTierPercent } from 'utils'
import { Label, ClickableText } from 'components/Text'
import { PageButtons, Arrow, Break } from 'components/shared'
import { POOL_HIDE } from '../../constants/index'
import useTheme from 'hooks/useTheme'
import { networkPrefix } from 'utils/networkPrefix'
import { useActiveNetworkVersion } from 'state/application/hooks'
import ReactTooltip from 'react-tooltip'
import { ButtonPrimary } from 'components/Button'
import { getMultiplier } from 'utils/getMultiplier'

const Wrapper = styled(DarkGreyCard)`
  width: 100%;
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  grid-template-columns: 5px 0.6fr repeat(6, 0.3fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 1.5fr repeat(2, 1fr);
    & :nth-child(3) {
      display: none;
    }
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 20px 1.5fr repeat(1, 1fr);
    & :nth-child(5) {
      display: none;
    }
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 2.5fr repeat(1, 1fr);
    > *:nth-child(1) {
      display: none;
    }
  }
`

const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const SpanSmall = styled(TYPE.small)`
  display: block;
  color: white;
  font-variant-numeric: tabular-nums;
  @media screen and (max-width: 640px) {
    font-size: 14px;
  }
`

const SORT_FIELD = {
  feeTier: 'feeTier',
  volumeUSD: 'volumeUSD',
  tvlUSD: 'tvlUSD',
  volumeUSD2H: 'volumeUSD2H',
  volumeUSDWeek: 'volumeUSDWeek',
  volumeUSD48H: 'volumeUSD48H',
  volumeAverage: 'volumeAverage',
  multiplier: 'multiplier',
}

const DataRow = ({ poolData, index }: { poolData: PoolData; index: number }) => {
  // Destaca assimetria
  let temAssimetria = false
  if (poolData.volumeUSD > poolData.tvlUSD) {
    temAssimetria = true
  }

  const [activeNetwork] = useActiveNetworkVersion()
  // pretend load buffer
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1300)
  }, [])
  return (
    <Suspense fallback={null}>
      {loading ? (
        <LocalLoader fill={true} />
      ) : (
        <LinkWrapper to={networkPrefix(activeNetwork) + 'pools/' + poolData.address}>
          <ReactTooltip />
          <ResponsiveGrid className={temAssimetria ? 'simetria' : ''}>
            <Label fontWeight={400}>{index + 1}</Label>
            <Label fontWeight={400}>
              <RowFixed>
                <DoubleCurrencyLogo address0={poolData.token0.address} address1={poolData.token1.address} />
                <TYPE.label ml="8px">
                  {poolData.token0.symbol}/{poolData.token1.symbol}
                </TYPE.label>
                <GreyBadge ml="10px" fontSize="14px">
                  {feeTierPercent(poolData.feeTier)}
                </GreyBadge>
              </RowFixed>
            </Label>
            <Label fontWeight={400}>{formatDollarAmount(poolData.tvlUSD)}</Label>
            <div>
              <Label fontWeight={400}>{formatDollarAmount(poolData.volumeUSD2H)}</Label>
              <SpanSmall data-tip="Multiplicador Volume 2H">
                ({getMultiplier(poolData.feeTier.toString(), poolData.volumeUSD2H, poolData.tvlUSD)})
              </SpanSmall>
            </div>
            <div>
              <Label fontWeight={400}>{formatDollarAmount(poolData.volumeUSD)}</Label>
              <SpanSmall data-tip="Multiplicador Volume 24H">
                ({getMultiplier(poolData.feeTier.toString(), poolData.volumeUSD, poolData.tvlUSD)})
              </SpanSmall>
            </div>
            <div>
              <Label fontWeight={400}>{formatDollarAmount(poolData.volumeUSDWeek)}</Label>
              <SpanSmall data-tip="Multiplicador Volume 7D">
                ({getMultiplier(poolData.feeTier.toString(), poolData.volumeUSDWeek, poolData.tvlUSD)})
              </SpanSmall>
            </div>
            <div>
              <Label fontWeight={400}>{formatDollarAmount(poolData.volumeAverage)}</Label>
              <SpanSmall data-tip="Multiplicador Média Diária">
                ({getMultiplier(poolData.feeTier.toString(), poolData.volumeAverage, poolData.tvlUSD)})
              </SpanSmall>
            </div>
            <Label fontWeight={400}>{poolData.multiplier}</Label>
          </ResponsiveGrid>
        </LinkWrapper>
      )}
    </Suspense>
  )
}

const MAX_ITEMS = 7

export default function PoolTable({ poolDatas, maxItems = MAX_ITEMS }: { poolDatas: PoolData[]; maxItems?: number }) {
  const [activeNetwork] = useActiveNetworkVersion()
  // theming
  const theme = useTheme()
  // pretend load buffer
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1300)
  }, [])

  // for sorting
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD) //tvlUSD
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (poolDatas.length % maxItems === 0) {
      extraPages = 0
    }
    setMaxPage(Math.floor(poolDatas.length / maxItems) + extraPages)
  }, [maxItems, poolDatas])

  const sortedPools = useMemo(() => {
    return poolDatas
      ? poolDatas
          .filter((x) => !!x && !POOL_HIDE.includes(x.address))
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof PoolData] > b[sortField as keyof PoolData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            } else {
              return -1
            }
          })
          .slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [maxItems, page, poolDatas, sortDirection, sortField])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField]
  )

  const arrow = useCallback(
    (field: string) => {
      return sortField === field ? (!sortDirection ? '↑' : '↓') : ''
    },
    [sortDirection, sortField]
  )

  if (!poolDatas) {
    return <LocalLoader fill={true} />
  }

  return (
    <Suspense fallback={null}>
      <Label fontWeight={400}>Pools da rede {activeNetwork.name}</Label>
      <a href="https://youtu.be/_ZZbHyW58ec?t=3595" target="_blank" rel="noreferrer">
        <ButtonPrimary>Clique aqui e aprenda sobre o multiplicador no vídeo do Carlos Crypto Night</ButtonPrimary>
      </a>
      {loading ? (
        <LocalLoader fill={true} />
      ) : (
        <Wrapper>
          {sortedPools.length > 0 ? (
            <AutoColumn gap="16px">
              <ResponsiveGrid>
                <Label color={theme.text2} fontWeight={400}>
                  #
                </Label>
                <ClickableText color={theme.text2} fontWeight={400} onClick={() => handleSort(SORT_FIELD.feeTier)}>
                  Pool {arrow(SORT_FIELD.feeTier)}
                </ClickableText>
                <ClickableText color={theme.text2} fontWeight={400} onClick={() => handleSort(SORT_FIELD.tvlUSD)}>
                  TVL {arrow(SORT_FIELD.tvlUSD)}
                </ClickableText>
                <ClickableText color={theme.text2} fontWeight={400} onClick={() => handleSort(SORT_FIELD.volumeUSD2H)}>
                  Volume 2H {arrow(SORT_FIELD.volumeUSD2H)}
                </ClickableText>
                <ClickableText color={theme.text2} fontWeight={400} onClick={() => handleSort(SORT_FIELD.volumeUSD)}>
                  Volume 24H {arrow(SORT_FIELD.volumeUSD)}
                </ClickableText>
                <ClickableText
                  color={theme.text2}
                  fontWeight={400}
                  onClick={() => handleSort(SORT_FIELD.volumeUSDWeek)}
                >
                  Volume 7D {arrow(SORT_FIELD.volumeUSDWeek)}
                </ClickableText>
                <ClickableText
                  color={theme.text2}
                  fontWeight={400}
                  onClick={() => handleSort(SORT_FIELD.volumeAverage)}
                >
                  Média Diária {arrow(SORT_FIELD.volumeAverage)}
                </ClickableText>
                <ClickableText color={theme.text2} fontWeight={400} onClick={() => handleSort(SORT_FIELD.multiplier)}>
                  Multip. 24H {arrow(SORT_FIELD.multiplier)}
                </ClickableText>
              </ResponsiveGrid>
              <Break />
              {sortedPools.map((poolData, i) => {
                if (poolData) {
                  //console.log('poolDayData ' + JSON.stringify(poolData.poolDayData))
                  return (
                    <React.Fragment key={i}>
                      <DataRow index={(page - 1) * MAX_ITEMS + i} poolData={poolData} />
                      <Break />
                    </React.Fragment>
                  )
                }
                return null
              })}
              <PageButtons>
                <div
                  onClick={() => {
                    setPage(page === 1 ? page : page - 1)
                  }}
                >
                  <Arrow faded={page === 1 ? true : false}>←</Arrow>
                </div>
                <TYPE.body>{'Página ' + page + ' de ' + maxPage}</TYPE.body>
                <div
                  onClick={() => {
                    setPage(page === maxPage ? page : page + 1)
                  }}
                >
                  <Arrow faded={page === maxPage ? true : false}>→</Arrow>
                </div>
              </PageButtons>
            </AutoColumn>
          ) : (
            <LocalLoader fill={true} />
          )}
        </Wrapper>
      )}
    </Suspense>
  )
}

import React, { useEffect, Suspense, useState, useMemo } from 'react'
import { PageWrapper } from 'pages/styled'
import { AutoColumn } from 'components/Column'
import { TYPE } from 'theme'
import { LocalLoader } from 'components/Loader'
import PoolTable from 'components/pools/PoolTable'
import { useAllPoolData } from 'state/pools/hooks'
import { notEmpty } from 'utils'

export default function PoolPage() {
  // pretend load buffer
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1300)
  }, [])

  // get all the pool datas that exist
  const allPoolData = useAllPoolData()

  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((p) => p.data)
      .filter(notEmpty)
  }, [allPoolData])
  return (
    <Suspense fallback={null}>
      {loading ? (
        <LocalLoader fill={true} />
      ) : (
        <PageWrapper>
          <AutoColumn gap="lg">
            <PoolTable poolDatas={poolDatas} />
          </AutoColumn>
        </PageWrapper>
      )}
    </Suspense>
  )
}

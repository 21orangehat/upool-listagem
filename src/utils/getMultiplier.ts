export function getMultiplier(feeTier: string, volumeUSD: number, tvlUSD: number, date = 0): string {
  const result: number = volumeUSD / tvlUSD
  let multiplier = 0
  // const d = new Date(date * 1000).toLocaleDateString('en-us')
  // console.log('----------------------')
  // console.log('Date: ' + d + 'Timestamp: ' + date)
  // console.log('feeTier:' + feeTier)
  // console.log('volumeUSD:' + volumeUSD)
  // console.log('tvlUSD:' + tvlUSD)
  // console.log('----------------------')

  if (feeTier === '10000') {
    //1%
    multiplier = result * 20
  } else if (feeTier === '3000') {
    //0.30%
    multiplier = result * 6
  } else if (feeTier === '500') {
    //0.05%
    multiplier = result
  } else if (feeTier === '100') {
    //0.01%
    multiplier = result / 5
  }

  return multiplier.toFixed(2)
}

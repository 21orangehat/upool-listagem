export function getMultiplier(feeTier: string, volumeUSD: number, tvlUSD: number): string {
  const result: number = volumeUSD / tvlUSD
  let multiplier = 0
  //console.log('feeTier:' + feeTier)

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

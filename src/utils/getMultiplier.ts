export function getMultiplier(feeTier: string, volumeUSD: number, tvlUSD: number): string {
  const result: number = volumeUSD / tvlUSD
  let multiplier = 0

  if (feeTier === '1000') {
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

  return parseFloat(multiplier.toString()).toPrecision(3).toString()
}

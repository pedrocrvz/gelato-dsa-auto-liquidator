export const getAutoLiquidationGasCostByRoute = (route: number, colToken: string): number => {
  let gasUsed = 0

  // 1148384 + 1M
  if (route === 0) gasUsed = 2148384
  // 1612822 + 1M
  else if (route === 1) gasUsed = 2612822
  // 2399110 + 1M
  else if (route === 2) gasUsed = 3399110
  // 2669343 + 1M
  else if (route === 3) gasUsed = 3669343

  if (colToken === 'ETH-A' || colToken === 'ETH-B') return gasUsed
  // we add 10 000 as a surplus for simplicity
  // data from gas-reporter showed the the difference showed be in this range
  else return gasUsed + 10000
}

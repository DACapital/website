var BigNumber = require('bignumber.js')

const BASE_UNITS = new BigNumber(10).toPower(18)
const TOKENS_PER_GENERATION = BASE_UNITS.times(1680000)
const INITIAL_PRICE_PER_ETH = new BigNumber(2000)
const MAX_TOKENS = TOKENS_PER_GENERATION.times(10)
/**
 * Returns a BigNumber the number of DAC tokens (in base units) that can be purchased with the specified ETH.
 * This code is strange since it is taken from the smart contract.
 *
 * @param {int} startAmt Amount of tokens already sold
 * @param {int} wei Amount of ETH to purchase tokens with (in wei)
 */
export const calcDacForEth = (amountSoldStart, wei) => {
  console.log('calcDacForEth amountSoldStart: ' + new BigNumber(amountSoldStart).dividedBy(Math.pow(10, 18)) + ' dacAmount: ' + wei.dividedBy(Math.pow(10, 18)))

  // Stop it from going over
  if (new BigNumber(amountSoldStart).greaterThanOrEqualTo(MAX_TOKENS)) {
    return 0
  }

  // make sure it is a big number
  let ethAmount = new BigNumber(wei)

  // Keep track of the amount to sell in this transaction
  let currentAmountToSell = 0

  // First get the amount of tokens sold from the beginning of this generation and the amount left.
  let currentGeneration = Math.floor(amountSoldStart / TOKENS_PER_GENERATION)
  let amountLeftInCurrentGeneration = TOKENS_PER_GENERATION - (amountSoldStart % TOKENS_PER_GENERATION)

  // Calculate how mant tokens they are trying to buy
  currentAmountToSell = new BigNumber(ethAmount).times(INITIAL_PRICE_PER_ETH).dividedBy(new BigNumber(2).toPower(currentGeneration)) // => ethAmount * salePrice

  // If they are buying past the current generation, then figure out how much they purchase in the next generation.
  if (currentAmountToSell > amountLeftInCurrentGeneration) {
    // Calculate how much ETH would be used from the current generation
    let ethFromCurrentGen = new BigNumber(2).toPower(currentGeneration).times(amountLeftInCurrentGeneration).dividedBy(INITIAL_PRICE_PER_ETH) // => amountLeftInCurrentGeneration / salePrice

    // Token number to start with in the next generation
    let nextGenStart = TOKENS_PER_GENERATION.times(currentGeneration + 1)

    // Eth available to purchase in the next generation
    let leftOverEth = ethAmount.sub(ethFromCurrentGen)

    // Recursively call this function with the starting amount being the next gen and remaining ETH
    let nextGen = calcDacForEth(nextGenStart, leftOverEth)

    // Return the current tokens sold in this generation plus any later generations.
    return ethFromCurrentGen.times(INITIAL_PRICE_PER_ETH).dividedBy(new BigNumber(2).toPower(currentGeneration)).plus(nextGen) // => (ethFromCurrentGen * salePrice) + nextGen
  }

  // Return the amount to sell
  return currentAmountToSell
}

/**
 * Returns a BigNumber the number of Eth tokens (in wei units) that is required to purchase the dac specified.
 *
 * @param {int} startAmt Amount of tokens already sold
 * @param {int} dac Amount of DAC to purchase tokens with (in base units)
 */
export const calcEthForDac = (amountSoldStart, dac) => {
  // make sure it is a big number
  let dacAmount = new BigNumber(dac)
  console.log('calcEthForDac amountSoldStart: ' + new BigNumber(amountSoldStart).dividedBy(Math.pow(10, 18)) + ' dacAmount: ' + dacAmount.dividedBy(Math.pow(10, 18)))

  // Stop it from going over
  let amtBN = new BigNumber(amountSoldStart)
  if (amtBN.greaterThanOrEqualTo(MAX_TOKENS)) {
    return 0
  }

  // First get the amount of tokens sold from the beginning of this generation and the amount left.
  let currentGeneration = Math.floor(amountSoldStart / TOKENS_PER_GENERATION)
  let amountLeftInCurrentGeneration = TOKENS_PER_GENERATION - (amountSoldStart % TOKENS_PER_GENERATION)
  console.log('amountLeftInCurrentGeneration: ' + amountLeftInCurrentGeneration)

  // Current price
  let currentPrice = INITIAL_PRICE_PER_ETH.dividedBy(new BigNumber(2).toPower(currentGeneration))
  console.log('currentPrice: ' + currentPrice)

  if (dac > amountLeftInCurrentGeneration) {
    let nextGenStart = TOKENS_PER_GENERATION.times(currentGeneration + 1)

    let ethThisGen = new BigNumber(amountLeftInCurrentGeneration).dividedBy(currentPrice)
    console.log('ethThisGen: ' + ethThisGen)

    return ethThisGen.add(calcEthForDac(nextGenStart, dacAmount.sub(amountLeftInCurrentGeneration)))
  }

  return dacAmount.dividedBy(currentPrice)
}

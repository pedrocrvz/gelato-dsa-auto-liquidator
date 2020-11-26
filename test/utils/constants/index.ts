import { ethers } from 'ethers'
import { ABIs } from '../../../constants'

export const MAKER_INITIAL_ETH = ethers.utils.parseEther('10')
export const MAKER_INITIAL_WBTC = ethers.utils.parseUnits('0.5', 8)
export const MAKER_INITIAL_LINK = ethers.utils.parseUnits('650', 18)

export const MAKER_INITIAL_DEBT = ethers.utils.parseUnits('1000', 18)

export const GAS_LIMIT = '5000000'
export const GAS_PRICE_CEIL = ethers.utils.parseUnits('1000', 'gwei')
export const MIN_COL_RATIO_MAKER = ethers.utils.parseUnits('3', 18)

export { ABIs }

export const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

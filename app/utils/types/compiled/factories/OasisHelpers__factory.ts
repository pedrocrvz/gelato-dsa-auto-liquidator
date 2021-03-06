/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import { Contract, ContractFactory, Overrides } from '@ethersproject/contracts'

import type { OasisHelpers } from '../OasisHelpers'

export class OasisHelpers__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(overrides?: Overrides): Promise<OasisHelpers> {
    return super.deploy(overrides || {}) as Promise<OasisHelpers>
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  attach(address: string): OasisHelpers {
    return super.attach(address) as OasisHelpers
  }
  connect(signer: Signer): OasisHelpers__factory {
    return super.connect(signer) as OasisHelpers__factory
  }
  static connect(address: string, signerOrProvider: Signer | Provider): OasisHelpers {
    return new Contract(address, _abi, signerOrProvider) as OasisHelpers
  }
}

const _abi = [
  {
    inputs: [],
    name: 'connectorID',
    outputs: [
      {
        internalType: 'uint256',
        name: '_type',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
]

const _bytecode =
  '0x6080604052348015600f57600080fd5b50608a8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063eb15f78114602d575b600080fd5b6033604c565b6040805192835260208301919091528051918290030190f35b60019060379056fea2646970667358221220fb70910b2663c2ebaa1370a86ed8693c1538239f68b0c367b657753324481d2b64736f6c63430007040033'

import { ContractMetadata } from "./contract-metadata.model";


export interface ContractsMetadata {

  name: string;
  chainId: string;
  contracts: {[name: string]: ContractMetadata};

}

export interface ContractMetadata {
    address: string;
    abi: any[];
}


export interface ContractsMetadata {
    name: string;
    chainId: string;
    contracts: {[name: string]: ContractMetadata};
}
  
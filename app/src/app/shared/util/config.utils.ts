import { environment } from "src/environments/environment";

import { MetamaskAsset } from "../models/wallet/metamask/metamask-asset.model";

import { ContractsMetadata } from "../models/contracts/contracts-metadata.model";


export const prepareMetamaskAssets = (contractsMetadata: ContractsMetadata): Map<string, MetamaskAsset> => {

    const ADRIA_TEST_ASSET: MetamaskAsset = {
        type: "ERC20",
        options: {
            address: contractsMetadata.contracts['AdriaTest'].address,
            symbol: "ADRIAT",
            decimals: 18,
            image: `${environment.externalUrl}assets/metamask_adriat.png`
        }
    };

    return new Map([
        ["ADRIAT", ADRIA_TEST_ASSET]
    ]);

}

import { ContractsMetadata, MetamaskAsset } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/models";


export const prepareMetamaskAssets = (contractsMetadata: ContractsMetadata, externalUrl: string): Map<string, MetamaskAsset> => {

    const ADRIA_TEST_ASSET: MetamaskAsset = {
        type: "ERC20",
        options: {
            address: contractsMetadata.contracts['AdriaTest'].address,
            symbol: "ADRIAT",
            decimals: 18,
            image: `${externalUrl}assets/metamask_adriat.png`
        }
    };

    return new Map([
        ["ADRIAT", ADRIA_TEST_ASSET]
    ]);

}

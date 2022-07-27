import { BaseContract, Contract, ethers, Signer, BigNumber } from "ethers";
import { Provider } from "@ethersproject/providers";
import { Bytes, BytesLike, EventFragment, FunctionFragment } from "ethers/lib/utils";

const _abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "adriaToken_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "usdcToken_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "backendAddress_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "usdcBeneficiary_",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "usdcAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "signedAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "stage",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "_v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "_r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_s",
                "type": "bytes32"
            }
        ],
        "name": "buy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "stage",
                "type": "uint256"
            }
        ],
        "name": "calculateAdriaTokensForStage",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "stageNumber",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "swapRatio",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startBuyVestingTimestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "changeStage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "holder",
                "type": "address"
            }
        ],
        "name": "computeNextVestingScheduleIdForHolder",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "vestingScheduleId",
                "type": "bytes32"
            }
        ],
        "name": "computeReleasableAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "holder",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "computeVestingScheduleIdForAddressAndIndex",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_beneficiary",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_start",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_cliff",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amountOnStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "createVestingSchedule",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_messageHash",
                "type": "bytes32"
            }
        ],
        "name": "getEthSignedMessageHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "holder",
                "type": "address"
            }
        ],
        "name": "getLastVestingScheduleForHolder",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "initialized",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "beneficiary",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "cliff",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountOnStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "start",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountTotal",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "released",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct AdriaVesting.VestingSchedule",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "signedAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "stage",
                "type": "uint256"
            }
        ],
        "name": "getMessageHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getVestingIdAtIndex",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "vestingScheduleId",
                "type": "bytes32"
            }
        ],
        "name": "getVestingSchedule",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "initialized",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "beneficiary",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "cliff",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountOnStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "start",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountTotal",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "released",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct AdriaVesting.VestingSchedule",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "holder",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getVestingScheduleByAddressAndIndex",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "initialized",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "beneficiary",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "cliff",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountOnStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "start",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountTotal",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "released",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct AdriaVesting.VestingSchedule",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getVestingSchedulesCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_beneficiary",
                "type": "address"
            }
        ],
        "name": "getVestingSchedulesCountByBeneficiary",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getVestingSchedulesTotalAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getWithdrawableAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "investors",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "vestingScheduleId",
                "type": "bytes32"
            }
        ],
        "name": "release",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "stages",
        "outputs": [
            {
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "swapRatio",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startBuyVestingTimestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

const _address = "0x6a72d0119924675A67F0D808C0702db0c7E88480";

export class AdriaVestingContractFactory {
    static readonly abi = _abi;
    static readonly address = _address;

    static connect(signerOrProvider: Signer | Provider | undefined): AdriaVestingContract {
        return new AdriaVestingContract(_address, _abi, signerOrProvider);
    }
}
    
const dateAsNumber = (date: Date): number => {
    return + date;
}

const dateAsSeconds = (date: Date): number => {
    return Math.ceil(dateAsNumber(date) / 1000);
}

export class AdriaVestingContract extends BaseContract {
    private _contract: Contract;
    constructor(address: string, abi: ethers.ContractInterface, signerOrProvider: Provider | Signer | undefined) {
        super(address, abi, signerOrProvider);
        this._contract = new Contract(address, abi, signerOrProvider);
    }

    public async createVestingSchedule(
        addressBeneficiary: string, 
        start: BigNumber,
        _cliff: BigNumber,
        _amountOnStart: BigNumber,
        _duration: BigNumber,
        _amount: BigNumber
        ) {
        return await this._contract['createVestingSchedule'](addressBeneficiary, start, _cliff, _amountOnStart, _duration, _amount, {gasLimit: 100000, nonce: dateAsSeconds(new Date())});
    }

    public async buy(
        usdcAmount: BigNumber, 
        signedAmount: BigNumber,
        stage: number,
        _v: any,
        _r: any,
        _s: any
        ) {
        const result = await this._contract['buy'](usdcAmount, signedAmount, stage, _v, _r, _s, {gasLimit: 1000000, nonce: dateAsSeconds(new Date())});
        try {
            await result.wait();
        } catch(error) {
            console.log(error);
        }
    }

    public async getMessageHash(
        userAddress: string, 
        signedAmount: BigNumber,
        stage: number
        ): Promise<BytesLike> {
            return await this._contract['getMessageHash'](userAddress, signedAmount, stage, {gasLimit: 100000, nonce: dateAsSeconds(new Date())});
    }

    public async getEthSignedMessageHash(
        _messageHash: BytesLike, 
        ): Promise<BytesLike> {
            return await this._contract['getEthSignedMessageHash'](_messageHash, {gasLimit: 100000, nonce: dateAsSeconds(new Date())});
    }

    public async getVestingSchedulesTotalAmount() {
        const result = await this._contract['getVestingSchedulesTotalAmount']();
        return ethers.utils.formatEther(result);
    }

    public async stages(stageNumber: BigNumber) {
        const result: {status: boolean; swapRatio: BigNumber; startBuyVestingTimestamp: BigNumber} = await this._contract['stages'](stageNumber);
        return result;
    }

    public async calculateAdriaTokensForStage(amount: BigNumber, stage: BigNumber) {
        const result = await this._contract['calculateAdriaTokensForStage'](amount, stage);
        return ethers.utils.formatEther(result);
    }

    public async changeStage(stageNumber: BigNumber, swapRatio: BigNumber, startBuyVestingTimestamp: BigNumber, status: boolean) {
        const result = await this._contract['changeStage'](stageNumber, swapRatio, startBuyVestingTimestamp, status, {gasLimit: 100000, nonce: dateAsSeconds(new Date())});
    }
}

export interface AdriaVestingContractInterface {
    events: {
        "OwnershipTransferred(address indexed previousOwner, address indexed newOwner)": EventFragment
    }
    functions: {
        "constructor(address adriaToken_, address usdcToken_, address backendAddress_, address usdcBeneficiary_)": FunctionFragment,
        "buy(uint256 usdcAmount, uint256 signedAmount, uint256 stage, uint8 _v, bytes32 _r, bytes32 _s)": FunctionFragment,
        "calculateAdriaTokensForStage(uint256 amount, uint256 stage) view returns (uint256)": FunctionFragment,
        "changeStage(uint256 stageNumber, uint256 swapRatio, uint256 startBuyVestingTimestamp, bool status)": FunctionFragment,
        "computeNextVestingScheduleIdForHolder(address holder) view returns (bytes32)": FunctionFragment,
        "computeReleasableAmount(bytes32 vestingScheduleId) view returns (uint256)": FunctionFragment,
        "computeVestingScheduleIdForAddressAndIndex(address holder, uint256 index) pure returns (bytes32)": FunctionFragment,
        "createVestingSchedule(address _beneficiary, uint256 _start, uint256 _cliff, uint256 _amountOnStart, uint256 _duration, uint256 _amount)": FunctionFragment,
        "getEthSignedMessageHash(bytes32 _messageHash) pure returns (bytes32)": FunctionFragment,
        "getLastVestingScheduleForHolder(address holder) view returns (tuple(bool initialized, address beneficiary, uint256 cliff, uint256 amountOnStart, uint256 start, uint256 duration, uint256 amountTotal, uint256 released))": FunctionFragment,
        "getMessageHash(address userAddress, uint256 signedAmount, uint256 stage) pure returns (bytes32)": FunctionFragment,
        "getToken() view returns (address)": FunctionFragment,
        "getVestingIdAtIndex(uint256 index) view returns (bytes32)": FunctionFragment,
        "getVestingSchedule(bytes32 vestingScheduleId) view returns (tuple(bool initialized, address beneficiary, uint256 cliff, uint256 amountOnStart, uint256 start, uint256 duration, uint256 amountTotal, uint256 released))": FunctionFragment,
        "getVestingScheduleByAddressAndIndex(address holder, uint256 index) view returns (tuple(bool initialized, address beneficiary, uint256 cliff, uint256 amountOnStart, uint256 start, uint256 duration, uint256 amountTotal, uint256 released))": FunctionFragment,
        "getVestingSchedulesCount() view returns (uint256)": FunctionFragment,
        "getVestingSchedulesCountByBeneficiary(address _beneficiary) view returns (uint256)": FunctionFragment,
        "getVestingSchedulesTotalAmount() view returns (uint256)": FunctionFragment,
        "getWithdrawableAmount() view returns (uint256)": FunctionFragment,
        "investors(address, uint256) view returns (uint256)": FunctionFragment,
        "owner() view returns (address)": FunctionFragment,
        "release(bytes32 vestingScheduleId)": FunctionFragment,
        "renounceOwnership()": FunctionFragment,
        "stages(uint256) view returns (bool status, uint256 swapRatio, uint256 startBuyVestingTimestamp)": FunctionFragment,
        "transferOwnership(address newOwner)": FunctionFragment,
        "withdraw(uint256 amount)": FunctionFragment,
    }
}
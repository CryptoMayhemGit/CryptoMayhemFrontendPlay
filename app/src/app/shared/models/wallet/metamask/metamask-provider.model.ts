import { MetamaskRequest } from "./metamask-request.model";


export interface MetamaskProvider {
    
    request: (args: MetamaskRequest) => Promise<any>;
    on: (method: string, listener: (...args: any[]) => void) => void;
    removeListener: (method: string, listener: (...args: any[]) => void) => void;

}

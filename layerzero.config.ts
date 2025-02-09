// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'

const skaleEuropaTestnetContract = {
    eid: EndpointId.SKALE_V2_TESTNET,
    contractName: 'Token'
}

const arbitrumTestnetContract = {
    eid: EndpointId.ARBSEP_V2_TESTNET,
    contractName: 'Token'
}


export default {
    contracts: [
        {
            contract: skaleEuropaTestnetContract
        },
        {
            contract: arbitrumTestnetContract
        }
    ],
    connections: [
        {
            from: skaleEuropaTestnetContract,
            to: arbitrumTestnetContract
        },
        {
            from: arbitrumTestnetContract,
            to: skaleEuropaTestnetContract
        },

    ],
}
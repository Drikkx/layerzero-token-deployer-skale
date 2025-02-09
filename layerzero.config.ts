// eslint-disable-next-line @typescript-eslint/no-var-requires
import { EndpointId } from '@layerzerolabs/lz-definitions'

const polygonContract = {
    eid: EndpointId.POLYGON_V2_MAINNET,
    contractName: 'Token',
}

const mumbaiContract = {
    eid: EndpointId.POLYGON_V2_TESTNET,
    contractName: 'Token'
}

const skaleEuropaContract = {
    eid: EndpointId.SKALE_V2_MAINNET,
    contractName: 'Token'
}

const skaleEuropaTestnetContract = {
    eid: EndpointId.SKALE_V2_TESTNET,
    contractName: 'Token'
}

const arbitrumTestnetContract = {
    eid: EndpointId.ARBITRUM_V2_TESTNET,
    contractName: 'Token'
}

const arbitrumContract = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'Token'
}


export default {
    contracts: [
        {
            contract: polygonContract
        },
        {
            contract: skaleEuropaContract
        },
        {
            contract: arbitrumContract
        },
        {
            contract: mumbaiContract
        },
        {
            contract: skaleEuropaTestnetContract
        },
        {
            contract: arbitrumTestnetContract
        }
    ],
    connections: [
        {
            from: polygonContract,
            to: skaleEuropaContract
        },
        {
            from: skaleEuropaContract,
            to: polygonContract
        },
        {
            from: polygonContract,
            to: arbitrumContract
        },
        {
            from: arbitrumContract,
            to: polygonContract
        },
        {
            from: skaleEuropaContract,
            to: arbitrumContract
        },
        {
            from: arbitrumContract,
            to: skaleEuropaContract
        },
        {
            from: mumbaiContract,
            to: skaleEuropaTestnetContract
        },
        {
            from: skaleEuropaTestnetContract,
            to: mumbaiContract
        },
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
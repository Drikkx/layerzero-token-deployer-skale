import hre from "hardhat";
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { utils } from "ethers";
import { EndpointId } from '@layerzerolabs/lz-definitions'
import Token from '../deployments/arbitrumTestnet/Token.json'

async function main() {
    const TokenFactory = await hre.ethers.getContractFactory("Token");
    const TokenArbitrum = TokenFactory.attach(Token.address);

    const peerAddress = utils.zeroPad(Token.address, 32);
    const peerChainId = EndpointId.SKALE_V2_TESTNET;

    console.log(`Setting peer on ${peerChainId} to ${peerAddress}`);
    await TokenArbitrum.setPeer(peerChainId, peerAddress);

    console.log("Peer set!");

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });
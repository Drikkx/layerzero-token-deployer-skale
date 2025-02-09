import hre from "hardhat";
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { utils } from "ethers";
import { EndpointId } from '@layerzerolabs/lz-definitions'

async function main() {
    const WrappedForLootAndGloryAddress = "0x22Aa29c2a15cea061f7d7910CA908909164a98C3";
    const ForLootAndGloryTokenAddress = "0x8a81F441ca4383beB6D1161504dEE0b0a7Af47bb";
    const ForLootAndGloryTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const ForLootAndGloryToken = ForLootAndGloryTokenFactory.attach(ForLootAndGloryTokenAddress);

    const peerAddress = utils.zeroPad(WrappedForLootAndGloryAddress, 32);
    const peerChainId = EndpointId.POLYGON_V2_TESTNET;

    console.log(`Setting peer on ${peerChainId} to ${peerAddress}`);
    await ForLootAndGloryToken.setPeer(peerChainId, peerAddress);

    console.log("Peer set!");

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });
import hre, { ethers } from "hardhat";
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { utils } from "ethers";
import { EndpointId } from '@layerzerolabs/lz-definitions'

async function main() {
    const WrappedForLootAndGloryAddress = "0x22Aa29c2a15cea061f7d7910CA908909164a98C3";
    const ForLootAndGloryTokenAddress = "0xcdF030a3E65f917DFa8d74555A64a5eC5303c88e";
    const ExistingTokenAddress = "0x9111D6446Ac5b88A84cf06425c6286658368542F";
    const ExistingTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const WrappedForLootAndGloryFactory = await hre.ethers.getContractFactory("WrappedForLootAndGlory");
    const ForLootAndGloryTokenFactory = await hre.ethers.getContractFactory("ForLootAndGloryToken");
    const WrappedForLootAndGlory = WrappedForLootAndGloryFactory.attach(WrappedForLootAndGloryAddress);
    const ForLootAndGloryToken = ForLootAndGloryTokenFactory.attach(ForLootAndGloryTokenAddress);
    const ExistingToken = ExistingTokenFactory.attach(ExistingTokenAddress);

    const peerAddress = utils.zeroPad(ForLootAndGloryTokenAddress, 32);
    const peerChainId = EndpointId.SKALE_MAINNET;

    console.log(`Setting peer on ${peerChainId} to ${peerAddress}`);
    const tx = await WrappedForLootAndGlory.setPeer(peerChainId, peerAddress);
    const receipt = await tx.wait();
    console.log(receipt)

    console.log("Peer set!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
    });
import hre, { ethers } from "hardhat";
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { utils } from "ethers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from '@layerzerolabs/lz-definitions';

async function main() {
    // Charger ou déployer vos contrats ici. Pour cet exemple, nous allons simplement charger des contrats déjà déployés.
    const TokenAddressSource = "0x8a81F441ca4383beB6D1161504dEE0b0a7Af47bb";
    const TokenAddressDestination = "0x8a81F441ca4383beB6D1161504dEE0b0a7Af47bb";
    const TokenFactory = await hre.ethers.getContractFactory("Token");
    const WrappedForLootAndGlory = TokenFactory.attach(TokenAddressSource);

    // Vous devez avoir les adresses des comptes participants.
    const [signer] = await ethers.getSigners();

    // Préparer les paramètres pour le transfert.
    const tokensToSend = utils.parseEther("1");
    const destinationChainId = EndpointId.SKALE_V2_TESTNET
    const destinationAddress = signer.address; // Adresse de destination sur la chaîne B.

    // Construction des options de message.
    const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();

    // Construction des paramètres de la fonction send.
    const sendParam = [
        destinationChainId,
        utils.zeroPad(destinationAddress, 32),
        tokensToSend,
        tokensToSend,
        options,
        '0x',
        '0x',
    ];

    // Obtenir le frais natif pour l'opération de send.
    const [nativeFee] = await WrappedForLootAndGlory.quoteSend(sendParam, false);
    console.log(`Sending ${tokensToSend.toString()} tokens from Contract A to Contract B`);
    await WrappedForLootAndGlory.send(sendParam, [nativeFee, 0], signer.address, { value: nativeFee });

    console.log("Transfer successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

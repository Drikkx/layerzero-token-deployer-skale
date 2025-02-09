import hre, { ethers } from "hardhat";
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { utils } from "ethers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from '@layerzerolabs/lz-definitions';
import TokenArb from '../deployments/arbitrumTestnet/Token.json'
import TokenEuropa from '../deployments/europaTestnet/Token.json'

async function main() {
    // bridge arb > europa
    const TokenFactory = await hre.ethers.getContractFactory("Token");
    const TokenSource = TokenFactory.attach(TokenArb.address);

    // Vous devez avoir les adresses des comptes participants.
    const [signer] = await ethers.getSigners();

    // Préparer les paramètres pour le transfert.
    const tokensToSend = utils.parseEther("1");
    const mintTx = await TokenSource.mint(tokensToSend, signer.address)
    const mintReceipt = await mintTx.wait()
    console.log('Hash Mint : ', mintReceipt.transactionHash)
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
    const [nativeFee] = await TokenSource.quoteSend(sendParam, false);
    console.log(`Sending ${tokensToSend.toString()} tokens from Contract A to Contract B`);
    await TokenSource.send(sendParam, [nativeFee, 0], signer.address, { value: nativeFee });

    console.log("Transfer successful!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

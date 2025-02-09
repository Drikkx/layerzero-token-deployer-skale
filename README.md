

## 1) Developing Contracts

### Installing dependencies

We recommend using `pnpm` as a package manager (but you can of course use a package manager of your choice):

```bash
pnpm install
```

### Compiling your contracts

This project supports both `hardhat` and `forge` for compilation. By default, the `compile` command will execute both:

```bash
pnpm compile
```

## 2) Deploying and Interacting with Contracts

### Setting up deployer wallet/account

- Rename `.env.example` to `.env`
- Choose your preferred method for setting up your deployer wallet/account:

```
MNEMONIC="test test test test test test test test test test test junk"
or...
PRIVATE_KEY="0xabc...def"
```

- Ensure this address is funded with the native tokens of the chain you wish to deploy to.

### Deploying Contracts

To deploy your contracts to your desired blockchains, run the following command:

```bash
npx hardhat lz:deploy
```

### Setting Peers and Bridging Tokens

After deploying, set up the peer contracts on different networks and bridge tokens using the following commands:

```bash
# Setting peer on Mumbai network
npx hardhat run ./scripts/peerMumbai.ts --network mumbai

# Setting peer on Europa network
npx hardhat run ./scripts/peerEuropa.ts --network europa

# Bridging tokens from Contract A to Contract B on Mumbai network
npx hardhat run ./scripts/bridge.ts --network mumbai
```

Note: You might encounter warnings about `

bigint` bindings. These can usually be ignored for testnet interactions, but ensure your environment supports `bigint` for production deployments.

For more detailed CLI arguments and options:

```bash
npx hardhat lz:deploy --help
```

By following these steps, you can focus more on creating innovative omnichain solutions and less on the complexities of cross-chain communication.

<br></br>

<p align="center">
  Join our community on <a href="https://discord-layerzero.netlify.app/discord" style="color: #a77dff">Discord</a> | Follow us on <a href="https://twitter.com/LayerZero_Labs" style="color: #a77dff">Twitter</a>
</p>
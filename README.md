# TON Wallet Interaction Project

This project showcases basic operations with a TON (Telegram Open Network) wallet using various libraries. It demonstrates how to create a TON client, check if a wallet is deployed, obtain its balance, and send a transfer to another wallet.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have `node` and `npm` installed. If not, download and install them from [here](https://nodejs.org/).

### Installation

1. Clone the repository:
    ```
    git clone [YOUR_REPOSITORY_URL]
    ```
2. Navigate to the project directory:
    ```
    cd [YOUR_PROJECT_DIRECTORY]
    ```
3. Install the required packages:
    ```
    npm install
    ```
## Usage
To run the project, simply execute:
```
npm run main
``` 
This will:
1. Convert the mnemonic to a wallet key.
2. Create a TON wallet.
3. Establish a connection to the TON testnet.
4. Check if the wallet is deployed.
5. If the wallet is deployed, it will fetch and display the balance.
6. Send a transfer to a specified TON address.
7. Monitor and wait until the transaction is confirmed.

## Features
- **mnemonicToWalletKey**: Converts a mnemonic phrase to a TON wallet key.
- **TonClient**: Helps in interacting with the TON network.
- **WalletContractV4**: Represents a TON wallet contract.
- **sendTransfer**: Sends a transfer from one wallet to another.

## Libraries & Dependencies
- **ton-crypto**: Provides cryptographic utilities for TON.
- **ton**: Main library to interact with TON.
- **@orbs-network/ton-access**: Assists in accessing TON network endpoints.

## Security Note
Please note that the provided mnemonic in this code is for demonstration purposes. It's crucial to keep your mnemonics secure and never expose them in production code or publicly.
 
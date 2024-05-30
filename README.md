
# Solana Jito Token Creator

Welcome to the Solana Jito Token Creator! This guide will help you with the initial setup, configuration, and running of the project.

## Table of Contents
- [Initial Setup and Configuration](#initial-setup-and-configuration)
  - [Setup](#setup)
  - [Configuration](#configuration)
- [How to Run the Project](#how-to-run-the-project)

## Initial Setup and Configuration

### Setup
1. Download Node.js from [Node.js](https://nodejs.org/en/blog/release/)
2. Install it.
3. Open Command Prompt and navigate to the project folder.
4. Run the command `npm i` and press enter.

### Configuration
1. Place your token image in the project directory and name it `image.png`.
2. Open `config.js` and set the following variables:
    - **PRIVATE_KEY**: Put your deployer private key between "" where it wrote `// Private Key of Deployer`
    - **endpoint**: Put your rpc endpoint between "" where it wrote `// RPC ENDPOINT`
    - **revokeMintBool**: Set to `false` if you don't want to revoke minting. Default is `true`.
    - **revokeFreezeBool**: Set to `false` if you don't want to revoke freeze auth. Default is `true`.
    - **tokenInfo**: Configure as follows in `config.js`:
        - **amount**: Set the amount of tokens you want to create.
        - **decimals**: Set the number of decimals for the token.
        - **metadata**: Leave it empty.
        - **symbol**: Set the token symbol (max 10 characters).
        - **tokenName**: Set the token name.
    - **metaDataforToken**: Configure as follows in `config.js` (optional sections):
        - **image**: Leave it empty.
        - **description**: Add a description for your token.
        - **extensions**: Add your social links (e.g., website, twitter, telegram, discord).
        - **tags**: Enter your tags as defined in the example.

### We Done with Configuration

## How to Run the Project
Run the following command in your terminal:

```bash
node main.js
```

If everything is configured correctly, this command will create the token for you.

## 📞 Contact
- **Telegram:** [@support_telegram](https://t.me/ZorroScripts)

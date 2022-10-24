// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Get user wallet
const publicKey = process.argv.slice(2).toString();

const getWalletBalance = async () => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        );

        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);

    } catch (err) {
        console.log(err);
    }
};
    
const airDropSol = async () => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    console.log("Your Wallet is : " + publicKey);
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();

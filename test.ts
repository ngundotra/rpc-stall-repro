import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    Logs,
    PublicKey,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';

async function main() {
    const connection = new Connection("http://localhost:8899");
    connection.onLogs(
        'all',
        (logs: Logs) => {
            console.log(">", logs);
        },
        "confirmed"
    );
    const programId = new PublicKey("6UDJi13e4PyM3KSRUgJoF2BYxTYmYVFUPMy2qG4JMRFf")
    const ix = new TransactionInstruction({
        keys: [],
        programId,
        data: Buffer.alloc(0)
    });
    const tx = new Transaction().add(ix);

    const payer = Keypair.generate();
    const airdropTxid = await connection.requestAirdrop(payer.publicKey, 1 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdropTxid);
    console.log("Succesfully airdropped sol");
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash({ commitment: "confirmed" })).blockhash;

    console.log("Sending outer tx");
    const txid = await connection.sendTransaction(tx, [payer], { skipPreflight: true });

    console.log("Confirming outer tx");
    const txinfo = await connection.confirmTransaction(txid);
    console.log(txinfo);
}

main();
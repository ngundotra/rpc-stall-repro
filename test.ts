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
    const programId = new PublicKey("EMZDuMn33tTJKpkKTmcLHgSp8k5zm6vYvv8FoUZMSGUX")
    const calledId = new PublicKey("6Dyva8NZbtpzvtcefzoKuJNEgaj1iYi4Himqd8urJhZZ");
    const ix = new TransactionInstruction({
        keys: [{
            pubkey: calledId,
            isSigner: false,
            isWritable: false,
        }],
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
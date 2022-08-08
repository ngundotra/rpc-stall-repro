use solana_program::{
    account_info::AccountInfo, declare_id, entrypoint::ProgramResult, instruction::Instruction,
    log::sol_log, pubkey::Pubkey,
};

declare_id!("6Dyva8NZbtpzvtcefzoKuJNEgaj1iYi4Himqd8urJhZZ");

#[cfg(not(feature = "no-entrypoint"))]
solana_program::entrypoint!(no_op);

pub fn no_op(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    sol_log("No op");
    Ok(())
}

pub fn no_op_instruction(data: Vec<u8>) -> Instruction {
    Instruction {
        program_id: crate::id(),
        accounts: vec![],
        data: vec![],
    }
}

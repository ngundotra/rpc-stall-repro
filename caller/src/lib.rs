use callee::no_op_instruction;
use solana_program::{
    account_info::{next_account_info, Account, AccountInfo},
    declare_id,
    entrypoint::ProgramResult,
    instruction::Instruction,
    program::invoke,
    pubkey,
    pubkey::Pubkey,
};

declare_id!("EMZDuMn33tTJKpkKTmcLHgSp8k5zm6vYvv8FoUZMSGUX");

#[cfg(not(feature = "no-entrypoint"))]
solana_program::entrypoint!(call);

pub fn call(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    let program_id = pubkey!("EMZDuMn33tTJKpkKTmcLHgSp8k5zm6vYvv8FoUZMSGUX");
    let accounts_iter = &mut accounts.iter();
    let program = next_account_info(accounts_iter)?;
    invoke(&no_op_instruction(vec![]), &[program.clone()])?;
    Ok(())
}

pub fn wrap_instruction(data: Vec<u8>) -> Instruction {
    Instruction {
        program_id: crate::id(),
        accounts: vec![],
        data,
    }
}

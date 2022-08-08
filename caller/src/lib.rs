use callee::no_op_instruction;
use solana_program::{
    account_info::AccountInfo, declare_id, entrypoint::ProgramResult, instruction::Instruction,
    program::invoke, pubkey::Pubkey,
};

declare_id!("EMZDuMn33tTJKpkKTmcLHgSp8k5zm6vYvv8FoUZMSGUX");

#[cfg(not(feature = "no-entrypoint"))]
solana_program::entrypoint!(call);

pub fn call(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    invoke(&no_op_instruction(vec![]), &[])?;
    Ok(())
}

pub fn wrap_instruction(data: Vec<u8>) -> Instruction {
    Instruction {
        program_id: crate::id(),
        accounts: vec![],
        data,
    }
}

use cosmwasm_schema::cw_serde;
use cosmwasm_std::Uint128;
use cw_storage_plus::Item;

#[cw_serde]
pub struct State {
    pub client: String,
    pub freelancer: String,
    pub amount: Uint128,
    pub is_completed: bool,
}

pub const STATE: Item<State> = Item::new("state");
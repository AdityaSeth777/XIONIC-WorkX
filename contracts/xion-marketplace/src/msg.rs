use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;

#[cw_serde]
pub struct InstantiateMsg {
    pub client: String,
    pub freelancer: String,
    pub amount: Uint128,
}

#[cw_serde]
pub enum ExecuteMsg {
    CompleteWork {},
    ReleasePayment {},
    Dispute {},
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(StateResponse)]
    GetState {},
}

#[cw_serde]
pub struct StateResponse {
    pub client: String,
    pub freelancer: String,
    pub amount: Uint128,
    pub is_completed: bool,
}
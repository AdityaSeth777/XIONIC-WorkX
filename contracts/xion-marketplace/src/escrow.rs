use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
    Uint128, WasmMsg, CosmosMsg, BankMsg, coins,
};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub client: String,
    pub freelancer: String,
    pub amount: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub client: String,
    pub freelancer: String,
    pub amount: Uint128,
    pub is_completed: bool,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    CompleteWork {},
    ReleasePayment {},
    Dispute {},
}

pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = State {
        client: msg.client,
        freelancer: msg.freelancer,
        amount: msg.amount,
        is_completed: false,
    };
    deps.storage.set(b"state", &to_binary(&state)?);

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("client", state.client)
        .add_attribute("freelancer", state.freelancer)
        .add_attribute("amount", state.amount.to_string()))
}

pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::CompleteWork {} => execute_complete_work(deps, env, info),
        ExecuteMsg::ReleasePayment {} => execute_release_payment(deps, env, info),
        ExecuteMsg::Dispute {} => execute_dispute(deps, env, info),
    }
}

fn execute_complete_work(deps: DepsMut, _env: Env, info: MessageInfo) -> StdResult<Response> {
    let mut state: State = deps.storage.get(b"state")?.parse_into()?;
    if info.sender.to_string() != state.freelancer {
        return Err(StdError::generic_err("Only freelancer can mark work as complete"));
    }
    state.is_completed = true;
    deps.storage.set(b"state", &to_binary(&state)?);

    Ok(Response::new().add_attribute("method", "complete_work"))
}

fn execute_release_payment(deps: DepsMut, env: Env, info: MessageInfo) -> StdResult<Response> {
    let state: State = deps.storage.get(b"state")?.parse_into()?;
    if info.sender.to_string() != state.client {
        return Err(StdError::generic_err("Only client can release payment"));
    }
    if !state.is_completed {
        return Err(StdError::generic_err("Work must be completed before payment release"));
    }

    let payment_msg = BankMsg::Send {
        to_address: state.freelancer,
        amount: coins(state.amount.u128(), "uxion"),
    };

    Ok(Response::new()
        .add_message(CosmosMsg::Bank(payment_msg))
        .add_attribute("method", "release_payment")
        .add_attribute("amount", state.amount.to_string()))
}

fn execute_dispute(deps: DepsMut, _env: Env, info: MessageInfo) -> StdResult<Response> {
    let state: State = deps.storage.get(b"state")?.parse_into()?;
    if info.sender.to_string() != state.client && info.sender.to_string() != state.freelancer {
        return Err(StdError::generic_err("Only client or freelancer can raise a dispute"));
    }

    Ok(Response::new()
        .add_attribute("method", "dispute")
        .add_attribute("sender", info.sender))
}
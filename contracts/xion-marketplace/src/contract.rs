use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
    BankMsg, coins,
};

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg, StateResponse};
use crate::state::{State, STATE};

pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = State {
        client: msg.client,
        freelancer: msg.freelancer,
        amount: msg.amount,
        is_completed: false,
    };
    STATE.save(deps.storage, &state)?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("client", state.client)
        .add_attribute("freelancer", state.freelancer)
        .add_attribute("amount", state.amount))
}

pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::CompleteWork {} => execute_complete_work(deps, info),
        ExecuteMsg::ReleasePayment {} => execute_release_payment(deps, env, info),
        ExecuteMsg::Dispute {} => execute_dispute(deps, info),
    }
}

pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetState {} => to_binary(&query_state(deps)?),
    }
}

fn execute_complete_work(deps: DepsMut, info: MessageInfo) -> Result<Response, ContractError> {
    let mut state = STATE.load(deps.storage)?;
    if info.sender.to_string() != state.freelancer {
        return Err(ContractError::Unauthorized {});
    }
    state.is_completed = true;
    STATE.save(deps.storage, &state)?;

    Ok(Response::new().add_attribute("method", "complete_work"))
}

fn execute_release_payment(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
) -> Result<Response, ContractError> {
    let state = STATE.load(deps.storage)?;
    if info.sender.to_string() != state.client {
        return Err(ContractError::Unauthorized {});
    }
    if !state.is_completed {
        return Err(ContractError::WorkNotCompleted {});
    }

    let payment_msg = BankMsg::Send {
        to_address: state.freelancer,
        amount: coins(state.amount.u128(), "uxion"),
    };

    Ok(Response::new()
        .add_message(payment_msg)
        .add_attribute("method", "release_payment")
        .add_attribute("amount", state.amount))
}

fn execute_dispute(deps: DepsMut, info: MessageInfo) -> Result<Response, ContractError> {
    let state = STATE.load(deps.storage)?;
    if info.sender.to_string() != state.client && info.sender.to_string() != state.freelancer {
        return Err(ContractError::Unauthorized {});
    }

    Ok(Response::new()
        .add_attribute("method", "dispute")
        .add_attribute("sender", info.sender))
}

fn query_state(deps: Deps) -> StdResult<StateResponse> {
    let state = STATE.load(deps.storage)?;
    Ok(StateResponse {
        client: state.client,
        freelancer: state.freelancer,
        amount: state.amount,
        is_completed: state.is_completed,
    })
}
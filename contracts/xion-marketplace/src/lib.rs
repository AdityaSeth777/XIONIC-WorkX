use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use xion_sdk::{Account, Transaction, XionClient};

#[derive(Serialize, Deserialize)]
pub struct PaymentDetails {
    pub to: String,
    pub amount: String,
    pub memo: String,
}

#[wasm_bindgen]
pub struct XionMarketplace {
    client: XionClient,
}

#[wasm_bindgen]
impl XionMarketplace {
    #[wasm_bindgen(constructor)]
    pub fn new(rpc_url: &str) -> Self {
        let client = XionClient::new(rpc_url);
        Self { client }
    }

    #[wasm_bindgen]
    pub async fn send_payment(&self, details: JsValue) -> Result<JsValue, JsValue> {
        let payment: PaymentDetails = serde_wasm_bindgen::from_value(details)?;
        
        let tx = Transaction::new()
            .with_send(
                &payment.to,
                &payment.amount,
                "uxion",
            )
            .with_memo(&payment.memo);

        let result = self.client
            .broadcast_tx(tx)
            .await
            .map_err(|e| JsValue::from_str(&e.to_string()))?;

        Ok(serde_wasm_bindgen::to_value(&result)?)
    }

    #[wasm_bindgen]
    pub async fn create_meta_account(&self, name: &str) -> Result<JsValue, JsValue> {
        let account = Account::new()
            .with_name(name)
            .with_module("marketplace");

        let result = self.client
            .create_account(account)
            .await
            .map_err(|e| JsValue::from_str(&e.to_string()))?;

        Ok(serde_wasm_bindgen::to_value(&result)?)
    }
}
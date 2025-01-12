// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XionToken is ERC20 {
    constructor() ERC20("XionToken", "XION") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    function faucet() external {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}

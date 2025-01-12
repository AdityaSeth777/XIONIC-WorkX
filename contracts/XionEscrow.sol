// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract XionEscrow {
    struct Escrow {
        uint256 projectId;
        address client;
        address freelancer;
        uint256 amount;
        bool isReleased;
    }

    mapping(uint256 => Escrow) public escrows;

    event EscrowCreated(uint256 projectId, address client, address freelancer, uint256 amount);
    event EscrowReleased(uint256 projectId, uint256 amount);

    function createEscrow(uint256 _projectId, address _freelancer) external payable {
        require(msg.value > 0, "Escrow amount must be greater than zero");
        require(escrows[_projectId].amount == 0, "Escrow already exists for this project");

        escrows[_projectId] = Escrow({
            projectId: _projectId,
            client: msg.sender,
            freelancer: _freelancer,
            amount: msg.value,
            isReleased: false
        });

        emit EscrowCreated(_projectId, msg.sender, _freelancer, msg.value);
    }

    function releaseEscrow(uint256 _projectId) external {
        Escrow storage escrow = escrows[_projectId];
        require(escrow.client == msg.sender, "Only client can release escrow");
        require(!escrow.isReleased, "Escrow already released");

        escrow.isReleased = true;
        payable(escrow.freelancer).transfer(escrow.amount);

        emit EscrowReleased(_projectId, escrow.amount);
    }
}

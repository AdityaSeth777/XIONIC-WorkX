// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract XionMarketplace {
    struct Project {
        uint256 id;
        address client;
        string title;
        string description;
        uint256 budget;
        address freelancer;
        bool isCompleted;
        bool isPaid;
    }

    struct Milestone {
        uint256 projectId;
        string description;
        uint256 amount;
        bool isCompleted;
        bool isPaid;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Milestone[]) public projectMilestones;
    uint256 public projectCounter;

    event ProjectCreated(uint256 projectId, address client, string title, uint256 budget);
    event ProjectAssigned(uint256 projectId, address freelancer);
    event MilestoneCompleted(uint256 projectId, uint256 milestoneIndex);
    event PaymentReleased(uint256 projectId, address freelancer, uint256 amount);

    function createProject(string memory _title, string memory _description, uint256 _budget) external {
        projectCounter++;
        projects[projectCounter] = Project({
            id: projectCounter,
            client: msg.sender,
            title: _title,
            description: _description,
            budget: _budget,
            freelancer: address(0),
            isCompleted: false,
            isPaid: false
        });

        emit ProjectCreated(projectCounter, msg.sender, _title, _budget);
    }

    function assignFreelancer(uint256 _projectId, address _freelancer) external {
        require(projects[_projectId].client == msg.sender, "Only client can assign freelancer");
        require(projects[_projectId].freelancer == address(0), "Freelancer already assigned");

        projects[_projectId].freelancer = _freelancer;
        emit ProjectAssigned(_projectId, _freelancer);
    }

    function addMilestone(uint256 _projectId, string memory _description, uint256 _amount) external {
        require(projects[_projectId].client == msg.sender, "Only client can add milestones");
        
        projectMilestones[_projectId].push(Milestone({
            projectId: _projectId,
            description: _description,
            amount: _amount,
            isCompleted: false,
            isPaid: false
        }));
    }

    function completeMilestone(uint256 _projectId, uint256 _milestoneIndex) external payable {
        require(projects[_projectId].client == msg.sender, "Only client can complete milestone");
        require(msg.value >= projectMilestones[_projectId][_milestoneIndex].amount, "Insufficient payment");

        Milestone storage milestone = projectMilestones[_projectId][_milestoneIndex];
        milestone.isCompleted = true;
        
        // Transfer payment to freelancer
        payable(projects[_projectId].freelancer).transfer(milestone.amount);
        milestone.isPaid = true;

        emit MilestoneCompleted(_projectId, _milestoneIndex);
        emit PaymentReleased(_projectId, projects[_projectId].freelancer, milestone.amount);
    }
}
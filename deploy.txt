// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CrowdFund {
    address private owner; 
    uint256 private totalFund;

    // struct User {

    // }

    mapping(address => uint256) public Campaign;

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value > 0, "Enter amount greater than Zero.");

        Campaign[msg.sender] += msg.value;
        totalFund += msg.value;
    }

    function withdraw(address payable _owner) public {
        require(owner == _owner, "Only owner of this crownd fund can Withdraw");
        require(
            address(this).balance >= totalFund,
            "Not enough balance in contract"
        );
        _owner.transfer(totalFund);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

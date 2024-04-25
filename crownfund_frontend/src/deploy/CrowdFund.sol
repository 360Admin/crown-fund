// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CrowdFundDAO {
    address private owner;
    uint256 private totalFund;

    address[] public voters;
    uint256 public yesVotes;

    uint256 public startTime;
    uint256 public endTime;

    mapping(address => uint256) public Campaign;
    mapping(address => bool) public OwnersVote;

    constructor(address[] memory _voters) {
        owner = msg.sender;
        for (uint256 i = 0; i < _voters.length; i++) {
            voters.push(_voters[i]);
            OwnersVote[_voters[i]] = false;
            yesVotes = 0;
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this function");
        _;
    }

    function vote(bool _vote) public {
        require(OwnersVote[msg.sender] == false, "You have already voted");
        require(isValidVoter(msg.sender), "not authorised");
        require(startTime > 0 && endTime > 0, "start and end time is not set");
        require(
            block.timestamp > startTime && block.timestamp < endTime,
            "Voting Window is Closed"
        );
        OwnersVote[msg.sender] = _vote;
        if (_vote) {
            yesVotes++;
        } else {
            yesVotes--;
        }
    }

    function isValidVoter(address _voter) internal view returns (bool) {
        for (uint256 i = 0; i < voters.length; i++) {
            if (voters[i] == _voter) {
                return true;
            }
        }
        return false;
    }

    function fund() public payable {
        require(msg.value > 0, "Enter amount greater than Zero.");

        Campaign[msg.sender] += msg.value;
        totalFund += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function changeOwner(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Invalid new owner address");
        owner = _newOwner;
    }

    function withdraw(address payable _owner) public {
        require(
            yesVotes > (voters.length * 51) / 100,
            "you need majority votes to WithDraw"
        );
        require(
            address(this).balance >= totalFund,
            "Not enough balance in contract"
        );
        require(startTime > 0 && endTime > 0, "start and end time is not set");
        require(
            block.timestamp > startTime && block.timestamp < endTime,
            "Voting Window is Closed"
        );
        _owner.transfer(totalFund);
        totalFund = 0;
        yesVotes = 0;

        for (uint256 i = 0; i < voters.length; i++) {
            OwnersVote[voters[i]] = false;
        }
    }

    function setTimeFromTo(uint256 _starttime, uint256 _endTime) public {
        require(_starttime > 0 && _endTime > 0, "either feild is empty");
        startTime = _starttime;
        endTime = _endTime;
    }
}
// ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4","0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2","0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"]
// ["0x7BA52Cd3b7F1f6EDd410c68617E63Ad471532b7f","0x3d007510FCdA2221A556e00c1656ff6dDda64297","0xC8672643b5e23A86d8c11509B37eb1926f5dF130"]

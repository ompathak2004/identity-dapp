// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    struct User {
        string name;
        string email;
    }

    mapping(address => User) public users;
//metamask calling register function ,sg.sender is metamask address
    function register(string memory _name, string memory _email) public {
        users[msg.sender] = User(_name, _email);
    }

    function getUser(address _user) public view returns (string memory, string memory) {
        User memory user = users[_user];
        return (user.name, user.email);
    }
}

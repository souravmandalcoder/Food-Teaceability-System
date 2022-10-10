pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract UserRegistration {
    string public name;
    uint public userCount = 0;
    mapping(uint => User) public users;

    struct User {
        uint id;
        string name;
        string compname;
        string username;
        string password;
        string role;
        address payable owner;
    }

    event UserCreated(
        uint id,
        string name,
        string compname,
        string username,
        string password,
        
        string role,
        address payable owner
    );
    event UserValidated(
      
        string username,
        string password,
        
        string role,
        User[] user

    );

    
    constructor() public {
        name = "User Registration";
    }

    function createUser(string memory _name, string memory _compname, string memory _username,string memory _password,string memory _role, User[] memory _user) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid company name
        require(bytes(_compname).length > 0);
        // Require a valid username
       require(bytes(_username).length > 0);
       // Require a valid password
       require(bytes(_password).length > 0);
       // Require a valid role
       require(bytes(_role).length > 0);
        // Increment product count
        userCount ++;
        // Create the product
        users[userCount] = User(userCount, _name, _compname, _username, _password, _role, msg.sender);
        // Trigger an event
        emit UserCreated(userCount, _name, _compname, _username, _password, _role, msg.sender);
    }

    function validateUser(string memory _username,string memory _password,string memory _role, User[] memory _user )public{
        
        // Require a valid username
       require(bytes(_username).length > 0);
       // Require a valid password
       require(bytes(_password).length > 0);
       // Require a valid role
       require(bytes(_role).length > 0);
        

       
       emit UserValidated(_username, _password, _role,_user);
    }









}

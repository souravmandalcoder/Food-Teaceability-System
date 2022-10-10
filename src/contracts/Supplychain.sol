pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Supplychain {
    string public name;
    uint public productCount = 0;
    uint public purchaseCount=0;
    uint public ownerCount=0;
    string[][] public _ownerNames; 
    mapping(uint => Product) public products;
    mapping(uint => Product) public purchasedProducts;

    struct Product {
        uint id;
        string name;
        string ptype;
        string brand;
        string manudate;
        string expdate;
        uint price;
        string ownerName;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        string ptype,
        string brand,
        string manudate,
        string expdate,
        uint price,
        string ownerName,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Food Supplychain";
    }

    function createProduct(string memory _name, string memory _type, string memory _brand, string memory _manudate, string memory _expdate, uint _price, string memory _ownerName) public {
             ownerCount=0;
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid type
        require(bytes(_type).length > 0);
        // Require a valid brand
        require(bytes(_brand).length > 0);
        // Require a valid date
        require(bytes(_manudate).length > 0);
        // Require a valid date
        require(bytes(_expdate).length > 0);
        // Require a ownername
        require(bytes(_ownerName).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
       ownerCount++;
        //_ownerNames[productCount][ownerCount]=_ownerName;
        
        // Create the product
        products[productCount] = Product(productCount, _name, _type, _brand, _manudate, _expdate, _price, _ownerName, msg.sender, false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _type, _brand, _manudate, _expdate, _price, _ownerName, msg.sender, false);
    }

    function purchaseProduct(uint _id, string memory username) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);

        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        ownerCount++;
      
        // Mark as purchased
        _product.purchased = true;
        //update owner
        _product.ownerName=username;

        //update purchase date
       // _product.manudate=block.timestamp;
        // Update the product
        purchaseCount++;
        purchasedProducts[purchaseCount] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }
}

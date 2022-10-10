const UserRegistration = artifacts.require('./UserRegistration.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('UserRegistration', ([deployer, seller, buyer]) => {
  let user

  before(async () => {
    user = await UserRegistration.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await user.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await user.name()
      assert.equal(name, 'User Registration')
    })
  })

  describe('users', async () => {
    let result, userCount

    before(async () => {
      result = await user.createUser('shital dinde', 'shital','1234567','farmer', { from: seller })
      userCount = await user.userCount()
    })

    it('creates users', async () => {
      // SUCCESS
      assert.equal(userCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), userCount.toNumber(), 'id is correct')
      assert.equal(event.name, 'shital dinde', 'name is correct')
      assert.equal(event.username, 'shital', 'username is correct')
      assert.equal(event.password, '1234567', 'password is correct')
      assert.equal(event.role, 'farmer', 'farmer is correct')

      // FAILURE: User must have a name
      await await user.createUser('', 'shital','1234567','farmer', { from: seller }).should.be.rejected;
      // FAILURE: User must have a username
      await await user.createUser('shital dinde', '','1234567','farmer', { from: seller }).should.be.rejected;
      // FAILURE: User must have a password
      await await user.createUser('shital dinde', 'shital','','farmer', { from: seller }).should.be.rejected;
      // FAILURE: User must have a role
      await await user.createUser('shital dinde', 'shital','1234567','', { from: seller }).should.be.rejected;

    })

    it('lists users', async () => {
      const userlist= await user.users(userCount)
      assert.equal(userlist.id.toNumber(), userCount.toNumber(), 'id is correct')
      assert.equal(userlist.name, 'shital dinde', 'name is correct')
      assert.equal(userlist.username, 'shital', 'username is correct')
      assert.equal(userlist.password, '1234567', 'password is correct')
      assert.equal(userlist.role, 'farmer', 'farmer is correct')
    })
    it('validates user', async () => {
      const userlist= await user.users(userCount)
      assert.equal(userlist.username, 'shital', 'username is correct')
      assert.equal(userlist.password, '1234567', 'password is correct')
      assert.equal(userlist.role, 'farmer', 'farmer is correct')
      assert.equal(userlist.owner, seller, 'address is correct' )
    })
   /* it('sells products', async () => {
      // Track the seller balance before purchase
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      // SUCCESS: Buyer makes purchase
      result = await supplychain.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

      // Check logs
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
      assert.equal(event.name, 'iPhone X', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.owner, buyer, 'owner is correct')
      assert.equal(event.purchased, true, 'purchased is correct')

      // Check that seller received funds
      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const exepectedBalance = oldSellerBalance.add(price)

      assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

      // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
      await supplychain.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;      // FAILURE: Buyer tries to buy without enough ether
      // FAILURE: Buyer tries to buy without enough ether
      await supplychain.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
      // FAILURE: Deployer tries to buy the product, i.e., product can't be purchased twice
      await supplychain.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
      await supplychain.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })*/

  })
})

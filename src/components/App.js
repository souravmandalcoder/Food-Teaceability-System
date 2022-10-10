import React from "react";
import Web3 from 'web3'
import UserRegistration from '../abis/UserRegistration.json'
import Supplychain from '../abis/Supplychain.json'
import { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Registration from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";
import Manufacturer from "./Manufacturer"
import Logout from "./Logout"
import Home from "./Home"
import Resto from "./Resto_owner"
import QRCode from "./GenerateQRC"
import CreateDish from "./CreateDish"
import Purchased from "./PurchasedProduct"
class App extends Component {
   routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <div>home!</div>,
      main: () => <Home/>
    },
    {
      path: "/Register",
      sidebar: () => <div>Register</div>,
      main: () => <Registration 
      account={this.state.account} 
      users={this.state.users}
      createUser={this.createUser}
      success={localStorage.getItem('success')}/>
    },
    {
      path: "/Login",
      sidebar: () => <div>Login</div>,
      main: () =><Login
      account={this.state.account} 
      users={this.state.users}
      validateUser={this.validateUser}
      success={localStorage.getItem('success')}/>
    },
    {
      path: "/Logout",
      sidebar: () => <div>Logout Successfully</div>,
      main: () =><Logout
      
      success={localStorage.getItem('success')}/>
    },
    
    
    {
      path: "/Manufacturer",
      sidebar: () => <div>Manufacturer</div>,
      main: () => <Manufacturer 
      account={this.state.account} 
      success={localStorage.getItem('success')}
      products={this.state.products}
      createProduct={this.createProduct}
      purchaseProduct={this.purchaseProduct}
      />
    },
    {
      path: "/Resto",
      sidebar: () => <div>Restaurant</div>,
      main: () => <Resto 
      account={this.state.account} 
      success={localStorage.getItem('success')}
      products={this.state.products}
      purchasedProducts={this.state.purchasedProducts}
      purchaseProduct={this.purchaseProduct}
      />
    },
    {
      path: "/QRCode",
      sidebar: () => <div>QRCode</div>,
      main: () => <QRCode 
      account={this.state.account} 
      success={localStorage.getItem('success')}
      products={this.state.products}
      purchasedProducts={this.state.purchasedProducts}
      purchaseCount={this.state.purchaseCount}
      
      />
    },
    {
      path: "/CreateDish",
      sidebar: () => <div>C</div>,
      main: () => <CreateDish 
      account={this.state.account} 
      success={localStorage.getItem('success')}
      
      purchasedProducts={this.state.purchasedProducts}
      purchaseCount={this.state.purchaseCount}
      
      />
    },
    {
      path: "/Purchased",
      sidebar: () => <div>C</div>,
      main: () => <Purchased 
      account={this.state.account} 
      success={localStorage.getItem('success')}
      products={this.state.products}
      purchasedProducts={this.state.purchasedProducts}
      purchaseCount={this.state.purchaseCount}
      
      />
    }

  ];
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      userCount: 0,
      users: [], 
      loading: true,
      success:false,
      productCount: 0,
      products: [],
      purchasedProducts:[],
      purchaseCount:0
    }
    
    this.createUser = this.createUser.bind(this)
    this.validateUser=this.validateUser.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
    
  }
render () {
  return (
    
    <Router>
      <div>
        <Navbar account={this.state.account} />
        </div >
        <br/><br/>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "40%",
            background: "#f0f0f0"
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {
                !(localStorage.hasOwnProperty('success'))?
                <Link to="/Login">Login</Link>
                :<span></span>
              }
            </li>
            <li>
             { ! (localStorage.hasOwnProperty('success'))?
              <Link to="/Register">Register</Link>
              :<span></span>
            }
            </li>
            <li>
              {
                localStorage.hasOwnProperty('success')&&localStorage.getItem('success') && (localStorage.getItem('role')=='Manufacturer')?
              <Link to="/Manufacturer">Add Products</Link>:
              <span></span>
              } 
            </li>
            <li>
              {
                localStorage.hasOwnProperty('success')&&localStorage.getItem('success') && (localStorage.getItem('role')=='Restaurant Owner') ?
              <Link to="/Resto">Buy Products</Link>:
              <span></span>
              } 
            </li>
            <li>
              {
                localStorage.hasOwnProperty('success')&&localStorage.getItem('success') && (localStorage.getItem('role')=='Restaurant Owner')?
              <Link to="/Purchased">Purchased Products</Link>:
              <span></span>
              } 
            </li>
            
            <li>
              {
                localStorage.hasOwnProperty('success')&&localStorage.getItem('success') && (localStorage.getItem('role')=='Restaurant Owner')?
              <Link to="/CreateDish">Add Ingredients to Dish </Link>:
              <span></span>
              } 
            </li>
            <li>
              {
                localStorage.hasOwnProperty('success')&&localStorage.getItem('success') && (localStorage.getItem('role')=='Restaurant Owner')?
              <Link to="/QRCode">Get QRCode</Link>:
              <span></span>
              } 
            </li>
            <li>
              {
                localStorage.hasOwnProperty('success')&&localStorage.getItem('success')?
                <Link to="/Logout" onClick={() => window.location.reload(false)}>Logout</Link>
                :
                <span></span>
              }
              
            </li>
          </ul>

          <Switch>
            {this.routes.map((route, index) => (
              
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ))}
          </Switch>
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            {this.routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}



async componentWillMount() {
  await this.loadWeb3()
  await this.loadBlockchainData()
  const script = document.createElement("script");   
   script.async = true;  
    script.src = "https://some-scripturl.js";  
     // this.li.appendChild(script);  
}


async loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

   
async loadBlockchainData() {
  const web3 = window.web3
  // Load account
  const accounts = await web3.eth.getAccounts()
  console.log(accounts)
  this.setState({ account: accounts[0] })
  const networkId = await web3.eth.net.getId()
  console.log(networkId)
  const networkData = UserRegistration.networks[networkId]
  const networkData1 = Supplychain.networks[networkId]
  console.log(networkData )
  if(networkData && networkData1) {
    const user = web3.eth.Contract(UserRegistration.abi, networkData.address)
    this.setState({ user })
    const userCount = await user.methods.userCount().call()
    this.setState({ userCount })
    // Load users
    for (var i = 1; i <= userCount; i++) {
      const userl = await user.methods.users(i).call()
      this.setState({
        users: [...this.state.users, userl]
      })
    }
    const supplychain = web3.eth.Contract(Supplychain.abi, networkData1.address)
      this.setState({ supplychain })
      const productCount = await supplychain.methods.productCount().call()
      this.setState({ productCount })
      // Load products
      for (var j = 1; j <= productCount; j++) {
        const product = await supplychain.methods.products(j).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      const purchaseCount = await supplychain.methods.purchaseCount().call()
      this.setState({purchaseCount})
      //console.log(this.state.purchaseCount)
      //Load Purchased Products
      for (var j = 1; j <= purchaseCount; j++) {
        const purchasedproduct = await supplychain.methods.purchasedProducts(j).call()
        this.setState({
          purchasedProducts: [...this.state.purchasedProducts, purchasedproduct]
          
        })
        //console.log(this.state.purchasedProducts)

      }
      

    this.setState({ loading: false})
  } else {
    window.alert('Registration contract not deployed to detected network.')
  }
}

//User Registration
createUser(name, compname, username,password,role,userdata) {
  this.setState({ loading: true })
 
  var flag=0
  
    userdata.forEach(user => {
      //console.log(user)
      //console.log(username)
     if(username===user.username ){
      console.log(user)
      flag=1
   
     }
    })
  
  if(flag===1){
    window.alert("Username Already Exist!!!")
   
  }
  else{
    window.alert("Registration Successfull!!!")
    this.state.user.methods.createUser( name, compname, username, password, role, userdata).send({ from: this.state.account })
    .once('receipt', (receipt) => {
     
    // this.setState({ loading: false })
     
     
   });
  }
 
}

//User Login
validateUser(username, password, role, userdata){
  var flag=0
  this.setState({ loading: true })
  this.setState({success:true})
  localStorage.setItem('success',true)
  localStorage.setItem('role',role)
  localStorage.setItem('username',username)
  console.log(role)
  userdata.forEach(user => {
    //console.log(user)
    //console.log(username)
   if(username===user.username && password===user.password && role === user.role){
    console.log(user)
    flag=1
 
   }
})

  if(flag===1 ){
    window.alert("Login Successfull")
   
    /*this.state.user.methods.validateUser( username,password,role,userdata).send({ from: this.state.account })
    .once('receipt', (receipt) => {
     
    // this.setState({ loading: false })
  
   });*/
  }
  else{
    window.alert("Wrong Username or Password")
  }
  

}

createProduct(name, type, brand, manudate, expdate, price, powner) {
  this.setState({ loading: true })
  console.log(expdate)
  powner=localStorage.getItem('username')
  console.log(powner)
  this.state.supplychain.methods.createProduct(name, type, brand, manudate, expdate,  price, powner).send({ from: this.state.account })
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
    window.location.reload(false)
  })

}

purchaseProduct(id, price,username) {
  username=localStorage.getItem('username')
  this.setState({ loading: true })
  this.state.supplychain.methods.purchaseProduct(id,username).send({ from: this.state.account, value: price })
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
}
 



}
export default App;

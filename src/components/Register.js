import React, { Component } from 'react';
//import { Redirect, Route } from "react-router";
//import Login from './Login';
//import {  Linking } from 'react'
//import {Link} from "react-router-dom";
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      role: "Restaurant Owner",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  options = [
    {
      label: "Restaurant Owner",
      value: "Restaurant Owner",
    },
    {
      label: "Manufacturer",
      value: "Manufacturer",
    },
    
  ];
  handleChange(e) {
    console.log("Role Selected!!");
    this.setState({ role: e.target.value });
  }
  
  render() {
    
    return (
      <div id="content">

<br/>
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;User Registration</h2><br/>
        <form onSubmit={(event) => {
          event.preventDefault()
          const fullname = this.fullName.value
          const username = this.userName.value
          const compname = this.compName.value
          const password = this.password.value
          const role = this.state.role
          console.log(role)
          const data= this.props.users
          this.props.createUser(fullname,compname, username, password, role,data)
          
        }
        }>
          <div className="form-group col-md-4">
            <input
              id="compName"
              type="text"
              ref={(input) => { this.compName = input }}
              className="form-control"
              placeholder="Company/Restaurant Name"
              required />
          </div>
          <div className="form-group col-md-4">
            <input
              id="fullName"
              type="text"
              ref={(input) => { this.fullName = input }}
              className="form-control"
              placeholder="Owner Name"
              required />
          </div>
          
          <div className="form-group col-md-4">
            <input
              id="userName"
              type="text"
              ref={(input) => { this.userName = input }}
              className="form-control"
              placeholder="Username"
              required />
          </div>
          <div className="form-group col-md-4">
            <input
              id="password"
              type="password"
              ref={(input) => { this.password = input }}
              className="form-control"
              placeholder="Password"
              required />
          </div>
          <div className="form-group col-md-4">
          <label className="form-group col-md-4">
          Select Role:
          <select value={this.state.role} onChange={this.handleChange}>
            {this.options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          </label>
        </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button type="submit" className="btn btn-primary">Add User</button>
         
        </form>
        
        <p>&nbsp;</p>
        <h2>Users Data</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Account</th>

            </tr>
          </thead>
          <tbody id="userList">
            {
              
              this.props.users&&this.props.users.map((user, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{user.id.toString()}</th>
                  <td>{user.name}</td>
                  <td>{user.compname}</td>
                  <td>{user.username}</td>
                  
                  <td>{user.role}</td>
                  <td>{user.owner}</td>
                  
                </tr>
              )
            }) 
            }
          </tbody>
        </table>

          


      </div>
    );
  }
  
}

export default Register;

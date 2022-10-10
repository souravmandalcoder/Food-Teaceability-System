import React, { Component } from 'react';


class Login extends Component {

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
        <h2>&nbsp;&nbsp;&nbsp;User Login</h2><br/>
        <form onSubmit={(event) => {
          event.preventDefault()
          ///const fullname = this.fullName.value
          const username = this.username.value
          const password = this.passwd.value
          const role = this.state.role
          const data= this.props.users
          console.log(data)
          this.props.validateUser(username, password, role, data)
          window.location.href = "/"
        }
        }>
         
          <div className="form-group col-md-4">
            <input
              id="userName"
              type="text"
              ref={(input) => { this.username = input }}
              className="form-control"
              placeholder="Username"
              required />
          </div>
          <div className="form-group col-md-4">
            <input
              id="password"
              type="password"
              ref={(input) => { this.passwd = input }}
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
          &nbsp;&nbsp;&nbsp;&nbsp;<button type="submit" className="btn btn-primary">Login</button>
        </form>  
        </div>
    );
  }
}

export default Login;
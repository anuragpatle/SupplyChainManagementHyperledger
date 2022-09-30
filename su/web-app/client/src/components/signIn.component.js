import React, { Component } from "react";
import axios from "axios";

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userType: "admin",
      name: "",
      password: "",
    };
  }

  onChangeUserType(e) {
    console.log(e.target.value);
    this.setState({
      userType: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault(e);
    console.log("signIn");
    const signIn = {
      id: this.state.name,
      password: this.state.password,
    };

    console.log({ signIn });
    const url = "http://35.167.200.224:8090/user/signin/manufacturer";
    console.log({ url });

    axios.post(url, signIn).then((res) => {
      console.log("res", { res });
      console.log("role", this.state.role);
      console.log("token", res.data.data.accessToken);
      sessionStorage.setItem("jwtToken", res.data.data.accessToken);
      sessionStorage.setItem("role", this.state.role);
      sessionStorage.setItem("userid", this.state.name);
      sessionStorage.setItem("usertype", res.data.data.UserType);

      if (res.data.data.UserType === "admin") {
        window.location = "/users";
      } else {
        window.location = "/products";
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Sign In</h3>
        <br />
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group">
            <label>Usertype: </label>
            <select
              // ref="usertypeInput"
              required
              className="form-control"
              value={this.state.usertype}
              onChange={this.onChangeUserType}
            >
              <option key="Admin" value="admin">
                Admin
              </option>
              <option key="Manufacturer" value="manufacturer">
                Manufacturer
              </option>
              <option key="Distributor" value="middlemen">
                Distributor
              </option>
              <option key="Wholesaler" value="middlemen">
                Wholesaler
              </option>
              <option key="Retailer" value="middlemen">
                Retailer
              </option>
              <option key="Consumer" value="consumer">
                Consumer
              </option>
            </select>
          </div> */}
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Sign In" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;

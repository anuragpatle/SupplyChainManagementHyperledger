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
    const url = "http://54.69.197.240:8090/user/signin/manufacturer";
    console.log({ url });

    axios.post(url, signIn).then((res) => {
      console.log("res", { res });
      console.log("role", this.state.role);
      console.log("token", res.data.data.accessToken);
      sessionStorage.setItem("jwtToken", res.data.data.accessToken);
      sessionStorage.setItem("role", res.data.data.UserType);
      sessionStorage.setItem("userid", res.data.data.id);
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

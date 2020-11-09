import React, { Component } from "react";
import "../../App.css";
import "./main.css";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { withCookies } from "react-cookie";
import menu from "../../menu.svg";
import VoiceRecorder from "../../components/VoiceRecorder";
import TextCommandReader from "../../components/TextCommandReader";
import axios from "axios";

class Home extends Component {
  state = {
    isLoading: true,
    isAuthenticated: false,
    user: undefined,
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state.csrfToken = cookies.get("XSRF-TOKEN");
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/api/user", { credentials: "include" });
    console.log("response " + response);
    const body = await response.text();
    console.log("body " + body);
    if (body === "") {
      this.setState({ isAuthenticated: false });
    } else {
      this.setState({ isAuthenticated: true, user: JSON.parse(body) });
    }
  }

  login() {
    let port = window.location.port ? ":" + window.location.port : "";
    if (port === ":3000") {
      port = ":8762";
    }
    window.location.href = "//" + window.location.hostname + port + "/private";
  
  }

  logout() {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
      headers: { "X-XSRF-TOKEN": this.state.csrfToken },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        window.location.href =
          response.logoutUrl;
      });
  }

  render() {
    const message = this.state.user ? (
      <div>
        <img style={{borderRadius:"50px", height:"50px"}} src={this.state.user.picture} alt="user"></img>
      <div className="welcome">Welcome to your Virtual Assistant,{this.state.user.name}!</div>
      <VoiceRecorder />

      <TextCommandReader />
      <img
        style={{
          height: "50px",
          position: "absolute",
          bottom: "60px",
          left: "40px",
        }}
        src={menu}
        alt="Mic"
      />
    </div>
    ) : (
      <p className="plsLogin">Please log in to your Virtual Assistant.</p>
    );

    const button = this.state.isAuthenticated ? (
      <div>
        
        <br />
        <Button className="logout-btn" onClick={this.logout}>
          Logout
        </Button>
      </div>
    ) : (
      
      <Button className="login-btn" onClick={this.login}>
        Sign in with Google
      </Button>
      
    );

    return (
      <div>
          {message}
          {button}
      </div>
    );
  }
}

export default withCookies(Home);

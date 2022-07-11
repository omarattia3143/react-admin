import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { User } from "../models/user";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";

const Profile = (props: any) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
  }, [props.user]);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { data } = await axios.put("user/info", {
      first_name,
      last_name,
      email,
    });

    props.setUser(data);
  };

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put("user/password", {
      password,
      password_confirm,
    });
  };

  return (
    <Layout>
      <h3>Account Information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <TextField
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            label={"Fist Name"}
          ></TextField>
        </div>

        <div className="mb-3">
          <TextField
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            label={"Last Name"}
          ></TextField>
        </div>

        <div className="mt-3">
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
          ></TextField>
        </div>
        <Button
          className="mt-3"
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            type={"password"}
          ></TextField>
        </div>

        <div className="mb-3">
          <TextField
            onChange={(e) => setPasswordConfirm(e.target.value)}
            label={"Password Confirm"}
            type={"password"}
          ></TextField>
        </div>
      </form>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Layout>
  );
};

export default connect(
  (state: { user: User }) => ({
    user: state.user,
  }),
  (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user)),
  })
)(Profile);

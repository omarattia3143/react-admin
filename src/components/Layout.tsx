import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Nav from "./Nav";
import { User } from "../models/user";
import {connect} from "react-redux";

const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/user");
        console.log(data);
        setUser(data);
      } catch {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Nav user={user} />

      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="table-responsive">{props.children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {

};

const mapDispatchToProps = () => {

};

export default connect()(Layout);

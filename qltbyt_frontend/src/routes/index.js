import React from "react";
import { Route, Switch } from "react-router-dom";
import UserManager from "./User";
import Department from "./Department";
import Provider from "./Provider";
import Device from "./Device";
import Maintain from "./Maintain";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const roleAccount = cookies.get("role");

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    {roleAccount === "admin" || roleAccount === "super" ? (
      <Switch>
        <Route path={`${match.url}user-manager`} component={UserManager} />
        <Route path={`${match.url}department-config`} component={Department} />
      </Switch>
    ) : null}
      <Switch>
        <Route path={`${match.url}provider`} component={Provider} />
        <Route path={`${match.url}device`} component={Device} />
        <Route path={`${match.url}maintain`} component={Maintain} />
      </Switch>
  </div>
);

export default App;

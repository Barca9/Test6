import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {HomePage} from "./pages/HomePage";
import {EmployeesPage} from "./pages/EmployeesPage";
import {Navbar} from "./components/Navbar";

function App() {
  return (
      <BrowserRouter>
          <Navbar/>
    <div className="container pt-4">
        <Switch>
          <Route path={'/'} exact component={HomePage}/>
            <Route path={'/employees'} component={EmployeesPage}/>
        </Switch>
    </div>
      </BrowserRouter>
  );
}

export default App;

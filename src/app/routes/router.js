import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// Sample View Page
import LandingPageContainer from '../views/client-view/LandingPageContainer/'
import Register from '../views/client-view/RegisterPageContainer'
import Login from '../views/client-view/LoginPageContainer'
import SymptomsChecker from '../views/client-view/SymptomsCheckerContainer'
import AboutUs from '../views/client-view/AboutUsContainer'
import NewAboutUs from '../views/client-view/AboutUsContainer/NewAboutUs'
import HospitalFinder from '../views/client-view/HospitalFinderContainer'
import DoctorFinder from "../views/client-view/DoctorFinderContainer/DoctorFinder";
import HospitalOverview from '../views/client-view/HospitalOverviewContainer'
import AdminPage from '../views/admin-view'
import AdminLoginContainer from "../views/admin-view/AdminLoginContainer"

import PrivateRoute from './private-route'

const routes = [
  {
    path: "/",
    component: LandingPageContainer,
    private: false,
    exact: true
  },
  {
    path: "/register", 
    exact: true,
    component: Register,
    private: false
  },
  {
    path: "/login", 
    exact: true,
    component: Login,
    private: false
  },
  {
    path: "/symptoms-checker", 
    exact: false,
    component: SymptomsChecker,
    private: false
  },
  {
    path: "/about-us", 
    exact: true,
    component: NewAboutUs,
    private: false
  },
  // {
  //   path: "/about-us", 
  //   exact: true,
  //   component: AboutUs,
  //   private: false
  // },
  {
    path: "/hospital-finder", 
    exact: false,
    component: HospitalFinder,
    private: false
  },
  {
    path: "/doctor-finder", 
    exact: false,
    component: DoctorFinder,
    private: false
  },
  {
    path: "/hospital-overview", 
    exact: false,
    component: HospitalOverview,
    private: false
  },
  {
    path: "/login-admin",
    exact: true,
    component: AdminLoginContainer,
    private: false
  },
  {
    path: "/admin", 
    exact: false,
    component: AdminPage,
    private: false
  },
  {
    path: "*", 
    invalid: true,
    redirectTo: "/"
  }
];


const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route) => {
          if (route.private) {
            return (<PrivateRoute
              key={route.path}
              path={route.path}
              exact
              component={route.component}
            />)
          } else {
              if(route.invalid){
                return (
                  <Redirect to={route.redirectTo} />)
              } else {
              return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              ></Route>)
            }
          }
        })}
      </Switch>
    </Router>
  );
};

export default AppRoutes;

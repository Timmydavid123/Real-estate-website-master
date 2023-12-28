import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import Contact from "../contact/Contact"
import LoginPage from "../../Auth/login/login"
import SignupPage from "../../Auth/Signup/Signup"
import OTPVerification from "../../Auth/otp/otp"
import ForgotPassword from "../../Auth/forgotten-password/Forgot-pass"
import ChangePassword from "../../Auth/change-password/change-pass"
import Property from "../homepage/homepage/homepae"
import PropertyForm from "../form/property"
import IdentificationPage from "../identification/identification"
import Chat from "../chat/chat"
import AdminLogin from "../admindashboard/AdminLogin"
import AdminDashboard from "../admindashboard/AdminDashboard"

const Pages = () => {
  return (
    <Router>
      <Switch>
          <Route exact path='/'>
             <Header />
            < Home />
            <Footer />
            </Route>
            <Route exact path='/contact'>
             <Header />
            < Contact />
            <Footer />
            </Route>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/otp" component={OTPVerification} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Route exact path="/Property" component={Property} />
        <Route exact path="/propertyupload" component={PropertyForm} />
        <Route exact path="/identification" component={IdentificationPage} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/admin" component={AdminLogin} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </Router>
  );  
};

export default Pages;


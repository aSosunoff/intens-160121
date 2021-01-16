import React from "react";
import {NavLink, Route} from 'react-router-dom'
import SignInForm from "../auth-forms/sign-in";
import SignUpForm from "../auth-forms/sign-up";

function AuthPage() {
  return (
    <div>
      <h1>Auth Page</h1>
      <NavLink to="/auth/sign-in">Sign In</NavLink>
      <NavLink to="/auth/sign-up">Sign Up</NavLink>

      <Route path="/auth/sign-in" component={SignInForm}/>
      <Route path="/auth/sign-up" component={SignUpForm}/>
    </div>
  );
}

export default AuthPage;

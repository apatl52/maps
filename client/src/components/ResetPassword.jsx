import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { FormGroup } from 'react-bootstrap';
import { useCookies } from "react-cookie";

import Input from './Input'
import Button from './Button'

const { REACT_APP_PROXY } = process.env;

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [cookies, setCookie] = useCookies(["csrftoken"]);

  const [errors, setErrors] = useState()

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(cookies);
    const csrftoken = cookies;
    console.log("token:" + csrftoken);

    fetch(REACT_APP_PROXY + '/api/v1/password-reset/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ "email": email })
    }).then(res => res.json())
    .then(jsob => {
      if (jsob.error) {
        console.log(jsob.error);
        setErrors(jsob.error);
      } else {
        console.log(jsob);
        setErrors(jsob.message);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return(
    <div className="reset-password-form">
      {redirect && <Redirect to="/" />}
      <h1 className="form__title">Reset Password</h1>
      <h2 className="form__desc">
        Please enter your your email address to have a reset-password email sent.
      </h2>
      <h2 className="form__desc">
        <span style={{ color: "red" }}>*</span> = required
      </h2>
      <form
      onSubmit={handleFormSubmit}
      className="container-fluid"
      id="reset-password-form"
      noValidate>
        <FormGroup>
          <div className="form-group col-md-8">
            <Input
              className={"required"}
              type={"text"}
              title={"E-mail"}
              name={"email"}
              value={email}
              placeholder={"E-mail"}
              handleChange={(e) => setEmail(e.target.value)}
              errors={errors}
            />
          </div>
          <div className="form-group col-md-6" align="center">
            <Button buttonType={"primary"} type={"submit"} title={"Reset Password"} />
          </div>
        </FormGroup>
      </form>
      { errors && <span style={{ color: "red" }}>{ errors }</span> }
    </div>
  )
}

export default ResetPassword

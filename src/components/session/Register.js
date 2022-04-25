import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 2 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 4 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 4 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeCountry = (e) => {
    const country = e.target.value;
    setCountry(country);
  };

  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(email, password, firstName, lastName, phone, country, role).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          AuthService.login(email, password)
          .then(
            () => {
              console.log("success")
              navigate("/");
              window.location.reload();
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setMessage(resMessage);
            }
          );
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={onChangeFirstName}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={onChangeLastName}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={phone}
                  onChange={onChangePhone}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <Input
                  type="text"
                  className="form-control"
                  name="country"
                  value={country}
                  onChange={onChangeCountry}
                  validations={[]}
                />
              </div>


              <div className="form-group mt-5">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
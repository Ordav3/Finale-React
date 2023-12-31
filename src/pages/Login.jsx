import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FieldComponent from "../components/Field";
import { fieldValidation } from "../validation/fieldValidation";
import ROUTES from "../routes/ROUTES";
import useLoggedIn from "../hooks/useLoggedIn";
import CancelBtnComp from "../components/CancelBtn";

const loginFieldsArray = [
  {
    label: "Email",
    name: "email",
    id: "email",
    type: "email",
    required: true,
    joi: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  },
  {
    label: "Password",
    name: "password",
    id: "password",
    type: "password",
    required: true,
    joi: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{0,}$"
        )
      )
      .min(8)
      .messages({
        "string.pattern.base": `Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character from @$!%*?&.`,
      })
      .max(15)
      .required(),
  },
];

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();

  const handleFocus = (event) => {
    setFieldToFocus(
      loginFieldsArray.findIndex((field) => field.name === event.target.name)
    );
  };

  const handleChange = (event) => {
    const { name, value, id } = event.target;
    const { joi, label } = loginFieldsArray.find((field) => field.id === id);
    setFormError({
      ...formError,
      [name]: fieldValidation(joi, value, label),
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    let validateForm = () => {
      for (const field of loginFieldsArray) {
        if (!formData[field.name] || formError[field.name]) {
          return false;
        }
      }
      return true;
    };
    setFormValid(validateForm());
  }, [formData, formError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formValid) {
      toast.info("Please fill in all the required fields correctly.");
      return;
    }
    try {
      localStorage.setItem(
        "token",
        (await axios.post("/users/login", formData)).data.token
      );
      loggedIn();
      toast.success(
        `Welcome ${(await axios.get("/users/userInfo")).data.firstName}`
      );
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary" }}>
          <LoginIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {loginFieldsArray.map((field, index) => (
              <Grid item xs={12} key={`${new Date()}-${field.id}`}>
                <FieldComponent
                  onFocus={handleFocus}
                  autoFocus={index === fieldToFocus}
                  state={formData[field.name] || ""}
                  setState={handleChange}
                  field={field}
                />
                <Typography color={"red"} fontSize={"10pt"}>
                  {formError[field.name] || ""}
                </Typography>
              </Grid>
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!formValid}
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <CancelBtnComp />
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.REGISTER} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;

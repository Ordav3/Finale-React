import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FieldComponent from "../../components/Field";
import { registerFields } from "./registerFields";
import { fieldValidation } from "../../validation/fieldValidation";
import ROUTES from "../../routes/ROUTES";
import CancelBtnComp from "../../components/CancelBtn";

const initialFormState = {};

const RegisterPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  const handleFocus = (event) => {
    setFieldToFocus(
      registerFields.findIndex((field) => field.name === event.target.name)
    );
  };

  const handleChange = (event) => {
    const { name, value, type, checked, id } = event.target;
    if (type !== "checkbox") {
      const { joi, label } = registerFields.find((field) => field.id === id);
      setFormError({
        ...formError,
        [name]: fieldValidation(joi, value, label),
      });
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    let validateForm = () => {
      for (const field of registerFields) {
        if (
          field.required &&
          (!formData[field.name] || formError[field.name])
        ) {
          return false;
        }
      }
      return true;
    };
    setFormValid(validateForm());
  }, [formData, formError]);

  const restForm = () => {
    setFormData(initialFormState);
    setFieldToFocus(0);
    setFormError({});
    setFormValid(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formValid) {
      toast.info("Error");
      return;
    }
    try { 
      formData.email= formData.email.toLowerCase();
      await axios.post("/users", formData);
      toast.success(`Registration success`);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "success.primary" }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {registerFields.map((field, index) => (
              <Grid
                item
                xs={12}
                sm={field.sm}
                key={`${new Date()}-${field.id}`}
              >
                <FieldComponent
                  onFocus={handleFocus}
                  autoFocus={index === fieldToFocus}
                  state={formData[field.name] || ""}
                  setState={handleChange}
                  field={field}
                />
                <Typography color={"red"} fontSize={"8pt"}>
                  {formError[field.name] || ""}
                </Typography>
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!formValid}
                sx={{ mt: 2, mb: { xs: 0, md: 1 } }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mb: 1, mt: { xs: 0, md: 2 } }}
                onClick={restForm}
              >
                <RestartAltIcon /> Reset Form
              </Button>
            </Grid>
          </Grid>
          <CancelBtnComp />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.LOGIN} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;

import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTheme } from "@mui/material/styles";

const FooterComp = () => {
  const theme = useTheme();
  return (
    <footer >
      <Container maxWidth="md">
        <Typography variant="body2" align="center">
          <IconButton
            
            href="https://wa.me/972542345455"
          >
            <WhatsAppIcon />
          </IconButton>
        </Typography>
        <Typography variant="body2" align="center" fontWeight={600}>
          © {new Date().getFullYear()} All Rights reserved
        </Typography>
      </Container>
    </footer>
  );
};

export default FooterComp;

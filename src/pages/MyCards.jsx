import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Fragment, useEffect, useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CardComponent from "../components/CardComponent";
import CardForm from "../components/CardForm/CardForm";
import useQueryParams from "../hooks/useQueryParams";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyCardsPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsState, setCardsState] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const theme = useTheme();
  const qparams = useQueryParams();
  const payload = useSelector((state) => state.authSlice.payload);
  
  useEffect(() => {
    const filterFunc = (data) => {
      if (!originalCardsArr && !data) {
        return;
      }
      let filter = "";
      if (!originalCardsArr && data) {
        setOriginalCardsArr(data);
        setCardsState(
          data.filter(
            (card) =>
              card.title.toLowerCase().startsWith(filter.toLowerCase())
          )
        );
        return;
      }
      if (originalCardsArr) {
        let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
        setCardsState(
          newOriginalCardsArr.filter(
            (card) =>
              card.title.toLowerCase().startsWith(filter.toLowerCase())
          )
        );
      }
    };
    (async () => {
      const { data } = await axios.get("/cards");
      const filterdData = data.filter((card) => card.user_id === payload._id);
      filterFunc(filterdData);
    })();
  }, [payload._id,originalCardsArr]);

  useEffect(() => {
    const filterFunc = () => {
      if (!originalCardsArr) {
        return;
      }
      let filter = "";
      if (qparams.filter) {
        filter = qparams.filter;
      }
      if (originalCardsArr) {
        let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
        setCardsState(
          newOriginalCardsArr.filter(
            (card) =>
              card.title.toLowerCase().startsWith(filter.toLowerCase())
          )
        );
      }
    };
    filterFunc();
  }, [qparams.filter,originalCardsArr]);

  

  const deleteFromDisplay = (id) => {
    const updatedOriginalCardsArr = originalCardsArr.filter(card => card._id !== id);
    const updatedCardsState = cardsState.filter(card => card._id !== id);
  
    setOriginalCardsArr(updatedOriginalCardsArr);
    setCardsState(updatedCardsState);
  };

  const handleClickOpen = () => {
    setAddDialogOpen(true);
  };

  const handleCloseWithoutAdd = () => {
    setAddDialogOpen(false);
  };

  const handleClose = (newCard) => {
    setAddDialogOpen(false);
    window.location.reload();
  };

  return (
    <Fragment>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h1" variant="h2" align="left" sx={{ mt: 2 }}>
          Your Cards
        </Typography>
        <IconButton
          color="inherit"
          size="large"
          sx={{ backgroundColor: theme.palette.primary.main }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </IconButton>
      </Container>
      <Container maxWidth="md" sx={{ my: 2, display: "flex" }}>
        <Grid
          container
          spacing={2}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          
          {cardsState ? (
            cardsState.map((card) => (
              <Grid item md={4} xs={12} key={card._id}> 
                <CardComponent
                  cardFromParent={card}
                  onUnMark={() => {}}
                  onDelete={deleteFromDisplay}
                />
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Container>
      <Dialog
        open={addDialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseWithoutAdd}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add new card
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <CardForm onClose={handleClose} edit={false} />
        </Container>
      </Dialog>
    </Fragment>
  );
};

export default MyCardsPage;

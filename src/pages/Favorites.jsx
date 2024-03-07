import { Container, Typography, CircularProgress, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import useQueryParams from "../hooks/useQueryParams";

const FavoritesPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsState, setCardsState] = useState(null);
  let qparams = useQueryParams();
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
      const { data } = await axios.get("/cards/fav");

      const filterdData = data.likedCards.filter((card) =>
        card.likes.includes(payload._id)
      );
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
    setCardsState(cardsState.filter((card) => card._id !== id));
  };

  return (
    <Fragment>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Your Favorite Cards
        </Typography>
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
                  onUnMark={deleteFromDisplay}
                  onDelete={deleteFromDisplay}
                />
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default FavoritesPage;

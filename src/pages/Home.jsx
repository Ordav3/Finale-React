import { Container, Typography, CircularProgress, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import useQueryParams from "../hooks/useQueryParams";
import { toast } from "react-toastify";
const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsState, setCardsState] = useState(null);
  let qparams = useQueryParams();
  
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
      try {
        const { data } = await axios.get("/cards");
        filterFunc(data);
      } catch (err) {
        toast.error('Something went wrong, please try again later');
      }
    })();
  }, [originalCardsArr]);

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

  

  const handleDeleteFromDisplay = (id) => {
    setCardsState(cardsState.filter((card) => card._id !== id));
  };

  return (
    <Fragment>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Typography textAlign="center" variant="h3" component="h3">
          Welcome To Worlds art Gallery
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
                  onUnMark={() => {}}
                  onDelete={handleDeleteFromDisplay}
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

export default HomePage;

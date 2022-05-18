import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { useGlobalContext } from "../../context";
import { SingleCoin } from "../../config/api";
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import axios from "axios";
const SingleCoinCap = ({ id }) => {
  const { dark, symbol } = useGlobalContext();
  const classes = useStyles(dark);
  const [coin, setCoin] = useState([]);
  const name = id.charAt(0).toUpperCase() + id.slice(1);
  const fetchCoinData = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoinData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (!coin) {
    return <LinearProgress />;
  }
  console.log(coin);
  return (
    <section className={classes.chart}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item lg={4}>
            <Box className={classes.coinInfo}>
              <img src={coin?.image?.large} alt="" />
              <Typography variant="h2">{name}</Typography>
              <Typography variant="body1">
                {coin?.description?.en?.slice(0, 188)}
              </Typography>
              <Typography variant="h4">
                Rank: {coin?.market_cap_rank}
              </Typography>
              <Typography variant="h4">
                Current Price: {symbol} {coin?.market_data?.current_price.eur}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={8}></Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default SingleCoinCap;

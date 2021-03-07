import { useState, useEffect } from "react";
import useTrintoApi from "../../hooks/useTrintoApi";
import { useCartState } from "../../context/CartStateContext";
import styles from "../../styles/components/ListItems.module.css";
import Badge from "@material-ui/core/Badge";
import { formatReal } from "../../helpers/helpers.js";
import { useProductsOnCart } from "../../context/ProductsContext";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Modal from "./Modal";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative",
    minHeight: 200,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 300,
  },
  listHeaderFilterContainer: {
    position: "fixed",
    width: "100%",
    zIndex: 300,
  },
}));

export default function ListItems() {
  const classes = useStyles();
  const { responseData } = useTrintoApi();
  const [filterValue, setFilterValue] = useState("None");
  const [allValue, setAllValue] = useState(false);
  const [underFifity, setUnderFifity] = useState(false);
  const [overOneHundred, setOverOneHundred] = useState(false);
  const { products, dispatch } = useProductsOnCart();
  const [show, setShow] = useState(false);
  const { open, setOpen } = useCartState();
  console.log(open);
  function buyProducts(event, item) {
    event.preventDefault();
    dispatch({ type: "ADD_PRODUCT", item });
  }
  const showCart = () => {
    const aux = !show;
    setShow(aux);
  };
  if (responseData === null) return <span>Loading....</span>;
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => setOpen(!open)}
      >
        <Badge badgeContent={products.length} color="secondary">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </Fab>
      <Accordion className={classes.listHeaderFilterContainer}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Filtros de Pesquisa Avançado
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            <Select
              style={{ marginRight: "2rem" }}
              value={filterValue}
              onChange={(event) => {
                setFilterValue(event.target.value);
              }}
            >
              <MenuItem value="None">
                <em>Nenhum</em>
              </MenuItem>
              <MenuItem value="All">Exibir todos os produtos</MenuItem>
              <MenuItem value="hasStock">
                Exibir somente produtos com estoque
              </MenuItem>
            </Select>

            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  value={allValue}
                  checked={allValue}
                  onClick={(event) => {
                    setAllValue(event.target.checked);
                    setUnderFifity(false);
                    setOverOneHundred(false);
                  }}
                  color="primary"
                />
              }
              label="Todos os valores"
              labelPlacement="end"
            />
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  value={underFifity}
                  checked={underFifity}
                  onClick={(event) => {
                    setAllValue(false);
                    setUnderFifity(event.target.checked);
                    setOverOneHundred(false);
                  }}
                  color="primary"
                />
              }
              label="Até $50"
              labelPlacement="end"
            />
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  value={overOneHundred}
                  checked={overOneHundred}
                  onClick={(event) => {
                    setAllValue(false);
                    setUnderFifity(false);
                    setOverOneHundred(event.target.checked);
                  }}
                  color="primary"
                />
              }
              label="A partir de $100"
              labelPlacement="end"
            />
          </Container>
        </AccordionDetails>
      </Accordion>
      <div>
        <pre>aaaa</pre>
      </div>
      <div className={styles.listContainer}>
        {responseData?.products
          .filter((val) => {
            if (
              filterValue === "hasStock" &&
              underFifity === false &&
              overOneHundred === false
            ) {
              if (val.hasStock) return val;
            } else if (filterValue === "hasStock" && underFifity === true) {
              if (val.price <= 50 && val.hasStock) return val;
            } else if (
              filterValue === "hasStock" &&
              overOneHundred === false &&
              underFifity === false
            ) {
              if (val.hasStock) return val;
            } else if (filterValue === "hasStock" && overOneHundred === true) {
              if (val.hasStock && val.price >= 100) return val;
            } else if (filterValue === "None" && underFifity === true) {
              if (val.price <= 50) return val;
            } else if (filterValue === "None" && overOneHundred === true) {
              if (val.price >= 100) return val;
            } else if (filterValue === "All" && overOneHundred === true) {
              if (val.price >= 100) return val;
            } else {
              return val;
            }
          })
          .map((item, key) => (
            <Card
              className={`${styles.article} ${styles.fancy} ${styles.fade} ${styles.grow}`}
              key={key}
            >
              <AiOutlineHeart
                className={styles.favoriteIcon}
                size={30}
              ></AiOutlineHeart>
              <CardMedia
                component="img"
                alt="Image Product"
                height="260"
                width="100%"
                image="../download.png"
                title="Image Product"
              ></CardMedia>
              <CardContent>
                <Typography
                  color="primary"
                  gutterBottom
                  variant="title"
                  component="h2"
                >
                  {item.brand} {item.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  component="p"
                >
                  Por {`${responseData.currency} ${item.price}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => buyProducts(event, item)}
                >
                  <Typography>COMPRAR</Typography>
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </>
  );
}

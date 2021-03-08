import { useState } from "react";
import styles from "../../styles/components/AppBar.module.css";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useProductsOnCart } from "../../context/ProductsContext";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useCartState } from "../../context/CartStateContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  fade,
  makeStyles,
  withStyles,
  useTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import Popover from "@material-ui/core/Popover";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const drawerWidth = 400;
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    paddingTop: "4rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  },
}));
export default function AppBarComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const { open, setOpen } = useCartState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { products, dispatch } = useProductsOnCart();

  function totalPriceOnCart() {
    let totalprice = 0;
    for (let value of products) {
      totalprice += value.price;
    }
    return totalprice;
  }
  let currentValue = totalPriceOnCart();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    // setOpen(!open);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Popover
      // id={id}
      open={isMenuOpen}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper>
          <Typography>{currentValue}</Typography>
          {/* {products?.map((product, key) => ( key={key}>
                    {product.brand} {product.name}
                    {product.hasStock}{product.price}
                    <DeleteForeverIcon size="large"
                    onClick={() =>
                      dispatch({ type: "REMOVE_PRODUCT", product })}/>
                    ))} */}
        </Paper>
      </Container>
    </Popover>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Popover
      // id={id}
      open={isMobileMenuOpen}
      anchorEl={mobileMoreAnchorEl}
      onClose={handleMobileMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Container fixed>
        <Typography>Meu carrinho</Typography>
        {products?.map((product, key) => (
          <Container maxWidth="xs">
            <Paper variant="elevation" square>
              <Grid container>
                <Grid item xs={3} spacing={1}>
                  <img
                    src="../download.png"
                    alt="imgproduct"
                    width="100%"
                    height="80"
                  />
                  {/* <Grid container justify="center">*/}
                </Grid>
                <Grid item xs={9} spacing={1}>
                  <Typography align="left">
                    {product.brand} {product.name}
                  </Typography>
                  {/* <Grid container justify="center">*/}
                </Grid>
                <Grid item xs={4}>
                  <Typography align="center">Qtd</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="center">{product.price}</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  justify="flex-end"
                  alignContent="flex-end"
                  alignItems="flex-end"
                >
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="delete product"
                    size="small"
                  >
                    <DeleteForeverIcon
                      size="large"
                      onClick={() =>
                        dispatch({ type: "REMOVE_PRODUCT", product })
                      }
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        ))}
        <Typography align="left">Total:</Typography>
        <Typography align="rigth">R$ {currentValue}</Typography>
        <Button>
          <Typography>Finalizar pedido</Typography>
        </Button>
      </Container>
    </Popover>
  ); //isMobileMenuOpen

  const showModal = () => {
    const aux = !show;
    setShow(aux);
  };
  return (
    <>
      <div className={classes.grow}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Material-UI
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="cart of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Badge badgeContent={products.length} color="secondary">
                  <ShoppingCartOutlinedIcon size="large" />
                </Badge>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="cart of current user"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <Badge badgeContent={products.length} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </>
  );
}

import { useState } from "react";
import styles from "../../styles/components/AppBar.module.css";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloseIcon from "@material-ui/icons/Close";
import { useProductsOnCart } from "../../context/ProductsContext";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useCartState } from "../../context/CartStateContext";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
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
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  divideLinerSpacement: {
    margin: "0.4rem",
  },
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
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: "none",
    },
    drawer: {
      flexShrink: 0,
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
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Popover
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
      <Container fixed>
        <header className={styles.header}>
          <Grid container>
            <Grid item xs={2}>
              <ShoppingCartOutlinedIcon size="large" />
            </Grid>
            <Grid item xs={8}>
              <Typography align="left" variant="subtitle1">
                Meu carrinho
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="delete product"
                size="small"
                onClick={handleMenuClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </header>
        <div className={styles.content}>
          {products?.map((product, key) => (
            <Container maxWidth="xs">
              <Box>
                <Grid container>
                  <Grid item xs={3} spacing={3}>
                    <img
                      src="../download.png"
                      alt="imgproduct"
                      width="100%"
                      height="80"
                    />
                  </Grid>
                  <Grid item xs={9} spacing={1}>
                    <div className={styles.marginTypo}>
                      <Typography
                        align="left"
                        variant="subtitle1"
                        color="textPrimary"
                      >
                        {product.brand} {product.name}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="center">Qtd: 1 un</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="center" color="textSecondary">
                      US$ {product.price}
                    </Typography>
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
                      onClick={() =>
                        dispatch({ type: "REMOVE_PRODUCT", product })
                      }
                    >
                      <DeleteForeverIcon size="large" color="error" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
              <Divider className={classes.divideLinerSpacement} />
            </Container>
          ))}
        </div>
        <footer className={styles.footer}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={6}>
              <Typography align="left" variant="h6">
                Total:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="rigth" variant="h6" color="textSecondary">
                US$ {currentValue}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                className={styles.button}
              >
                <Typography>Finalizar pedido</Typography>
              </Button>
            </Grid>
          </Grid>
        </footer>
      </Container>
    </Popover>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Popover
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
        <header className={styles.header}>
          <Grid container>
            <Grid item xs={2}>
              <ShoppingCartOutlinedIcon size="large" />
            </Grid>
            <Grid item xs={8}>
              <Typography align="left" variant="subtitle1">
                Meu carrinho
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="delete product"
                size="small"
                onClick={handleMenuClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </header>
        <div className={styles.content}>
          {products?.map((product, key) => (
            <Container maxWidth="xs">
              <Box>
                <Grid container>
                  <Grid item xs={3} spacing={3}>
                    <img
                      src="../download.png"
                      alt="imgproduct"
                      width="100%"
                      height="80"
                    />
                  </Grid>
                  <Grid item xs={9} spacing={1}>
                    <Typography align="center">
                      {product.brand} {product.name}
                    </Typography>
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
                      onClick={() =>
                        dispatch({ type: "REMOVE_PRODUCT", product })
                      }
                    >
                      <DeleteForeverIcon size="large" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
              <Divider className={classes.divideLinerSpacement} />
            </Container>
          ))}
        </div>
        <footer className={styles.footer}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={6}>
              <Typography align="left" variant="h6">
                Total:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="rigth" variant="h6">
                US$ {currentValue}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                className={styles.button}
              >
                <Typography>Finalizar pedido</Typography>
              </Button>
            </Grid>
          </Grid>
        </footer>
      </Container>
    </Popover>
  );
  return (
    <>
      <div className={classes.grow}>
        <AppBar position="fixed" className={styles.headerColors}>
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
              Logo
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

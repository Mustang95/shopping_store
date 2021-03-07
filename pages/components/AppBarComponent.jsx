import { useState } from "react";
import styles from "../../styles/components/AppBar.module.css";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useProductsOnCart } from "../../context/ProductsContext";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { MdShoppingBasket } from "@react-icons/all-files/md/MdShoppingBasket";
import Modal from "./Modal";
import { useCartState } from "../../context/CartStateContext";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const drawerWidth = 400;

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
  let renderMenu;
  const menuId = "primary-search-account-menu";
  if (isMenuOpen) {
    renderMenu = (
      <div className={styles.modal} id="modal">
        <h2>
          <div className={styles.row}>
            <div className={styles.column3closeButton}>
              <IoMdClose onClick={handleMenuClose} />
            </div>
            <div className={styles.column3}>Carrinho</div>
            <div className={styles.column3}>
              {currentValue}
              <pre />
            </div>
          </div>
        </h2>
        <div className={styles.content}>
          <table>
            <thead>
              {products?.map((product, key) => (
                <tr key={key}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.brand === null ? "-" : product.brand}</td>
                  <td>
                    <DeleteForeverIcon
                      size="large"
                      onClick={() =>
                        dispatch({ type: "REMOVE_PRODUCT", product })
                      }
                    />
                  </td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
      </div>
      // <Drawer
      //   className={classes.drawer}
      //   variant="persistent"
      //   anchor="right"
      //   open={isMenuOpen}
      //   classes={{
      //     paper: classes.drawerPaper,
      //   }}
      // >
      //   <div className={classes.drawerHeader}>
      //     <IconButton onClick={handleMenuClose}>
      //       {theme.direction === "rtl" ? (
      //         <ChevronLeftIcon />
      //       ) : (
      //         <ChevronRightIcon />
      //       )}
      //     </IconButton>
      //   </div>
      //   <Divider />
      //   <List>
      //     {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
      //       <ListItem button key={text}>
      //         <ListItemIcon>
      //           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
      //         </ListItemIcon>
      //         <ListItemText primary={text} />
      //       </ListItem>
      //     ))}
      //   </List>
      //   <Divider />
      //   <List>
      //     {["All mail", "Trash", "Spam"].map((text, index) => (
      //       <ListItem button key={text}>
      //         <ListItemIcon>
      //           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
      //         </ListItemIcon>
      //         <ListItemText primary={text} />
      //       </ListItem>
      //     ))}
      //   </List>
      // </Drawer>
      // <Menu
      //   anchorEl={anchorEl}
      //   anchorOrigin={{ vertical: "top", horizontal: "right" }}
      //   id={menuId}
      //   keepMounted
      //   transformOrigin={{ vertical: "top", horizontal: "right" }}
      //   open={open}
      //   onClose={handleMenuClose}
      // >
      //   <Modal show={open} onClose={handleMenuClose} />
      //   <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      //   <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      // </Menu>
    );
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Badge badgeContent={4} color="secondary">
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Badge>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const showModal = () => {
    const aux = !show;
    setShow(aux);
  };
  return (
    <>
      {/* <Modal onClose={showModal} show={show} /> */}
      {/* <MdShoppingBasket
                size={40}
                color="black"
                onClick={() => showModal()}
              /> */}
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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
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
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
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

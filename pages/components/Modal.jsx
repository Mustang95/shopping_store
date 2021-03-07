import { useCartState } from "../../context/CartStateContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { BiCircle } from "@react-icons/all-files/bi/BiCircle";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import styles from "../../styles/components/Modal.module.css";
import { useProductsOnCart } from "../../context/ProductsContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
const drawerWidth = 400;
// const { height, width } = useWindowDimensions();
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
}));
export default function Modal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { open, setOpen } = useCartState();
  const { products, dispatch } = useProductsOnCart();
  const { productOnCart, setProductOnCart } = useProductsOnCart();
  function onClose(event) {
    props.onClose && props.onClose(event);
  }
  function totalPriceOnCart() {
    let totalprice = 0;
    for (let value of products) {
      totalprice += value.price;
    }
    return totalprice;
  }
  let currentValue = totalPriceOnCart();
  return (
    <>
      {open ? (
        <div className={styles.modal} id="modal">
          <h2>
            <div className={styles.row}>
              <div className={styles.column3closeButton}>
                <IoMdClose onClick={onClose} />
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
                    <td>
                      <BiCircle size={15} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.brand === null ? "-" : product.brand}</td>
                    <td>
                      <MdDeleteForever
                        size={25}
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
      ) : null}
      {/*  */}
      {/* {open ? (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => setOpen(!open)}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : null} */}
    </>
  );
}

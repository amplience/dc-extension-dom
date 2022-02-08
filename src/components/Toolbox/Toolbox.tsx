import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  Toolbar
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import { ImmutableTreeData, TreeSpec } from "../../model";
import ComponentList from "../ComponentList";

const drawerWidth = 300;

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      width: 70,
      left: "auto",
      top: "auto",
      right: "auto",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    toolbarRoot: {
      minHeight: "47px !important",
      margin: 0,
      padding: "0 25px"
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: 0,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      // marginRight: 36,
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      left: "auto",
      right: "auto",
      top: "auto",
      width: drawerWidth,
      height: (props: Props) => props.height || "unset",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      left: "auto",
      right: "auto",
      top: "auto",
      height: (props: Props) => props.height || "unset",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: 70
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      minHeight: "48px !important"
    },
    toolbarLabel: {
      margin: "0 15px",
      textTransform: "uppercase",
      fontSize: "0.75rem",
      fontFamily: "roboto, sans-serif",
      color: "rgba(0, 0, 0, 0.54)"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    rootCont: {
      padding: 0,
      margin: 0,
      listStyle: "none"
    }
  })
);

export interface Props {
  data?: ImmutableTreeData;
  spec?: TreeSpec;
  height?: number;
}

export const Toolbox: React.SFC<Props> = (props: Props) => {
  const { height, ...other } = props;
  const classes = useStyles(props);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.rootCont}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar className={classes.toolbarRoot}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <span className={classes.toolbarLabel}>Components</span>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ComponentList height={height} open={open} />
        <Divider />
      </Drawer>
    </div>
  );
};

export default Toolbox;

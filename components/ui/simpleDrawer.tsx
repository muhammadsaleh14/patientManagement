import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const SimpleDrawer = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer variant="persistent" anchor="left" open={open}>
        <List>
          <ListItem button>
            <ListItemIcon>{/* Add your icon here */}</ListItemIcon>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>{/* Add your icon here */}</ListItemIcon>
            <ListItemText primary="Item 2" />
          </ListItem>
          {/* Add more list items as needed */}
        </List>
      </Drawer>
      {/* Your main content goes here */}
      <div style={{ marginLeft: open ? 240 : 0, transition: "margin 0.2s" }}>
        {/* Your content */}
      </div>
    </div>
  );
};

export default SimpleDrawer;

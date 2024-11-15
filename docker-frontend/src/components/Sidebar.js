// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import { Dashboard, Archive, Layers, StorageRounded } from '@mui/icons-material';

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ width: 240, '& .MuiDrawer-paper': { width: 240 } }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/containers">
          <ListItemIcon><Archive /></ListItemIcon>
          <ListItemText primary="Containers" />
        </ListItem>
        <ListItem button component={Link} to="/images">
          <ListItemIcon><Layers /></ListItemIcon>
          <ListItemText primary="Images" />
        </ListItem>
        <ListItem button component={Link} to="/volumes">
          <ListItemIcon><StorageRounded /></ListItemIcon>
          <ListItemText primary="Volumes" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;

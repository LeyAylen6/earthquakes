import './App.css'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HouseIcon from '@mui/icons-material/House';
import earthquake from './assets/earthquake.svg';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home';
import PublicIcon from '@mui/icons-material/Public';
import { AppBar, Drawer, DrawerHeader } from './styles/NavbarMUIStyles';
import { useTheme } from '@mui/material/styles';
import About from './pages/About';
import { HandleClick } from './interfaces';
import { menu } from './constants';

const App = () => {
  const theme = useTheme();
  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => { setOpen(true) };
  const handleDrawerClose = () => { setOpen(false) };

  const handleClick = (buttonPressed: keyof HandleClick) => {
    const action: HandleClick = {
      home: () => navigate("/"),
      about: () => navigate("/about")
    }
    action[buttonPressed]()
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box display={"flex"}>
            <img src={earthquake} style={{ width: "4%", marginRight: "3rem" }}></img>
            <Typography variant="h5" noWrap component="div" style={{ marginTop: ".2rem" }}>
              Earthquakes
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((tab, index) => (
            <ListItem key={tab.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => handleClick(tab.navigate)}
                sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}
                >
                  {index % 2 === 0 ? <PublicIcon /> : <HouseIcon />}
                </ListItemIcon>
                <ListItemText primary={tab.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App

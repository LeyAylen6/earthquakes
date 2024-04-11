import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
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
import earthquake from "./../../assets/earthquake.svg";
import PublicIcon from '@mui/icons-material/Public';
import { AppBar, Drawer, DrawerHeader } from '../../styles/NavbarMUIStyles';
import { useState } from 'react';
import { menu } from '../../constants';
import { useNavigate } from 'react-router';
import { HandleClick } from './interfaces';

const NavBar = () => {
    const navigate = useNavigate()
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const handleClick = (buttonPressed: keyof HandleClick) => {
        const action: HandleClick = {
            home: () => navigate("/"),
            about: () => navigate("/about")
        }
        action[buttonPressed]()
    }

    return (
        <Box>
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
                        <img src={earthquake} style={{ width: "4%", marginRight: "3rem" }} />
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
        </Box>
    )
}

export default NavBar;
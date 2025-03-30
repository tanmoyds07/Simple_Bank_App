import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    BottomNavigation,
    BottomNavigationAction,
    Popover,
    Button
} from "@mui/material";
import {
    Menu as MenuIcon,
    AccountBalance,
    AccountCircle,
    CreditCard,
    Payment,
    Save,
    TrendingUp,
    Dashboard
} from "@mui/icons-material";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Layout = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const drawerWidth = 250; // Define drawer width

    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        navigate("/");
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? "user-popover" : undefined;

    return (
        <Box sx={{ height: "100%", width: "100%", bgcolor: "#121212", color: "white" }}>
            {/* App Bar */}
            <AppBar position="fixed" sx={{ background: "#0A1929", zIndex: 1300 }}>
                <Toolbar>
                    {/* Toggle Drawer on Click */}
                    <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(prev => !prev)}>
                        <MenuIcon />
                    </IconButton>

                    {/* Bank Name */}
                    <Typography variant="h6" sx={{ flexGrow: 1, display: "flex", alignItems: "center", ml: 1 }}>
                        <AccountBalance sx={{ mr: 1 }} /> ABCD Bank
                    </Typography>

                    {/* User Profile Icon */}
                    <IconButton color="inherit" onClick={handleUserMenuClick}>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {/* User Popover */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ mt: 1 }}
            >
                <Box sx={{ p: 2, minWidth: 150 }}>
                    <Button fullWidth variant="contained" color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Popover>
            {/* Side Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ width: drawerWidth, flexShrink: 0 }}
            >
                <Box sx={{ width: drawerWidth, bgcolor: "#1e1e1e", height: "100%", color: "white", marginTop: "4rem" }}>
                    <List>
                        <ListItem button onClick={() => navigate('/abcdBank/summary')}>
                            <ListItemIcon><Dashboard sx={{ color: "white" }} /></ListItemIcon>
                            <ListItemText primary="Summary" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('/abcdBank/accounts')}>
                            <ListItemIcon><AccountBalance sx={{ color: "white" }} /></ListItemIcon>
                            <ListItemText primary="Accounts" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('/abcdBank/creditCards')}>
                            <ListItemIcon><CreditCard sx={{ color: "white" }} /></ListItemIcon>
                            <ListItemText primary="Credit Cards" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content: Adjust width based on drawer state */}
            <Box component="main" sx={{
                transition: "margin 0.3s ease-in-out",
                marginLeft: drawerOpen ? `${drawerWidth}px` : "0px",
                padding: "20px"
            }}>
                <DrawerHeader />
                <Outlet />
            </Box>

            {/* Bottom Navigation */}
            <Box>
                <BottomNavigation sx={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0A1929" }} showLabels>
                    <BottomNavigationAction label="Pay" icon={<Payment />} />
                    <BottomNavigationAction label="Save" icon={<Save />} />
                    <BottomNavigationAction label="Invest" icon={<TrendingUp />} />
                </BottomNavigation>
            </Box>
        </Box>
    );
};

export default Layout;

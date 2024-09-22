import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FaUserNurse } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { authActions } from '../../../store/auth-slice';
const UserMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const HandleLogout = ()=>{
        dispatch(authActions.logout());
        navigate("/")
    }
    const onProfileClicked =()=>{
        navigate("/profile")
    }
    return (
        <Box>
            <IconButton color="inherit" onClick={handleMenuClick}>
                <FaUserNurse />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={onProfileClicked}>
                    <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={HandleLogout }>
                    <Typography>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;

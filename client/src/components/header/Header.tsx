import { AppBar, Box, Tab, Tabs, Toolbar, Button, Typography, IconButton } from '@mui/material'
import { ImBlogger } from "react-icons/im"
import { headerStyles } from '../../styles/header-styles'
import { useState } from 'react'
import { BiLogInCircle } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from './User/UserMenu';

const Header = () => {
    const isLoggedIn = useSelector((state: any) => state.isLoggedIn)
    const navigate = useNavigate()
    const [value, setValue] = useState(0)
    const handleAddBlog = () => {
        navigate("/add")
    }
    return (
        <AppBar sx={headerStyles.appBar}>
            <Toolbar>
                <ImBlogger
                    size={"30px"}
                    style={{ borderRadius: "50%", padding: "10px", background: "#6c5252" }} />
                    
                <Box sx={headerStyles.addLink} onClick={handleAddBlog}>
                    <Typography 
                    fontSize={20}
                    fontFamily={"work Sans"}>
                        post New Blog
                    </Typography>
                    <IconButton color="inherit">
                        <ImBlogger/>
                    </IconButton>

                </Box>
                <Box sx={headerStyles.tabContainer}>
                    <Tabs textColor='inherit'
                        TabIndicatorProps={{ style: { background: "white" } }}
                        value={value}
                        onChange={(e, val) => setValue(val)}>
                        {/* @ts-ignore */}
                        <Tab disableRipple LinkComponent={Link} to="/" label="Home" />
                        {/* @ts-ignore */}
                         <Tab disableRipple LinkComponent={Link} to="/blogs" label="Blogs" />
                       {!isLoggedIn?(
                           <Link to="/auth" style={{textDecoration:"none"}} >
                        <Button endIcon={<BiLogInCircle />} sx={headerStyles.authBtn}>
                            Auth
                        </Button>
                        </Link>
                       ):(
                        <UserMenu/>
                       )}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
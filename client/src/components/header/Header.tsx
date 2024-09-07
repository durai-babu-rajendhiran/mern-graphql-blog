import { AppBar, Box, Tab, Tabs, Toolbar, Button } from '@mui/material'
import { ImBlogger } from "react-icons/im"
import { headerStyles } from '../../styles/header-styles'
import { useState } from 'react'
import { BiLogInCircle } from "react-icons/bi";

const Header = () => {
    const [value, setValue] = useState(0)
    return (
        <AppBar sx={headerStyles.appBar}>
            <Toolbar>
                <ImBlogger
                    size={"30px"}
                    style={{ borderRadius: "50%", padding: "10px", background: "#6c5252" }} />
                <Box sx={headerStyles.tabContainer}>
                    <Tabs textColor='inherit'
                        TabIndicatorProps={{ style: { background: "white" } }}
                        value={value}
                        onChange={(e, val) => setValue(val)}
                    >
                        <Tab disableRipple label="Home" />
                        <Tab disableRipple label="Blogs" />
                        <Button endIcon={<BiLogInCircle />} sx={headerStyles.authBtn}>
                            Auth
                        </Button>
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
import { Styles } from './homepage-styles'

export const headerStyles: Styles = {
    appBar: {
        position: "sticky",
        background: "#404040"
    },
    tabContainer: {
        width: "100%",
        marginLeft: "auto",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    authBtn: {
        ml: 2,
        bgcolor: "#d27e20",
        color: "white",
        borderRadius: 20,
        width: 80,
        ":hover": {
            bgcolor: {
                bgcolor: "#ff9400"
            }
        }
    }
}
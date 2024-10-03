import { Styles } from "./homepage-styles";


export const profileStyles: Styles={
    container:{
        display:"flex",
        flex:1,
    },
    blogsContainer:{
        display:"flex",
        flex:0.7,
        flexDirection:"column",
        padding:1,
        border:'1px solid #404040',
    },
    cardContainer:{
        display:"flex",
        gap:5,
        justifyContent:"flex-start",
        alignItems:"center",
        flexWrap:"wrap",
        padding:4,
    },
    text:{
        fontFamily:"Work Sans",
        textAlign:"center",
    },
    profileContainer:{
        display:"flex",
        flex:0.3,
    },
    userContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        margin:"auto",
        position:"fixed",
        flexWrap:"wrap",
        top:"10",
        bottom:"10",
        left:"20",
        right:'20',
        gap:5,
        padding: 4,
    },
    avatar:{
        width:"80px",
        height:"80px",
        bgcolor:"#404040"
    }
}
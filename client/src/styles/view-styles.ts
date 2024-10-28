import { Styles } from "./homepage-styles";


export const blogPageStyles: Styles={
     container:{
        display:"flex",
        flexDirection:"column",
        height:"100%",
        padding:2,
    },
    profileHeader:{
        display:"flex",
        flexDirection:"column",
        padding:1,
    },
    profileHeaderItems:{
        display:"flex",
    },
    profileHeaderitems:{
        display:"flex",
        alignItems:"center",
        padding:1,
        gap:2,

    },
    blogTitle:{
        fontSize:"30px",
        textAlign:"center",
        fontWeight:"700",
        textShadow:"2px 2px 12px #ccc",
    } ,
    blogContent:{
textShadow:"1px 1px 6px #ccc",
fontSize:"20px",
textAlign:"justify",
padding:5,
    },

}
import { CSSProperties } from "react";
import { Styles } from "./homepage-styles";

export const addStyles: Styles={
    container:{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
    },
    blogHeader:{
        display:"flex",
        justifyContent:"space-around",
        // flexDirection:"column",
        fontWeight:"bold",
        padding:3,
        alignItems:"center",

    },
    formContainer:{
        display:"flex",
        flexDirection:"column"
    }

}

export const HtmlElmStyles: { [key: string]: CSSProperties } = {
    h2:{
        fontSize:"40px",
        fontFamily:"Work Sans",
        marginLeft:"50px",
        marginRight:"50px",
        marginTop:"40px",
        outline:"none",
        fontWeight:"500"
    },
    p:{
        border:"none",
        outline:"none",
        marginLeft:"50px",
        marginRight:"50px",
        marginTop:"30px ",
        fontSize:"18px",
        fontFamily:"Work Sans",
        minHeight:"300px",
    }
}
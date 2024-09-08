import { Styles } from './homepage-styles'


const randomColors = [
    "#5D9CEC", // Light Blue
    "#F7C6C7", // Soft Pink
    "#E67E22", // Orange
    "#1ABC9C", // Teal
    "#9B59B6", // Purple
    "#2ECC71", // Green
    "#F39C12", // Yellow-Orange
    "#34495E", // Dark Blue-Grey
    "#E74C3C", // Red
    "#3498DB", // Blue
    "#F5B7B1", // Light Rose
    "#7D3F8C", // Deep Purple
    "#52BE80", // Medium Green
    "#F4D03F", // Bright Yellow
    "#D35400", // Strong Orange
    "#9B59B6", // Purple
    "#1F618D", // Dark Blue
    "#E6B0AA", // Soft Peach
    "#58D68D", // Bright Green
    "#EAB543", // Warm Yellow
    "#C0392B"  // Strong Red
];

export function randomBgColor() {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
}
export const blogStyles: Styles = {
    container: {
        display: "flex",
        justifyContent: "flex-start",
        gap: 10,
        flexWrap: "wrap",
        m: 2,
    },
    card: {
        width: "500px",
        display: "flex",
        flexDirection: "column",
        height: "60vh",
        transition: "transform 1s",
        ":hover": {
            transform: "scale(1.02)",
            boxShadow: "10px 10px 20px #ccc"
        }
    },
    cardHeader: {
        fontFamily: "Work Sans",
        fontSize: "72px",
        height: "35%",
        padding: 1,
    },
    dateContainer: {
        display: "flex",
        alignItems: "center",
        gap: 2
    },
    cardContent: {
        width: "10 0%",
        height: "100%",
        fontSize: "20px",
        fontWeight: "500",
    },
    title: {
        fontWeight: "600",
        m: 1,
        color: "white",
        textTransform: "uppercase",
        textDecoration: "underline",
        textUnderlineOffset: "5px",
        fontFamily: "Work Sans",
        textShadow: "2px 7px 20px #ccc"
    },
    contentText: {
        padding: 2,
        fontSize: "20px",
        fontWeight: "500"
    }
} 
import {createTheme} from "@mui/material";

const theme = createTheme({

    typography: {
        fontFamily: 'EuclidCircularA, Raleway'
    },
    palette: {
        primary: {
            main: '#212121'
        },
        secondary: {
            main: 'rgba(30,58,255,0.91)'
        },
        text: {
            primary: '#384054',
            secondary: '#b0b7c9',
            accent: 'rgba(30,58,255,0.91)',
        },
        background: {
            default: 'rgb(228, 235, 241)',
            paper: '#ffffff'
        },
        mode: "light"
    },
    shape: {
        borderRadius: 8
    }
});

export const THEMES = {theme};

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/app/store";
import {ThemeProvider} from "@mui/material";
import {THEMES} from "./utils/themes";
import {SnackbarProvider} from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={THEMES.theme}>
                <SnackbarProvider
                    autoHideDuration={2000}
                    anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                    maxSnack={5}>
                    <App/>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

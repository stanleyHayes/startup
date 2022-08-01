import {configureStore} from "@reduxjs/toolkit";
import phaseReducer, {phaseInitialState} from "../features/phase/phase-slice";
import {STARTUP_CONSTANTS} from "../../utils/constants";

const phase = localStorage.getItem(STARTUP_CONSTANTS.STARTUP_PHASE_KEY)
    ?
    JSON.parse(localStorage.getItem(STARTUP_CONSTANTS.STARTUP_PHASE_KEY))
    : phaseInitialState


const store = configureStore({
    reducer: {
        phase: phaseReducer
    },
    preloadedState: {
        phase
    },
    devTools: true
});

export default store;

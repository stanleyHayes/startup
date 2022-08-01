import axios from "axios";

import {STARTUP_CONSTANTS} from "../utils/constants";

const getQuote = () => {
    return axios({url: `${STARTUP_CONSTANTS.QUOTE_URL}`});
}

export const PHASE_API = {getQuote};

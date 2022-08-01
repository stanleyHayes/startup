import './App.css';
import {Box, Card, CardContent, Container, Divider, LinearProgress, Skeleton, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {PHASE_ACTION_CREATORS, selectPhase} from "./redux/features/phase/phase-slice";
import React, {useEffect} from "react";
import Phase from "./components/shared/phase";
import {useSnackbar} from "notistack";

function App() {

    const {phases, completed, loading, error, quote, message} = useSelector(selectPhase);
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (completed) {
            dispatch(PHASE_ACTION_CREATORS.getQuote());
        }
    }, [completed]);

    useEffect(() => {
        if (message) {
            enqueueSnackbar(message, {variant: 'success'});
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, {variant: 'error'});
        }
    }, [error]);

    return (
        <Box sx={{minHeight: '100vh', backgroundColor: 'background.default', py: 4}}>
            <Container maxWidth="sm" sx={{height: '100%'}}>

                <Typography variant="h4" sx={{color: 'text.primary'}}>Startup Phases</Typography>

                <Divider variant="fullWidth"  sx={{my: 4}}/>

                {completed && (
                    <Card elevation={0} sx={{mb: 5}}>
                        {loading && (<LinearProgress variant="query" color="secondary"/>)}
                        <CardContent>
                            <Stack direction="column" spacing={2}>
                                <Typography variant="h6" align="center" sx={{color: 'text.primary'}}>
                                    Useless fact of the day
                                </Typography>
                                <Divider variant="fullWidth" light={true}/>
                                {loading ?
                                    (
                                        <Skeleton variant="text" animation="pulse"/>
                                    ) :
                                    (
                                        <Typography
                                            gutterBottom={true} variant="body1" align="center"
                                            sx={{color: 'text.secondary'}}>
                                            {quote && quote.text}
                                        </Typography>
                                    )}
                            </Stack>
                        </CardContent>
                    </Card>
                )}

                <Card elevation={0}>
                    <CardContent>
                        <Stack direction="column" spacing={2}>
                            {phases && phases.map(phase => {
                                return (
                                    <React.Fragment key={phase.phase}>
                                        <Phase phase={phase}/>
                                    </React.Fragment>
                                )
                            })}
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default App;

import {Avatar, Box, Stack, Typography} from "@mui/material";
import React from "react";
import Task from "./task";
import {Done} from "@mui/icons-material";

const Phase = ({phase}) => {
    return (
        <Box>
            <Stack alignItems="center" sx={{mb: 3}} direction="row" spacing={2}>
                <Avatar variant="circular" sx={{backgroundColor: 'primary.main'}}>
                    <Typography variant="h4" sx={{color: 'white'}}>
                        {phase.phase}
                    </Typography>
                </Avatar>
                <Typography variant="h6" sx={{color: 'text.primary'}}>
                    {phase.name}
                </Typography>
                {phase.completed && (
                    <Done color="primary" sx={{fontSize: 32}} />
                )}
            </Stack>

            {phase.tasks.map((task, index) => {
                return (
                    <React.Fragment key={index}>
                        <Task phase={phase} task={task}/>
                    </React.Fragment>
                )
            })}
        </Box>
    )
}

export default Phase;

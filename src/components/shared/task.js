import {Box, Checkbox, FormControl, FormControlLabel, Typography} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import {PHASE_ACTION_CREATORS} from "../../redux/features/phase/phase-slice";

const Task = ({task, phase}) => {

    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(PHASE_ACTION_CREATORS.updateTask({phase, task}));
    }

    return (
        <Box>
            <FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            size="medium"
                            color="secondary"
                            onChange={handleChange}
                            checked={task.completed}
                        />
                    }
                    label={
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            {task.description}
                        </Typography>
                    }/>
            </FormControl>
        </Box>
    )
}

export default Task;

import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {PHASE_API} from "../../../api/phase";
import {STARTUP_CONSTANTS} from "../../../utils/constants";

export const phaseInitialState = {
    phases: [
        {
            name: 'Foundation',
            phase: 1,
            tasks: [
                {
                    _id: 1,
                    completed: false,
                    description: 'Setup virtual office'
                },
                {
                    _id: 2,
                    completed: false,
                    description: 'Set mission & vision'
                },
                {
                    _id: 3,
                    completed: false,
                    description: 'Select business name'
                },
                {
                    _id: 4,
                    completed: false,
                    description: 'Buy domains'
                }
            ]
        },
        {
            name: 'Discovery',
            phase: 2,
            tasks: [
                {
                    _id: 1,
                    completed: false,
                    description: 'Create roadmap'
                },
                {
                    _id: 2,
                    completed: false,
                    description: 'Competitor analysis'
                },
            ]
        },
        {
            name: 'Delivery',
            phase: 3,
            tasks: [
                {
                    _id: 1,
                    completed: false,
                    description: 'Release marketing website'
                },
                {
                    _id: 2,
                    completed: false,
                    description: 'Release MVP'
                },
            ]
        }
    ],
    currentPhase: 1,
    completed: false,
    loading: false,
    error: null,
    quote: null,
    message: null
};

const getQuote = createAsyncThunk('phase/getQuote', async (_, {rejectWithValue}) => {
    try {
        const response = await PHASE_API.getQuote();
        return response.data;
    } catch (e) {
        return rejectWithValue('Something went wrong');
    }
});

const phaseSlice = createSlice({
    name: 'phase',
    initialState: phaseInitialState,
    reducers: {
        updateTask: (state, action) => {
            if (!state.completed) {
                if (action.payload.phase.phase > 1) {
                    // get the current phase
                    const currentPhaseID = action.payload.phase.phase;
                    // filter to get all phases that come before the current phase
                    const previousPhases = current(state.phases).filter(phase => phase.phase < currentPhaseID);
                    // for each of the previous phases
                    let allowUpdate = true;
                    previousPhases.forEach(phase => {
                        // for each of the task in the current phase
                        phase.tasks.forEach(task => {
                            // if a task is not completed
                            if (!task.completed) {
                                // display error that phase is locked
                                state.error = `${action.payload.phase.name} phase is locked. Complete previous phases`;
                                // user is allowed to update next phase tasks
                                allowUpdate = false;
                            }
                        })
                    });
                    if (allowUpdate) {
                        state.phases = state.phases.map(phase => {
                            if (phase.phase === action.payload.phase.phase) {
                                phase.tasks.map(task => {
                                    if (task._id === action.payload.task._id) {
                                        task.completed = !task.completed;
                                        return task;
                                    }
                                    return task;
                                })
                                return phase;
                            } else if (phase.phase > action.payload.phase.phase) {
                                phase.tasks.map(task => {
                                    task.completed = false;
                                    return task;
                                })
                            }
                            return phase;
                        });

                        // handle the case where a previous task is unchecked while a subsequent task is checked
                        // this can happen when you previously complete a task and later unchecks it
                        localStorage.setItem(STARTUP_CONSTANTS.STARTUP_PHASE_KEY, JSON.stringify(state));
                    }

                    // check if there are any more phases
                    const nextPhases = current(state).phases.filter(phase => phase.phase > currentPhaseID);
                    // if there are no more phases
                    if (nextPhases.length === 0) {
                        // get last phase
                        const lastPhase = state.phases[state.phases.length - 1];

                        // check to see if all the task in the current phase is completed
                        const allTasksCompleted = lastPhase.tasks.every(task => task.completed);
                        //if all tasks are completed
                        if (allTasksCompleted) {
                            // set completed to true.
                            state.completed = true;
                            state.message = 'Congratulations. You have completed all phases'
                        }
                        localStorage.setItem(STARTUP_CONSTANTS.STARTUP_PHASE_KEY, JSON.stringify(state));
                    }

                } else {
                    console.log('here')
                    state.phases = state.phases.map(phase => {
                        if (phase.phase === action.payload.phase.phase) {
                            phase.tasks.map(task => {
                                if (task._id === action.payload.task._id) {
                                    task.completed = !task.completed;
                                    return task;
                                }
                                return task;
                            })
                            return phase;
                        } else if (phase.phase > action.payload.phase.phase) {
                            phase.tasks.map(task => {
                                task.completed = false;
                                return task;
                            })
                        }
                        return phase;
                    });
                    localStorage.setItem(STARTUP_CONSTANTS.STARTUP_PHASE_KEY, JSON.stringify(state));
                }
            }
            // when phases are completed
            else {
                state.error = 'Phases already completed';
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getQuote.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.quote = null;
        }).addCase(getQuote.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.quote = action.payload;
        }).addCase(getQuote.rejected, (state, action) => {
            state.loading = false;
            state.quote = null;
            state.error = action.payload;
        })
    }
});

export const PHASE_ACTION_CREATORS = {...phaseSlice.actions, getQuote};

export const selectPhase = state => state.phase;

export default phaseSlice.reducer;

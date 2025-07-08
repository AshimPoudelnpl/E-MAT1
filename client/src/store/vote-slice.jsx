
import { createSlice } from '@reduxjs/toolkit';

const currentVoter = JSON.parse(localStorage.getItem("currentUser") );
const initialState = { 
    selectedVoteCandidate: "", 
    currentVoter, 
    selectedElection: "", 
    idOfElectionToUpdate: "", 
    addCandidatesElectionId: "" 
}

const voteSlice = createSlice({
    name: "vote",
    initialState,
    reducers: {
        changeSelectedVoteCandidate(state,action)
        {
            state.selectedVoteCandidate=action.payload;
        },
        changeCurrentVoter(state, action) {
            state.currentVoter = action.payload;
        },
        changeSelectedVoteElection(state, action) {
            state.selectedElection = action.payload;
        },
        changeIdOfElectionToUpdate(state,action){
            state.idOfElectionToUpdate=action.payload;
        },
        changeAddCandidateElectionId(state,action)
        {
            state.addCandidatesElectionId=action.payload;
        }
    }
});
export const voteActions=voteSlice.actions
export default voteSlice.reducer;
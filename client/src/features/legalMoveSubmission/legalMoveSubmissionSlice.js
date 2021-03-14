import { createSlice } from '@reduxjs/toolkit';

export const legalMoveSubmissionSlice = createSlice({
  name: 'legalMoveSubmission',
  initialState: {
    moveToReturn: {}
  },
  reducers: {
    setMoveToReturn: (state, move) => {
      state.moveToReturn = move.payload;
    }
  }
});

export const { setMoveToReturn } = legalMoveSubmissionSlice.actions;

export const selectMoveToReturn = state => state.legalMoveSubmission.moveToReturn;

export default legalMoveSubmissionSlice.reducer;

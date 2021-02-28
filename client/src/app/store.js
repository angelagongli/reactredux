import { configureStore } from '@reduxjs/toolkit';
import legalMoveSubmissionReducer from '../features/legalMoveSubmission/legalMoveSubmissionSlice';

export default configureStore({
  reducer: {
    // Legal Move Submission becomes the Move To Return
    legalMoveSubmission: legalMoveSubmissionReducer
  },
});

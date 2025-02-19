import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name: 'requests',
    initialState: { requests : []},
    reducers: {
      addRequests(state, action) {
        state.requests = action.payload;
      }
      ,
      deleteRequests(state,action) {
         state.requests = null;

      },
    },
  })

export const {addRequests , deleteRequests} = requestSlice.actions;
  export default requestSlice.reducer;
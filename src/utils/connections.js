import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
    name: 'connections',
    initialState: {connections : []},
    reducers: {
      addConnections(state, action) {
        state.connections = action.payload;
      }
      ,
      deleteConnections(state,action) {
         state.connections = null;

      },
    },
  })

export const {addConnections , deleteConnections} = connectionSlice.actions;
  export default connectionSlice.reducer;
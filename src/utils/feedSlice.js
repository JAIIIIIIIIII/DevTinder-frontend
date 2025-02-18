import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: 'feed',
    initialState: {feed : []},
    reducers: {
      addFeed(state, action) {
        state.feed = action.payload;
      }
      ,
      deleteFeed(state,action) {
         state.feed = null;
         

      },
    },
  })

export const {addFeed , deleteFeed} = feedSlice.actions;
  export default feedSlice.reducer;
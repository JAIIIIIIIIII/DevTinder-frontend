import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: 'feed',
    initialState: {feed : []},
    reducers: {
      addFeed(state, action) {
        state.feed = action.payload;
      }
      ,
      removeFeed(state,action) {
        
        state.feed = state.feed.filter((val) => val._id !== action.payload);

      },
    },
  })

export const {addFeed , removeFeed} = feedSlice.actions;
  export default feedSlice.reducer;
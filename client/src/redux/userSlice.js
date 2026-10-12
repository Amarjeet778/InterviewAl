import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userdata: null,
    },
    reducers: {
        setUserdata: (state, action) => {
            state.userdata = action.payload
        }
    },
})

export const { setUserdata } = userSlice.actions

export default userSlice.reducer
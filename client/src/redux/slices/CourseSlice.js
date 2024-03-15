import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from "../../helpers/axiosinstance";
// This is not getting resolved on vercel


const initialState = {
    courseData: [],
}

export const getAllCourses = createAsyncThunk(("/courses/getAllCourses", async() => {
    try {
        console.log("Called");
        const response = axiosInstance.get("youtube/playlist");
        console.log(response);
        toast.promise(response, {
            loading: "Fetching courses...",
            success: "Courses Loaded Successfully",
            error: "Something went wrong!"
        })
        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
}))

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload){
                state.courseData = [...action.payload];
            }
        })
    }
});

export default courseSlice.reducer;
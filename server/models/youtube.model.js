import {Schema, model} from "mongoose";

const scrappedSchema = new Schema({
    email: {
        type: "string",
        trim: true,
    },
    customCourse: [{
        thumbnailUrl: {
            type: "string",
            trim: true,
        },
        createdBy: {
            type: "string",
            trim: true,
        },
        playlist_url: {
            type: "string",
            trim: true,
        },
        playlist_title: {
            type: "string",
            trim: true,
        },
        videos: [
            {
                video_url: {
                    type: "string",
                    trim: true,
                },
                video_title: {
                    type: "string",
                    trim: true,
                },
                completed: {
                    type: "boolean",
                    default: false,
                },
            }
        ]
    }]
});

const Scrapped = model('Scrapped', scrappedSchema);

export default Scrapped;
import {model, Schema} from "mongoose";
const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [8, "Title must be atleast 8 characters"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [8, "Description must be atleast 8 characters"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },
    thumbnail: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    lectures: [
        {
            title: String,
            description: String,
            lecture: {
                public_id: {
                    type: String
                },
                secure_url: {
                    type: String,
                }
            }
        }
    ],
    numberOfLectures: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Course = model('Course', courseSchema);

export default Course;
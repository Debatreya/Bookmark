import { useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosinstance";
import { FaTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";


export default function CourseCard({data}){
    const navigate = useNavigate();
    const handleDelete = async (e) => {
        e.stopPropagation();
        const res = axiosInstance.delete("youtube/playlist", { params: { url: data.playlist_url } });
        toast.promise(res, {
            loading: "Deleting...",
            success: "Deleted Successfully",
            error: "Failed to delete"
        });
        // I want to reload the page after deleting the course
        window.location.reload();
    }
    return (
        <div 
            onClick={() => navigate("/course/description/", {state: {...data}})} 
            className="text-white w-[22rem] h-max shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700 p-2 border border-red-200 hover:scale-105 transition relative m-5">
            {/* <p className="w-[30px] h-[30px] absolute top-1 right-1 bg-black rounded-full flex justify-center items-center font-bold p-2 hover:scale-105 transition" onClick={handleDelete}>&#10060;</p> */}
            <FaTrashCan className="w-[20px] h-[20px] absolute top-2 right-2 hover:rounded-full flex justify-center items-center p-1 hover:scale-150 hover:bg-red-500 transition" onClick={handleDelete} />
            <div className="overflow-hidden">
                <img 
                    className="h-48 w-full rounded-tl-lg rounded tr-lg group-hover: scale=[1,2] transition-all ease-in-out duration-300"
                    src={data?.thumbnailUrl} alt="Thumbnail" 
                />
                <div className="p-3 space-y-1 text-white">
                    <hr className="text-white"/>
                    <h2 className="text-2xl font-bold text-green-200 line-clamp-2 text-center">
                        {data?.playlist_title || "Course Title"}
                    </h2>
                    <hr className="text-white"/>
                    {/* No Description */}
                    {/* <p className="line-clamp-2">
                        {data?.description || "Course Description"}
                    </p> */}
                    {/* No Category */}
                    {/* <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Category : </span>
                        {data?.category || "Category"}
                    </p> */}
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Total lectures : </span>
                        {data?.videos?.length || 0}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Created By : </span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    )
}

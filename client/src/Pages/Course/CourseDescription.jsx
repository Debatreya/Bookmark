import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout";
import VideoPlayer from "../../components/VideoPlayer";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helpers/axiosinstance";
import toast from "react-hot-toast";

const VideoLabels = ({index, title, url, videoURL, completed, handleOnCLick, callGetProgress}) => {
    const [checked, setChecked] = useState();
    async function getVideoProgress(){
        const email = JSON.parse(localStorage.getItem("data")).email;
        console.log(email);
        try {
            const response = await axiosInstance.get(`youtube/playlist/video/progress/?id=${url}&videoId=${videoURL}&email=${email}`, { withCredentials: true });
            console.log(response.data);
            completed = response.data.completed;
        } catch (error) {
            console.log(error.message);
        }
    }
    async function progressHandler(e){
        setChecked(e.target.checked);
        const email = JSON.parse(localStorage.getItem("data")).email;
        console.log(email);
        try{
            const body = {
                email: email,
                id : url,
                videoId : videoURL
            }
            const response = await axiosInstance.patch(`youtube/playlist/video/progress`, body);
            callGetProgress();
            toast.success(response.data.message);
        }catch(err){
            toast.error(err.message);
            console.log(err.message);
        }
    }
    // Lets See Where can I use this function
    useEffect(() => {
        getVideoProgress()
        setChecked(completed);
    }, [])
    // NEED to send the checked status to the server and to the database
    return (
        <div className={`h-[3.5rem] flex items-center justify-between ${checked ? `bg-lime-700` : `bg-black` } text-white my-2 px-2 shadow-[0px_0px_2px_lime] rounded-sm`}>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold mr-2 cursor-pointer min-h-full py-[10%]" onClick={() => handleOnCLick(index)}>{title}</p>
            <input 
                type="checkbox" 
                name="videoCheck" 
                id="videoCheck" 
                checked={checked}
                onClick={progressHandler} />
        </div>
    )
}

export default function CourseDescription(){
    const navigator = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [idx, setIdx] = useState(0);
    const [video, setVideo] = useState({
        title: data.videos[idx].video_title,
        url: data.videos[idx].video_url
    });
    const allVideos = data.videos;
    const len = allVideos.length;
    function handleNext(){
        if(idx < len-1){
            setIdx(idx+1);
            setVideo({
                title: data.videos[idx+1].video_title,
                url: data.videos[idx+1].video_url
            })
        }
        else{
            setIdx(0);
            setVideo({
                title: data.videos[0].video_title,
                url: data.videos[0].video_url
            })
        }
    }
    function handlePrev(){
        if(idx > 0){
            setIdx(idx-1);
            setVideo({
                title: data.videos[idx-1].video_title,
                url: data.videos[idx-1].video_url
            })
        }
        else{
            setIdx(len-1);
            setVideo({
                title: data.videos[len-1].video_title,
                url: data.videos[len-1].video_url
            })
        }
    }
    function changeVideo(index){
        setIdx(index);
        setVideo({
            title: data.videos[index].video_title,
            url: data.videos[index].video_url
        })
    }
    // progress Checking
    const [progress, setProgress] = useState({
        completed: 0,
        total: 0
    });
    const progressPercent = Math.round((progress.completed / progress.total) * 100)
    const getProgress = async () => {
        const email = JSON.parse(localStorage.getItem("data")).email;
        console.log(email);
        try {
            const response = await axiosInstance.get(`youtube/playlist/progress/?id=${data.playlist_url}&email=${email}`)
            console.log(response.data);
            const {completed, total} = response.data;
            setProgress({ completed, total });
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getProgress()
    }, [])
    return (
        <HomeLayout>
            <h1 className="relative text-center text-4xl font-bold text-emerald-500 tracking-wide bg-black h-[10svh] flex items-center justify-center">
                {data.playlist_title}
                <span className="text-[#06fb0e] text-5xl absolute right-5">
                    {progressPercent ? progressPercent : 0}%
                </span>
            </h1>
            <main className="flex lg:h-[80svh] gap-3 relative max-lg:flex-wrap">
                <progress className="w-full h-[2svh] absolute top--2 customProgress" value={progress.completed} max={progress.total}></progress>
                <div className="min-w-[65svw] min-h-full flex flex-col justify-center p-2 px-5 relative grow">
                    <GrPrevious
                        className="text-4xl text-yellow-500 cursor-pointer inline absolute hover:scale-110 transition-all ease-in-out duration-300 hover:text-emerald-500 bg-black rounded-full p-2"
                        onClick={() => navigator(-1)}
                    />
                    <VideoPlayer videoUrl={video.url} videoTitle={video.title} />
                    <div className="flex justify-center gap-[50px] max-lg:mt-3">
                        <button className="bg-black px-2 rounded-md text-yellow-500 text-xl cursor-pointer" onClick={handlePrev}>Prev</button>
                        <button className="bg-black px-2 rounded-md text-yellow-500 text-xl cursor-pointer" onClick={handleNext}>Next</button>
                    </div>
                </div>
                <aside className="min-h-full grow px-2 lg:overflow-auto lg:border-l  border-lime-300">
                    {allVideos.map((v, index) => <VideoLabels key={index} index={index} title={v.video_title} url={data.playlist_url} completed={v.completed} videoURL={v.video_url} handleOnCLick={changeVideo} callGetProgress={getProgress} />)}
                </aside>
            </main>
        </HomeLayout>
    )
}
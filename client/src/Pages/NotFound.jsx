import { useNavigate } from 'react-router-dom';
export default function NotFound(){
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-center text-9xl font-extrabold text-white">
                404 
            </h1>
            <h2 className="text-5xl px-5 py-2 rounded-md bg-white text-red-500 font-mono">not found</h2>
            <button className="m-5" onClick={() => navigate(-1)}>
                <span className="relative inline-block text-md font-medium text-[#4788e4] group active:text-yellow-500">Go Back</span>
            </button>
        </div>
    )
}
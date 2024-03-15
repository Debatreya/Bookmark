import {useNavigate} from 'react-router-dom'
const Denied = () => {
    const navigate = useNavigate()
    return(
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <div className=" h-auto relative ">
                <h1 className="text-9xl font-extrabold text-white tracking-widest">
                    403
                </h1>
                <div className="bg-black text-white px-2 text-sm rounded rotate-45 absolute bottom-[40%] left-[48%] translate-x-[-50%] translate-y-[50%]">
                    Access Denied
                </div>
            </div>
            <button onClick={() => navigate(-1)} className='mt-5'>
                <span className='relative block px-8 py-3 bg-[#1A2238] border border-current'>
                    Go Back
                </span>
            </button>
        </main>
    )
}
export default Denied;
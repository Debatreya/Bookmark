import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import { IoIosBookmarks } from "react-icons/io";

export default function HomePage() {
    return (
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 my-auto">
                <div className="w-[70%] space y-6 flex flex-col justify-center">
                    <span className="text-7xl max-sm:text-4xl text-bold mb-4 max-sm:mb-1 madimi-one-regular">BookMark <IoIosBookmarks className="text-yellow-500 inline" /> </span>
                    <h1 className="text-5xl max-sm:text-2xl font-semibold my-4 max-sm:my-1">
                        Best way to manage&nbsp;
                        <span className="bg-yellow-500 text-black inline-flex rounded-md px-4 py-1 font-bold mt-5">
                             Online Courses 
                        </span>
                    </h1>
                    <p className="text-xl text-gray-200 max-sm:text-base">
                        Manage your online courses and playlists in one place. 
                        <br />
                        Create, update and delete your courses and youtube playlists. As well as track your progress.
                    </p>
                    <div className="sm:space-x-6">
                        <Link to="/courses">
                            <button className="border border-sky-500 bg-sky-500 my-4 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-sky-600 transition-all ease-in-out">
                                Explore courses
                            </button>
                        </Link>
                        <Link to="/contact">
                            <button className="border border-sky-500 my-4 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-sky-600 transition-all ease-in-out">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}
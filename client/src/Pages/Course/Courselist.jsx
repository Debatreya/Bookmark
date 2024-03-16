import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
// import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "../../components/CourseCard";
import axiosInstance from "../../helpers/axiosinstance";
import { FaYoutube } from "react-icons/fa";

function GetCourse({ loadCourses }) {
	const [playlist, setPlaylist] = useState({
		title: "",
		url: "",
	});
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setPlaylist({
			...playlist,
			[name]: value,
		});
	};
	function createPlaylist(e) {
		e.preventDefault();
		console.log(playlist);
		try {
			const email = JSON.parse(localStorage.getItem("data")).email;
			console.log(email);
			const body = {
				title: playlist.title.trim(),
				url: playlist.url.trim(),
				email,
			};
			console.log(body);
			toast.promise(axiosInstance.post("youtube/playlist", body), {
				loading: "Creating Playlist",
				success: (response) => {
					toast.success("Playlist Added Successfully");
					setPlaylist({
						title: "",
						url: "",
					});
					loadCourses();
				},
				error: (err) => {
					toast.error("Failed to add playlist, Invalid URL");
					console.log(err.message);
				},
			});
		} catch {
			(err) => {
				toast.error("Failed to add playlist, Invalid URL");
				console.log(err.message);
			};
		}
	}
	return (
		<div className="m-5 flex flex-col gap-1 justify-center items-center shadow-md shadow-white p-5 max-w-[30svw] min-w-[25svw] min-h-[60svh] border border-yellow-600 rounded-lg">
			<h1 className="text-2xl font-semibold my-4 text-center py-[5%]">
				<span className="bg-yellow-500 text-black inline-flex rounded-md px-4 py-1 font-bold">
					Add Playlist
				</span>
				&nbsp; from <FaYoutube className="text-red-500 inline-flex text-5xl" />
			</h1>
			<input
				className="mb-5 w-[95%] h-10 px-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
				type="text"
				name="title"
				id="playlist_title"
				value={playlist.title}
				onChange={handleInputChange}
				placeholder="Playlist Title (eg. Web Development)"
			/>
			<input
				className="mb-5 w-[95%] h-10 px-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
				type="url"
				name="url"
				id="playlist_url"
				value={playlist.url}
				onChange={handleInputChange}
				placeholder="Playlist URL (eg. https://www.youtube.com/playlist?list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3)"
			/>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={createPlaylist}
			>
				CREATE
			</button>
		</div>
	);
}

export default function CourseList() {
	// Kaam nhi kr rha dispatch se
	// const dispatch = useDispatch();
	// const {courseData} = useSelector((state) => state.course);
	const navigator = useNavigate();
	const [courseData, setCourseData] = useState([]);
	async function loadCourses() {
		// await dispatch(getAllCourses);
		// console.log(courseData);
		const email = JSON.parse(localStorage.getItem("data")).email;
		console.log(email);
		const res = axiosInstance.get(`youtube/playlist/?email=${email}`);
		toast.promise(res, {
			loading: "Loading",
			success:
				(await res).data.customCourse.length == 0
					? "No Course Found, Please add one"
					: "Courses Loaded",
			error: "Error Loading Courses",
		});
		const response = await res;
		console.log(response.data.customCourse);
		setCourseData(response.data.customCourse);
	}

	const deleteCourse = async (data) => {
		try {
			const email = JSON.parse(localStorage.getItem("data")).email;
			console.log(email);
			const res = axiosInstance.delete(
				"youtube/playlist",
				{ params: { url: data.playlist_url, email: email } },
				{ withCredentials: true }
			);
			toast.promise(res, {
				loading: "Deleting...",
				success: "Deleted Successfully",
				error: "Failed to delete",
			});
            const response = await res;
		} catch (error) {
            console.log(error);
            toast.error("Failed to delete");
        }finally{
            await loadCourses();
        }
	};
	useEffect(() => {
		//check isLoggedIn then load courses
		const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
		// Check if user is logged in
		if (isLoggedIn) {
			loadCourses();
		} else {
			toast.error("Please Login");
			navigator("/login");
		}
	}, []);

	return (
		<>
			<HomeLayout>
				<h1 className="text-2xl font-semibold text-center max-h-[10vh]">
					Explore the &nbsp;
					<span className="bg-yellow-500 text-black inline-flex rounded-md px-4 py-1 font-bold mt-5">
						Customized Courses
					</span>
					&nbsp; made by you
				</h1>
				<div className="h-[80vh] pt-5 flex justify-evenly items-center gap-5 text-white overflow-hidden">
					<div className="my-10 min-w-[70svw] flex flex-wrap justify-evenly gap-5 h-[75vh] hover:overflow-y-scroll customScrollbar">
						{courseData?.map((ele) => {
							return (
								<CourseCard
									key={ele._id}
									data={ele}
									deleteCourse={deleteCourse}
								/>
							);
						})}
					</div>
					<GetCourse loadCourses={loadCourses} />
				</div>
			</HomeLayout>
		</>
	);
}

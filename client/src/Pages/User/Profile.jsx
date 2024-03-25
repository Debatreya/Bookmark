import HomeLayout from "../../Layouts/HomeLayout";

const Profile = () => {
	// Current take data from localstorage that is set in time of login, to display the profile
	// Need somechanges in the server
	// In local storage there is a key named 'data' and its values has the userdetails as follows
	// avatar:{public_id: "debatreyadas@gmail.com", secure_url: ""}
	// createdAt:"2024-03-16T00:01:03.119Z"
	// email:"debatreyadas@gmail.com"
	// fullName:"debatreya"
	// role:"USER"
	// updatedAt:"2024-03-16T00:01:03.119Z"
	// __v:0
	// _id:"65f4e13faf6e8342da959d81"

	const localUser = JSON.parse(localStorage.getItem("data"));
	console.log(localUser);

	return (
		<HomeLayout>
			<div className="flex justify-center items-center lg:h-[90svh]">
				<div className="bg-black text-yellow-500 rounded-lg shadow-lg p-6">
					<div className="mb-4">
						<h2 className="text-2xl font-bold text-blue-400">Profile</h2>
					</div>
					{localUser.avatar.secure_url && (
						<div>
							<img
								src={localUser.avatar.secure_url}
								alt={localUser.fullName}
								className="w-32 h-32 rounded-full mt-2 mx-auto"
							/>
						</div>
					)}
					<div className="mb-4">
						<span className=" bg-slate-800 px-2 mr-2 rounded-lg font-bold">
							Full Name:{" "}
						</span>
						<span>{localUser.fullName}</span>
					</div>
					<div className="mb-4">
						<span className="font-bold bg-slate-800 px-2 mr-2 rounded-lg ">
							Email:{" "}
						</span>
						<span>{localUser.email}</span>
					</div>
					<div className="mb-4">
						<span className="bg-slate-800 px-2 mr-2 rounded-lg font-bold">
							Role:{" "}
						</span>
						<span>{localUser.role}</span>
					</div>
				</div>
			</div>
		</HomeLayout>
	);
};

export default Profile;

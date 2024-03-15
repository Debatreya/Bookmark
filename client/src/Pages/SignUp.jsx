import { BsPersonCircle } from "react-icons/bs";
import HomeLayout from "../Layouts/HomeLayout"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/AuthSlice";
export default function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    })
    const  handleUserInput = (e) => {
        const {name, value} = e.target;
        setSignupData({
         ...signupData,
            [name]: value
        })
    }
    function getImage(event){
        event.preventDefault();
        //getting the image
        const uploadedImage = event.target.files[0]
        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function(){
                setPreviewImage(this.result)
            })
        }
    }
    // console.log(signupData);
    async function createNewAccount(event){
        event.preventDefault();
        if(!signupData.email || !signupData.fullName || !signupData.password){
            toast.error("Please fill all the details")
            return;
        }
        // Regex email validation
        if(!signupData.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            toast.error("Please enter a valid email")
            return;
        }
        if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
            toast.error("Password should be 6 - 16 characters long with atleast a number and a special character")
            return;
        }
        const formdata = new FormData();
        formdata.append("fullName", signupData.fullName);
        formdata.append("email", signupData.email);
        formdata.append("password", signupData.password);
        formdata.append("avatar", signupData.avatar);

        // dispatch create account action
        const response = await dispatch(createAccount(formdata))
        if(response.payload.success)
            navigate("/");
        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: "",
        })
        setPreviewImage("");
    }
    return (
        <HomeLayout>
            <div className="m-auto gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_grey]">
                <form action="" onSubmit={createNewAccount} className="flex flex-col justify-center">
                    <h1 className="text-center text-2xl font-bold">
                        Register to &nbsp;
                        <span className="bg-yellow-500 text-black inline-flex rounded-md px-2 py-1 font-bold">
                            Get Started 
                        </span>
                    </h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full my-[20px] mx-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full my-[20px] mx-auto shadow-[0_0_15px_yellow]" />
                        )}
                    </label>
                    <input 
                        className="hidden" 
                        type="file" 
                        name="avatar" 
                        id="image_uploads" 
                        accept=".jpg, .jpeg, .png, .svg" 
                        onChange={getImage}
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="font-semibold text-[1.3rem]">Full Name</label>
                        <input 
                            type="text" 
                            required
                            name="fullName"
                            id="fullname"
                            placeholder="Enter your name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>
                    <div className="flex flex-col gap-1 my-3">
                        <label htmlFor="email" className="font-semibold text-[1.3rem]">Email</label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                            onChange={handleUserInput}
                            value={signupData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold text-[1.3rem]">Password</label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="passoword"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                    </div>

                    <button 
                        type="submit" className="bg-yellow-600 self-center mt-5 px-3 py-1 text-[1.5rem] rounded-full font-semibold"
                    >
                        Create Account
                    </button>
                    <p className="m-auto mt-2 mb-0">Already have an account ? <Link to="/login" className="link text-accent cursor-pointer">login</Link></p>
                </form>
                <Toaster />
            </div>
        </HomeLayout>
    )
}
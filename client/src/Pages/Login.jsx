import { BsPersonCircle } from "react-icons/bs";
import HomeLayout from "../Layouts/HomeLayout"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/AuthSlice";
export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [LoginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const  handleUserInput = (e) => {
        const {name, value} = e.target;
        setLoginData({
         ...LoginData,
            [name]: value
        })
    }
    // console.log(LoginData);
    async function onLogin(event){
        event.preventDefault();
        if(!LoginData.email || !LoginData.password){
            toast.error("Please fill all the details")
            return;
        }
        // Regex email validation
        if(!LoginData.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            toast.error("Please enter a valid email")
            return;
        }

        // dispatch create account action
        const response = await dispatch(login(LoginData))
        if(response.payload.success)
            navigate("/");
        setLoginData({
            email: "",
            password: "",
        })
    }
    return (
        <HomeLayout>
            <div className="m-auto gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_grey]">
                <form action="" onSubmit={onLogin} className="flex flex-col justify-center">
                    <h1 className="text-center text-2xl font-bold">
                        Lets.. &nbsp;
                        <span className="bg-yellow-500 text-black inline-flex rounded-md px-2 py-1 font-bold">
                            Login 
                        </span>
                    </h1>

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
                            value={LoginData.email}
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
                            value={LoginData.password}
                        />
                    </div>

                    <button 
                        type="submit" className="bg-yellow-600 self-center mt-5 px-3 py-0 text-[1.3rem] rounded-full font-semibold"
                    >
                        Login
                    </button>
                    <p className="m-auto mt-2 mb-0">Don't have an account ? <Link to="/signup" className="link text-accent cursor-pointer">signup</Link></p>
                </form>
                <Toaster />
            </div>
        </HomeLayout>
    )
}
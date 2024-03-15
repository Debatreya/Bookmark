import {FiMenu} from 'react-icons/fi';
import {AiFillCloseCircle} from 'react-icons/ai';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../redux/slices/AuthSlice';

export default function HomeLayout({ children }){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // For checking if user is logged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    // for displaying the options acc to role
    const role = useSelector((state) => state?.auth?.role)

    const changeWidth = ()=>{
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
        const ham = document.getElementsByClassName("drawer-content");
        ham[0].style.display = 'none';
    }
    const hideDrawer = ()=>{
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
        changeWidth();
        const ham = document.getElementsByClassName("drawer-content");
        ham[0].style.display = 'block';
    }
const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    if(res?.payload?.success)
        navigate("/");
}

    return (
        <div className="min-h-[100vh] flex flex-col">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu 
                        onClick={changeWidth}
                            size={"32px"}
                            className='font-bold text-white m-4'
                        />
                    </label>
                </div>
                <div className="drawer-side w-0 h-[90vh]">
                    <label htmlFor="my-drawer" className='drawer-overlay'></label>
                    <ul className="menu p-4 w-48 sm:w-48 text-base-content relative">
                        <li className="w-fit absolute right-0 top-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li className='my-2 mt-8'>
                            <Link to="/">Home</Link>
                        </li>

                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/dashboard">Admin Dashboard</Link>
                            </li>
                        )}
                        <li className='my-2'>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li className='my-2'>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li className='my-2'>
                            <Link to="/about">About Us</Link>
                        </li>
                        {!isLoggedIn && (
                            <div className="w-full flex items-center justify-center gap-2 mt-4 transition-all">
                                <button className='bg-yellow-500 text-black font-bold px-4 py-1 rounded-md w-full'>
                                <Link to="/login">Login</Link>
                                </button>
                                <button className='bg-black text-yellow-500 font-bold px-4 py-1 rounded-md w-full'>
                                <Link to="/signup">Signup</Link>
                                </button>
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className="w-full flex items-center justify-center gap-2 mt-4 transition-all">
                                <button className='bg-yellow-500 text-black font-bold px-4 py-1 rounded-md w-full'>
                                <Link to="/user/profile">Profile</Link>
                                </button>
                                <button className='bg-black text-yellow-500 font-bold px-4 py-1 rounded-md w-full'>
                                <Link onClick={handleLogout}>Logout</Link>
                                </button>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
            {children}
            <Footer />
        </div>
    )
}
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsDiscord, BsGithub } from 'react-icons/bs';
export default function Footer(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return (
        <>
            <footer className="relative mt-auto left-0 bottom-0 min-h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20">
                <section className="text-lg">
                    Copyright {year} | All rights reserved
                </section>
                <section className='flex items-center justify-center gap-5 text-2xl text-white'>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsFacebook />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsInstagram />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsTwitter />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsGithub />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsDiscord />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsLinkedin />
                    </a>
                </section>
            </footer>
        </>
    )
}
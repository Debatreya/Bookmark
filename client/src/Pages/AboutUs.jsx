import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../assets/images/LMS_about_main.png"
import "../CSS/customAnimations.css";
export default function AboutUs(){
    return(
        <HomeLayout>
            <div className="px-20 pt-10 flex flex-col text-white ml-[7vw] justify-center items-center h-[90vh]">
                
                <div className="flex items-center justify-evenly gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the affordable and quality education. We are providing the platform for the aspiring teachers and their skills, creativity and knowledge to each other to empower in the growth and wellness of mankind.
                        </p>
                    </section>
                    <div className="w-1/2">
                        <img 
                            className="drop-shadow-[0_35px_35px_rgba(4,252,247,0.4)] m-auto animate-up-down"
                            src={aboutMainImage}
                        />
                    </div>
                </div>
                
            </div>
            {/* <div className="w-1/2 m-auto">
                <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full">
                      <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                      </div>
                    </div> 
                    <div id="slide2" className="carousel-item relative w-full">
                      <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a> 
                        <a href="#slide3" className="btn btn-circle">❯</a>
                      </div>
                    </div> 
                    <div id="slide3" className="carousel-item relative w-full">
                      <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a> 
                        <a href="#slide4" className="btn btn-circle">❯</a>
                      </div>
                    </div> 
                    <div id="slide4" className="carousel-item relative w-full">
                      <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a> 
                        <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
            </div> */}
        </HomeLayout>
    )
}
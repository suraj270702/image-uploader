
import Navbar from "../navbar/Navbar";
import heroImg from "../../assets/website-visiting-image.jpg";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row items-center ">
        <div className="flex flex-col gap-y-10">
          <h1 className="text-[30px] md:text-[40px] lg:text-[45px] font-medium text-gray-500 leading-5">
            Image Uploader Platform
          </h1>
          <p className="text-gray-400">
            Welcome to our Image Uploader Platform, where you have exclusive
            access to view and manage your own images. Our platform is designed
            to provide a personalized experience, allowing you to upload,
            organize, and store your photos securely. 
          </p>
        </div>
        <img src={heroImg} />
      </div>
    </>
  );
};

export default Home;

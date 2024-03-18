

import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar = () => {
    const  navigate = useNavigate();

    const handleLoginButton =()=>{
        navigate("/login");
    }

    let cookie = Cookies.get("Token")

    const handleLogout =async()=>{
      Cookies.remove("Token")
      //window.location.reload()
      let response = await axios.post("https://image-uploader-api-q5uf.onrender.com/api/logout")
      console.log(response.data)
      if(response.status===200){
        console.log("logout")
        window.location.reload()
      }
    }

  return (
    <>
    <div className="w-full bg-gray-100 py-3 border-b-2">
      <div className="w-[90%] md:w-[80%] mx-auto flex items-center justify-between">
        <h1 className="text-[30px] font-medium text-gray-600">ImageUploader</h1>
        {
          cookie && <Link to="/all-image" className="text-[20px] font-medium">All Uploads</Link>
        }
        {
          !cookie ? <button className="px-4 py-2 bg-black rounded-lg text-[20px] font-medium text-white transition-all ease-in-out duration-300 hover:bg-gray-400" onClick={handleLoginButton}>Login</button>:<button className="px-4 py-2 bg-black rounded-lg text-[20px] font-medium text-white transition-all ease-in-out duration-300 hover:bg-gray-400" onClick={handleLogout}>Logout</button>
        }
        
      </div>
    </div>
    <Outlet />
    </>
  );
};

export default Navbar;

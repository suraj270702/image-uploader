import axios from "axios";
import  { useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ImageUploadForm = () => {
  
  const [image, setImage] = useState<any>(null);
  //const [url, setUrl] = useState("");
  const [name,setName] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const upload = async (e:any) => {
    e.preventDefault()
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "fmuxopox");
    data.append("cloud_name", "dvqgk7dst");
    try {
      if(!name){
        toast.error("Image name is required")
        setLoading(false)
        return
      }
      if(!image){
        toast.error("Image  is required")
        setLoading(false)
        return
      }
      setLoading(true)
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dvqgk7dst/image/upload",data
      );

      console.log(res.data);
      

      if(res.status===200){
        
        //setUrl(res.data.secure_url)
        try{

          let response = await axios.post("https://image-uploader-api-q5uf.onrender.com/api/image-upload/upload",{name:name,url:res.data.secure_url},{withCredentials:true})

          if(response.status===200){
            toast.success("Image Uploaded Successfully!")
            navigate("/all-image")
          }

        }
        catch(err){
toast.error("Error Occured While Saving The Image.")
        }
      }

      

      
    } catch (err) {
      console.log("error in image uploading", err);
      toast.error("Error Occurred While Uploading the image")
    }finally{
      setLoading(false)
    }
  };
  return (
    <div>
      <Toaster />
      <div className="">
        <form className="flex flex-col gap-y-4 p-5 md:p-10 bg-white shadow-lg rounded-lg  items-center justify-center w-[90%] lg:w-[50%] mx-auto">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Image Name
            </label>
            <input
              type="text"
              name={name}
              onChange={(e)=>setName(e.target.value)}
            
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
            />
          </div>
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {image ? (
                <img src={URL.createObjectURL(image)} className="w-[150px] h-[150px] mx-auto rounded-lg"  />
              ) : (
                <>
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </>
              )}
            </div>
            
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              
              onChange={(e) => {
                const imageFile = e?.target?.files?.[0];
                if (imageFile) {
                  setImage(imageFile);
                }
              }}
            />
          </label>
          <button onClick={(e)=>upload(e)} disabled={loading} className="w-full bg-black py-2 rounded-lg text-white">{loading ? "loading...":"Save"}</button>
        </form>
      </div>
    </div>
  );
};

export default ImageUploadForm;

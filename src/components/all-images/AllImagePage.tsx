import axios from "axios";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllImagePage = () => {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState<any>();
  const [search,setSearch] = useState("")
  const fetch = async () => {
    try {
      const response = await axios.get(
        `https://image-uploader-api-q5uf.onrender.com/api/image-upload/all-uploads?search=${search}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setUploads(response?.data?.getAllImages);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetch();
  }, [search]);
  return (
    <div className="lg:w-[80%] mx-auto w-[95%]">
      <div className="flex flex-col gap-y-4 lg:flex-row items-center justify-between py-2 b">
        <div className="w-full lg:w-[50%]">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              name={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            
          </div>
        </div>
        <button
          className="px-4 py-2  bg-black rounded-lg text-white"
          onClick={() => navigate("/upload")}
        >
          Add Image
        </button>
      </div>
      <div className="mt-10 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-y-5">
        {uploads &&
          uploads.map((item: any, i: number) => (
            <div className="bg-white w-full lg:w-[320px] shadow-lg" key={i}>
              <img
                src={item?.image}
                className="w-[250px] h-[200px] rounded-lg mx-auto"
              />
              <h1 className="text-center font-medium mt-4">{item.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllImagePage;

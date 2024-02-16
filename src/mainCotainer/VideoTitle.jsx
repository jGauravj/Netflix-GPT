import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle = ({ title, overview, rating }) => {
  return (
    <div className="mx-20">
      <div className="p-4 mt-32">
        <h1 className="text-7xl font-semibold ">{title}</h1>
        <p className=" text-base w-1/3 mt-3">{overview}</p>
        <div className="flex mt-5 gap-3">
          <button className="flex px-8 py-2.5 bg-[rgba(255,255,255,0.95)] text-[rgba(0,0,0,0.9)] items-center gap-2 font-medium rounded hover:bg-[rgb(225,225,225)]">
            <FaPlay className="text-2xl" /> Play
          </button>
          <button className=" flex px-8 py-2.5 bg-[rgba(255,255,255,0.2)] items-center gap-2 font-medium rounded hover:bg-[rgba(255,255,255,0.3)]">
            <AiOutlineInfoCircle className="text-2xl" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;

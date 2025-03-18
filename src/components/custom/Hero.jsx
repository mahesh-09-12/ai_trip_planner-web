import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-10 p-5 lg:p-10 text-center mt-10">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold flex flex-col gap-5 w-full md:w-[90%]">
        <span className="text-orange-500">
          AI will help you to travel around the World!
        </span>
        Discover the World with AI
      </h2>
      <p className="text-xl text-gray-500">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to="/create-trip">
        <Button className="cursor-pointer p-2 py-2 sm:p-5">Get Started</Button>
      </Link>

      <img
        src="/tripimg.png"
        className="w-[85%] h-[85%] my-10 rounded-2xl hover:scale-[103%] hover:shadow-xl transition-all duration-150"
        alt="pageimg"
      />
    </div>
  );
};

export default Hero;

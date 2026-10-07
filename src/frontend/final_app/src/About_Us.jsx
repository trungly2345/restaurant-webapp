import React from "react";
import TrungImage from "./images/Trung Quoc Ly.webp";
import DavidImage from "./images/Senior pic FaceCropped.jpeg";

const About = () => {
  return (
    <div className="text-[var(--color-secondary)] bg-[var(--color-primary)] min-h-screen">
      {/* Hero Section */}
      <div
        className="h-[60vh] w-full bg-cover bg-center flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6646072/pexels-photo-6646072.jpeg')",
        }}
      >
        <h1 className="text-white text-6xl font-bold">About Us</h1>
        <p className="text-white text-2xl mt-4">Meet the developers behind SEA Food</p>
      </div>

      
      <div className="py-12 px-6 max-w-4xl mx-auto text-center">
        <p className="text-xl">
          Welcome to our About Us page! We are two passionate Computer Science students dedicated
          to building applications and improving user experiences. Below, you can learn more about
          each of us and our interests in software development.
        </p>
      </div>

      
      <div className="grid md:grid-cols-2 gap-10 px-6 pb-20 max-w-6xl mx-auto">
        {/* David */}
        <div className="bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">David Cavan</h2>
          <img src={DavidImage} alt="David Cavan" />
          <p className="text-lg mb-2"><b>Email:</b> Dcavan@iastate.edu</p>
          <p className="text-md">
            I am an undergraduate senior majoring in Computer Science, currently taking COMS 319
            Section 1. I am interested in developing apps and spend my free time playing video games
            with friends.
          </p>
        </div>

        {/* Trung */}
        <div className="bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Trung Quoc Ly</h2>
          <img src={TrungImage} alt="Trung Quoc Ly" />
          <p className="text-lg mb-2"><b>Email:</b> Trungly@iastate.edu</p>
          <p className="text-md">
            I am an undergraduate senior majoring in Computer Science, currently taking COMS 319
            Section 4. My interests mainly focus on Front End and Mobile App Development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

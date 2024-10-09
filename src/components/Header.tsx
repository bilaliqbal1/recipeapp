import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative bg-cover bg-center h-64 sm:h-80 lg:h-40 flex items-center justify-center ">
      <div className="headerImage absolute inset-0 bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-4xl font-bold">
          Optimized Your Meal
        </h1>
        <p className="text-lg sm:text-xl mt-4">
          Choose your favorite meal and add it to your plan!
        </p>
      </div>
    </header>
  );
};

export default Header;

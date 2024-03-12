import React from "react";

const AboutPage = async () => {
  const response = await fetch(`http://localhost:4000/companyInfo`);
  const results = await response.json();

  return (
    <div className="p-10 m-10  bg-yellow-200 border-solid border-2 border-black">
      <div className="mb-4">{results.name}</div>
      <div>{results.description}</div>
    </div>
  );
};

export default AboutPage;

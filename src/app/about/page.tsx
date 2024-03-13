import React from "react";

const AboutPage = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/companyInfo`
  );
  const results = await response.json();

  return (
    <div className="p-10 m-10  bg-yellow-200 border-solid border-2 border-black">
      <div className="mb-4">{results.name}</div>
      <div>{results.description}</div>
      <img src={results.image} />
    </div>
  );
};

export default AboutPage;

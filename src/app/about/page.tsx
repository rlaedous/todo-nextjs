import React from "react";

const AboutPage = async () => {
  const response = await fetch(`http://localhost:4000/companyInfo`);
  const results = await response.json();
  console.log("results", results);

  return (
    <>
      <div>{results.name}</div>
      <div>dd1d</div>
      <div>{results.description}</div>
    </>
  );
};

export default AboutPage;

import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div>Dashboard</div>
      <Button onClick={() => handleNavigation('/attain-co-po')}>Attain CO-PO</Button>
      <Button onClick={() => handleNavigation('/add-programme')}>Add a Programme</Button>
      <Button onClick={() => handleNavigation('/add-course')}>Add a Course</Button>
      <Button onClick={() => handleNavigation('/add-assessment-pattern')}>Add an Assessment Pattern</Button>
      <Button onClick={() => handleNavigation('/add-question-pattern')}>Add a Question Pattern</Button>
    </>
  );
}

export default Home;

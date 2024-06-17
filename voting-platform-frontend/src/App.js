import React, { useState } from "react";

import Container from "@mui/material/Container";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";

import Signup from "./components/Signup";
import SubmitExperience from "./components/SubmitExperience";
import SubmitIssues from "./components/SubmitIssue";
import Navbar from "./components/Navbar";
import FilterMenu from "./components/FilterMenu";
import ExperienceList from "./components/ExcerciseList";

function App() {
  const [filters, setFilters] = useState({});

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <Router>
      <Navbar />
      {/* <Header /> */}
      {/* <Container> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ExperienceList filters={filters} />
              <FilterMenu onApplyFilters={handleApplyFilters} />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/submit-experience" element={<SubmitExperience />} />
        <Route path="/submit-issue" element={<SubmitIssues />} />
      </Routes>
      {/* </Container> */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;

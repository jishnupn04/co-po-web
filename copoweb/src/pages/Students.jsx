import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

function Students() {
  const [programmes, setProgrammes] = useState([]);
  const [enrollmentYears, setEnrollmentYears] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [students, setStudents] = useState([]);

  // Fetch programmes and enrollment years on component mount
  useEffect(() => {
    const fetchProgrammesAndYears = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/programmes-enrollment/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProgrammes(data.programmes);
        setEnrollmentYears(data.enrollment_years);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProgrammesAndYears();
  }, []);

  // Fetch students when the button is clicked
  const fetchStudents = async () => {
    if (selectedProgramme && selectedYear) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/students/?programme_name=${selectedProgramme}&enrollment_year=${selectedYear}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  };

  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <h1>Students</h1>
      <FormControl fullWidth margin="normal" style={{ textAlign: "left" }}>
        <InputLabel>Programme</InputLabel>
        <Select
          value={selectedProgramme}
          onChange={(e) => setSelectedProgramme(e.target.value)}
          label="Programme"
          style={{ textAlign: "left" }}
        >
          {programmes.map((programme) => (
            <MenuItem key={programme} value={programme}>
              {programme}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" style={{ textAlign: "left" }}>
        <InputLabel>Enrollment Year</InputLabel>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          label="Enrollment Year"
          style={{ textAlign: "left" }}
        >
          {enrollmentYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={fetchStudents}>
        Fetch Students
      </Button>
      <div>
        {students.length > 0 && (
          <ul style={{ paddingLeft: "20px" }}>
            {students.map((student) => (
              <li key={student.student_id}>
                {student.first_name} {student.last_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Students;

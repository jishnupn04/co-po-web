import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Students() {
  const [programmes, setProgrammes] = useState([]);
  const [enrollmentYears, setEnrollmentYears] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assessmentPatterns, setAssessmentPatterns] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedAssessmentPattern, setSelectedAssessmentPattern] =
    useState("");
  const [showGrid, setShowGrid] = useState(false); // New state to control DataGrid visibility

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
        setCourses(data.courses);
        setAssessmentPatterns(data.assessment_patterns);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProgrammesAndYears();
  }, []);

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
        setShowGrid(true);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: "student_id", headerName: "Student ID", width: 150 },
    { field: "full_name", headerName: "Full Name", width: 300 },
  ];

  // Prepare rows for DataGrid
  const rows = students.map((student, index) => ({
    id: index + 1,
    student_id: student.student_id,
    full_name: `${student.first_name} ${student.last_name}`,
  }));

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
      <FormControl fullWidth margin="normal" style={{ textAlign: "left" }}>
        <InputLabel>Course</InputLabel>
        <Select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          label="Course"
          style={{ textAlign: "left" }}
        >
          {courses.map((course) => (
            <MenuItem key={course.course_id} value={course.course_id}>
              {course.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" style={{ textAlign: "left" }}>
        <InputLabel>Assessment Pattern</InputLabel>
        <Select
          value={selectedAssessmentPattern}
          onChange={(e) => setSelectedAssessmentPattern(e.target.value)}
          label="Assessment Pattern"
          style={{ textAlign: "left" }}
        >
          {assessmentPatterns
            .filter((pattern) => pattern.course === selectedCourse)
            .map((pattern, index) => (
              <MenuItem key={index} value={pattern.assessment_type}>
                {pattern.assessment_type}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={fetchStudents}>
        Fetch Students
      </Button>
      {showGrid && (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      )}
    </div>
  );
}

export default Students;

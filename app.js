const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const Student = [{ id: 1, name: "Ade", subject: "eng" }];
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.get("/student", (req, res) => {
  res.status(200).json({message: "Student Fetched sucessfully", Student});
});

app.post("/add", (req, res) => {
  const { name, subject } = req.body;

  const newData = {
    id: Student.length + 1,
    name: name,
    subject: subject,
  };

  Student.push(newData);
  res.status = 200;
  res.send(JSON.stringify({ message: "Student Added Successfully", Student }));
});

app.put("/update/:id", (req, res) => {
  try {
    const { id } = req.params;

    const studentIndex = Student.findIndex((item) => item.id === parseInt(id));

    if (studentIndex === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { name, subject } = req.body;

    Student[studentIndex] = {
      ...Student[studentIndex],
      name,
      subject,
    };

    res.status(200).json({
      message: "Student updated successfully",
      data: Student[studentIndex],
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
});

app.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;

    const studentIndex = Student.findIndex((item) => item.id === parseInt(id));


    if (studentIndex !== -1) {
      Student.splice(studentIndex, 1);
      return res.status(200).json({ message: "deleted successfully", Student });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
       res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is running", PORT);
});

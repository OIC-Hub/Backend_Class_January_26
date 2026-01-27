const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const Student = [{ id: 1, name: "Ade", subject: "eng" }];
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
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

app.put("/update/:id", (res, req) => {
  try {
    const { id } = req.params;
    const studentId = Student.findIndex((item) => item.id === parseInt(id));

    if (studentId === -1) {
    res.status(404).json({message: "Not found"})
    }

    const { name, subject } = req.body;

    Student[studentId] = {
      ...Student[studentId],
      name: name,
      subject: subject,
    };

    res.status(200).json({
      message: "Student Updated Successfully",
      Student,
    });
  } catch (error) {
    res.status(500).json({message: "Interal Server Error", error})
  }
});

app.listen(PORT, () => {
  console.log("server is running");
});

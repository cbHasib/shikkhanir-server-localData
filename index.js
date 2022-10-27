const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000;

const categoryData = require("./data/categoryData.json");
const allCoursesData = require("./data/allCoursesShowData.json");
const instructorData = require("./data/instructors.json");

app.get("/", (req, res) => {
  res.send("ShikkhaNir API is running");
});

app.get("/courses", (req, res) => {
  if (allCoursesData.length > 0) {
    res.json({
      status: true,
      code: 200,
      data: allCoursesData,
    });
  } else {
    res.json({
      status: false,
      code: 404,
      data: [],
    });
  }
});

app.get("/category/:id", (req, res) => {
  const id = req.params.id;

  let currentCategoryData = [];

  if (id == 0) {
    currentCategoryData = allCoursesData;
  } else {
    currentCategoryData = allCoursesData.filter(
      (course) => course.cat_id == id
    );
  }

  if (currentCategoryData.length > 0) {
    res.json({
      status: true,
      code: 200,
      data: currentCategoryData,
    });
  } else {
    res.json({
      status: false,
      code: 404,
      data: [],
    });
  }
});

app.get("/categories", (req, res) => {
  if (categoryData.length > 0) {
    res.json({
      status: true,
      code: 200,
      data: categoryData,
    });
  } else {
    res.json({
      status: false,
      code: 404,
      data: [],
    });
  }
});

app.get("/instructor/:id", (req, res) => {
  const id = req.params.id;

  const instructor = instructorData.find((person) => person.id == id);
  console.log(instructor);

  if (instructor) {
    res.json({
      status: true,
      code: 200,
      data: instructor,
    });
  } else {
    res.json({
      status: false,
      code: 404,
      data: {},
    });
  }
});

app.listen(port, () => {
  console.log("ShikkhaNir server is running on port:", port);
});

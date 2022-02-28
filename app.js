const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRoutes");
const app = express();

const dbURI =
  "mongodb+srv://aakashsivakumar02:25340210Mongodb!@cluster0.yadj7.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((res) => {
    app.listen(3000);
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

// app.use((req,res,next)=>{
//     console.log('new request made ');
//     console.log('hostname : ',req.hostname);
//     console.log('path : ',req.path);
//     console.log('method : ',req.method);
//     next();
// })

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//sandbox db
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "my new blog title 2",
//     snippet: "my blog snippet",
//     body: "blog body",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("621d2a5469cd9176b667fc26")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRouter);

// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// })

app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});

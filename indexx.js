const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname, "public")));

let posts=[
{
    id:uuidv4(),
    username : "NIT Trichy",
    content : "One Of The Best NIT In India",
},
{  
    id:uuidv4(),
    username : "Vellore Institute Of Technology",
    content : "Best College For Post Graduation",
},
{   
    id:uuidv4(),
    username : "IIT Delhi",
    content : "IIT Been a Top Universities of the World ",
},
];

app.get("/posts",(req,res) =>{
    res.render("homee.ejs",{posts});
});

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
});

app.post("/posts",(req,res) =>{
    let id=uuidv4();
    let { username, content } =req.body;
    posts.push({ id,username , content}); 
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let post=posts.find((p) =>id==p.id);
    res.render("show.ejs" ,{post});  
});

app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newContent =req.body.content;
    let post=posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res) =>{
    let {id} = req.params;
    let post=posts.find((p) =>id === p.id);
    res.render("edit.ejs" , {post});  
});

app.delete("/posts/:id",(req,res) =>{
    let {id} = req.params;
    posts=posts.filter((p) =>id !== p.id);
    res.redirect("/posts");
});


app.listen(port,()=>{
    console.log("listening on port 8080");
});

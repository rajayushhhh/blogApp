import express from "express";
const app = express();
const port = 3001;


let posts = [];



function Post(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}


function deletePost(index) {
    posts.splice(index, 1);
}

function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));



app.get("/", (req, res) => {
    res.render("home.ejs", {posts: posts});
});


app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});


app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});


app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});


app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});


app.get("/create", (req, res) => {
    res.render("create.ejs");
});


app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});



app.listen(port, () => {
    addPost("The Bluetooth Blunder", `I was nervously waiting for my date, Ishika, at a cozy café. To impress her, I planned to play some cool music by connecting my phone to the café’s Bluetooth speakers. Instead, I accidentally played my embarrassing voice notes titled Reasons Ishika Is Amazing. My own voice blasted out, She has the most beautiful smile, uh, like, really beautiful. Ishika burst out laughing, calling it sweet and ridiculous. I groaned, trying to hide my embarrassment. But Ishika smiled and admitted, For what it’s worth, you’re amazing too. Somehow, my most awkward moment turned into something special.\n`);
    addPost("The Great Cookie Caper", `I was baking cookies for my school bake sale when my dog, Max, snatched the tray and ran off. I chased him through the neighborhood, yelling, “Stop, thief!” Max led me to a park where kids were playing. He dropped the tray at their feet, wagging his tail. The kids cheered, “Cookies!” and bought them all. I was stunned. Max had turned my baking disaster into a success. I sold out in minutes and donated the money to the local animal shelter. Max got a hero’s welcome, and I learned that sometimes, a little chaos can lead to something wonderful.\n`);
   
    console.log(`Breaking News: Our site is live at Port ${port}`)
})




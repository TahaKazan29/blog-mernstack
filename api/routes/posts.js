const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json({ data: savedPost, message: "İlanınız paylaşıldı" });
        }
        catch (err) {
            res.status(500).json(err);
        }
})

//UPDATE POST
router.put("/:id", async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if(post.username === req.body.username){
                try {
                    const updatedPost = await Post.findOneAndUpdate(req.params.id,{
                        $set:req.body
                    },{new:true});
                    res.status(200).json({data:updatedPost,message: "İlanınız güncellendi" });
                }
                catch (err) {
                    res.status(500).json(err);
                }
            }
            else {
                res.status(401).json({ message: "Sadece kendi ilanınızı güncelleyebilirsiniz!"});
            }
        } catch (err) {
            res.status(500).json(err);
        }
})

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const deletedPost = await post.delete();
                res.status(200).json({data:deletedPost,message: "İlanınız silindi" });
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json({ message: "Sadece kendi ilanınızı silebilirsiniz!"});
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }
        else if (catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }
        else {
            posts = await Post.find();
        }
        res.status(200).json({data:posts})
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET POST
router.get("/:id", async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json({data:post})
        } catch (err) {
            res.status(500).json(err);
        }
})


module.exports = router
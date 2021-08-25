const router = require("express").Router();
const User = require("../models/User");
const Category = require("../models/Category");

//CREATE CATEGORY
router.post("/", async (req, res) => {
    const newCategory = new Category(req.body);
        try {
            const savedCategory = await newCategory.save();
            res.status(200).json({ data: savedCategory, message: "Kategori eklendi" });
        }
        catch (err) {
            res.status(500).json(err);
        }
})

//GET ALL CATEGORY 
router.get("/", async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json({data:cats})
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router
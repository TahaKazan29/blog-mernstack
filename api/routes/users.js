const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json({ data: updatedUser, message: "Güncelleme başarılı" });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(401).json({ message: "Sadece kendi hesabınızı güncelleyebilirsiniz!" })
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: "Hesabınız silindi" });
            }
            catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json({message:"Kullanıcı bulunamadı!"});
        }

    }
    else {
        res.status(401).json({ message: "Sadece kendi hesabınızı silebilirsiniz!" })
    }
})

//GET USER
router.get("/:id", async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const {password,...others} = user._doc;
            res.status(200).json({data:others})
        } catch (err) {
            res.status(500).json(err);
        }
})
module.exports = router
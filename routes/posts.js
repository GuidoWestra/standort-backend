const router = require("express").Router();
const Post = require("../models").post;
const auth = require("../auth/middleware");
// For all requests related to posts

// GET /posts

// POST /posts
router.post("/", auth, async (req, res, next) => {
  // for later: picture, votes, location
  const { title, message, tags, location, picture} = req.body;
  const userId = req.user.id;
  try {
    const newPost = await Post.create({
      userId,
      title,
      message,
      tags,
      location,
      picture
    });
    res.send({ ...newPost.dataValues, user: req.user });
  } catch (e) {
    console.log(`[posts]sequelize error: ${e.message}`);
    next(e);
  }
});

module.exports = router;

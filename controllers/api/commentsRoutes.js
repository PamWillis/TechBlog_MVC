const express = require('express');
const router = express.Router();
const { User, Blog, Comments } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
  try {
    // Get the comment data from the request body
    // const { remark, blogId } = req.body;
console.log(req)
    // Create the comment in the database
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
    });
console.log(newComment)
    // Redirect the user back to the blog page
    res.redirect(`/blogs/${blogId}`);
  } catch (err) {
    // Handle any errors with a 500 response
    res.status(500).json(err);
  }
});
  
  module.exports = router;
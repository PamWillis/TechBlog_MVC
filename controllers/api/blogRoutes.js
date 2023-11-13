const express = require('express');
const router = express.Router();
const { User, Blog } = require('../../models')
const withAuth =  require('../../utils/auth')

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// --------------------------------------------------
//post to the homepage
router.post("/", async (req, res) => {
  const user_id = req.session.user_id;
  const { heading, comment } = req.body;

  try {
    const currentTime = new Date(); // Get the current date and time
    const timestamp = currentTime.toISOString(); // Convert the date and time to a string format

    const postData = await Post.create({
      heading,
      comment,
      user_id,
      timestamp, 
    });

    res.status(200).json(postData);
  } catch (err) {
    console.error('Error creating blog post:', err);
    res.status(400).json(err);
  }
});

// --------------------------------------------------
//router asked if logged in before allowing to delete
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json(blogData, + "Blog has been deleted");
  } catch (err) {
    res.status(500).json("Could not find blog");
  }
});

router.get('/blog', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/blog');
    return;
  }

  res.render('home');
});

module.exports = router;

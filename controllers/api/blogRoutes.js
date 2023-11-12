const express = require('express');
const moment = require('moment');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User'); // Import the User model

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
router.post('/create', async (req, res) => {
  try {
    const { heading, comment, date } = req.body;
    const userId = req.session.user_id;

    // Retrieve the user based on the user_id
    const user = await User.findByPk(userId);
    // If the user exists, create a new blog post associated with that user
    if (user) {
      // Parse the date string using Moment.js
      const parsedDate = moment(date, 'DD/MM/YYYY', true);

      // Check if the date is valid
      if (parsedDate.isValid()) {
        // Create a new blog post with the parsed date
        const newBlog = await Blog.create({
          heading,
          comment,
          date: parsedDate.toDate(),
          // Associate the blog post with the user
          user: user,
        });
      
        console.log(newBlog);
        res.status(200).json(newBlog);
      } else {
        res.status(400).json({ message: 'Invalid date format' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
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

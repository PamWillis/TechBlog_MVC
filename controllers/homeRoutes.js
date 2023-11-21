const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // console.log(blogs)
    // Pass serialized data and session flag into template
    res.render('home', {
    style: 'home.css',
      blogs,
      logged_in: req.session.logged_in
      
    });
  } catch (err) {
    
    res.status(500).json(err);
  }
});

// --------------------------------------------------
//get blog by user id (title on blog/dashboard page)
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blogview', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// __________________________________________________________________
// Use withAuth middleware to prevent access to route
router.get('/blog', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
   

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    
    res.status(500).json(err);
  }
});
//__________________________________________________________________
// Use withAuth middleware to prevent access to route (get blog info to render update page)
router.get('/update/:blogId', withAuth, async (req, res) => {
  try {
    // Fetch the item from the database using the ID from the URL parameter
    const blogData = await Blog.findByPk(req.params.blogId, {
      // Include related user data (for example, the user who created the item)
      include: [{ model: User, attributes: ['name'] }], // Adjust attributes as needed
    });

    // Check if the item was found
    if (blogData) {
      // Convert the item data to a plain format for the template
      const blog = blogData.get({ plain: true });

      // Render the 'edit' page with the item data and logged-in status
      res.render('update', { 
        blog,
        logged_in: req.session.logged_in 
      });
    } else {
      // If the item is not found, send a 404 response
      res.status(404).send('blog not found');
    }
  } catch (err) {
    // Handle any errors with a 500 response
    res.status(500).json(err);
  }
});
//__________________________________________________________________
//use to render comment form
router.get('/comments/:blogId', withAuth, async (req, res) => {
  try {
    // Fetch the blog from the database using the ID from the URL parameter
    const blogData = await Blog.findByPk(req.params.blogId);

    // Check if the blog was found
    if (blogData) {
      // Convert the blog data to a plain format for the template
      const blog = blogData.get({ plain: true });

      // Render the comment form page with the blog data and logged-in status
      res.render('comments', { blog, logged_in: req.session.logged_in });
    } else {
      // If the blog is not found, send a 404 response
      res.status(404).send('Blog not found');
    }
  } catch (err) {
    // Handle any errors with a 500 response
    res.status(500).json(err);
  }
});

//__________________________________________________________________
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});



module.exports = router;

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

    res.render('update', {
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
router.get('/update', withAuth, async (req, res) => {
  try {
    const userData = await Blog.findByPk(req.params.user_id, {
      attributes: { exclude: ['password'] },
      include: [{model: Blog}],
    });

    const user = userData.get({ plain: true });

    res.render('update', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    
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

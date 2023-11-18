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
//get blog by user id
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

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//__________________________________________________________________
// Use withAuth middleware to prevent access to route
router.get('/blog', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('blog', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    
    res.status(500).json(err);
  }
});
//__________________________________________________________________
// bet blog id info and post to blog\id
router.get('/blog/:id', (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'heading',
              'content',
              'created_at'
          ],
      })
      consolelog(err)
      .then(dbPostData => {
          if (!dbPostData) {
            consolelog(err)
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          const post = dbPostData.get({ plain: true });
      
          res.render('update')


      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

//_____________________________________________________________________

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/blog');
    return;
  }

  res.render('login');
});






module.exports = router;

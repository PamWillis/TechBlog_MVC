const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

//router asked if logged in before allowing to create
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json("Please login to create a blog");
  }
});

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
    res.status(500).json(err);
  }
});

module.exports = router;

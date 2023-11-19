const express = require('express');
const router = express.Router();
const { User, Blog, Comments } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/:id', withAuth, async (req, res) => {
    const blog_id = req.params.id;
    const { Comments } = req.body;
  
    try {
      const commentsData = await Comments.create(
        { remark },
        { where: { id: blog_id } }
  
      );
  
      console.log(commentsData)
      res.status(200).json(commentsData);
    } catch (err) {
  
      res.status(400).json(err);
    }
  });
  
  module.exports = router;
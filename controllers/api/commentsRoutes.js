const express = require('express');
const router = express.Router();
const { User, Blog, Comments } = require('../../models')
const withAuth = require('../../utils/auth')

//post to the homepage
router.post('/comments', withAuth, async (req, res) => {
  const user_id = req.session.user_id;
  const { remark } = req.body;
  console.log(user_id)
  try {
    const commentsData = await Comments.create({
      remark,
      user_id: req.session.user_id,

    });
    console.log(commentsData)
    res.status(200).json(commentsData);
  } catch (err) {

    res.status(400).json(err);
  }
});
module.exports = router;
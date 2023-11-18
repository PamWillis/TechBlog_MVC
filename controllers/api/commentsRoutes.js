//post to the homepage
router.post('/comments', async (req, res) => {
    const user_id = req.session.user_id;
    const { blog_id} = req.body;
  
    try {
      const commentsData = await Comments.create({
       remark,
       blog_id: blog_id,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(commentsData);
    } catch (err) {
  
      res.status(400).json(err);
    }
  });
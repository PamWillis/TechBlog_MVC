const newCommentHandler = async (event) => {
  try {
    event.preventDefault();

    const comments = document.querySelector('#comments-remark').value.trim();

    const commentData = {
      remark: remark
    };


    const response = await fetch(`/api/comments/${blogID}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (response.ok) {
      console.log('Comment post created successfully:', commentData);
      document.location.replace('/blog/:id');
    } else {
      console.error('Failed to create comment:', response.status, response.statusText);
      alert('Failed to create comment');
    }
  } catch (error) {
    console.error('Error in newCommentHandler:', error);
    alert('An error occurred while processing the form');
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);



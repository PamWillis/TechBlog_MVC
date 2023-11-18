const newCommentHandler = async (event) => {
    try {
    const comments = document.querySelector('#comments-remark').value.trim();

    const commentData = {
        remark: remark
    };


    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        remark: {
            'Content-Type': 'application/json',
        },
    });


    if (response.ok) {
        console.log('Comment post created successfully:', commentData);
        document.location.replace('/');
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

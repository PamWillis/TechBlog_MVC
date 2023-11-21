const commentForm = document.querySelector('.comment-form');
commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get the comment text and blog ID from the form
  const remark = commentForm.querySelector('textarea[name="remark"]').value;
  const blogId = commentForm.querySelector('input[name="blogId"]').value;

  try {
    // Send a POST request to the server to add the comment
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ remark, blogId }),
      headers: { 'Content-Type': 'application/json' },
    });
console.log(response)
    if (response.ok) {
      // Refresh the page to show the new comment
      document.location.reload();
    } else {

      // Handle any errors with an alert
      alert('Failed to add thiscomment');
    }
  } catch (err) {
    // Handle any errors with an alert
    alert('Failed to add mycomment');
    console.log(err)

  }
});

document.querySelector('#remark').addEventListener('submit', (e) => {
  e.preventDefault();
});

const newFormHandler = async (event) => {
  try {
    event.preventDefault();
    
    const user_id = req.session.user_id;

    const heading = document.querySelector('#blog-heading').value.trim();
    const comment = document.querySelector('#blog-comment').value.trim();
    const currentTime = new Date();
    const timestamp = currentTime.toISOString();
    const date = new Date("Sun Nov 12 2023 16:57:42 GMT-0500 (Eastern Standard Time)");
    const shortenedDate = date.toDateString();
    
    const postData = {
      heading: heading,
      comment: comment,
      user_id: user_id,
      timestamp: shortenedDate
    };

    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Blog post created successfully:', postData);
      document.location.replace('/');
    } else {
      console.error('Failed to create blog:', response.status, response.statusText);
      alert('Failed to create blog');
    }
  } catch (error) {
    console.error('Error in newFormHandler:', error);
    alert('An error occurred while processing the form');
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/blogs/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/home');
//     } else {
//       alert('Failed to delete blog');
//     }
//   }
// };





// document
//   .querySelector('.blog-list')
//   .addEventListener('click', delButtonHandler);
const newFormHandler = async (event) => {
  event.preventDefault();


  const heading = document.querySelector('#blog-heading').value.trim();
  const comment = document.querySelector('#blog-comment').value.trim();
  const currentTime = new Date(); // Get the current date and time
  const timestamp = currentTime.toISOString(); // Convert the date and time to a string format
  const date = new Date("Sun Nov 12 2023 16:57:42 GMT-0500 (Eastern Standard Time)");
  const shortenedDate = date.toDateString();
  // Include the timestamp when submitting the blog post
  const postData = {
    heading: heading,
    comment: comment,
    timestamp: timestamp
  };

  // Make the POST request
  const response = await fetch(`/api/blogs`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',

    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to create blog');
  }
};

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



document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.blog-list')
//   .addEventListener('click', delButtonHandler);


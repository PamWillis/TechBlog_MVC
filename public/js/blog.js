const newFormHandler = async (event) => {
  event.preventDefault();


  const heading = document.querySelector('#blog-heading').value.trim();
  const comment = document.querySelector('#blog-comment').value.trim();
  const user_name = await getuserData();

  if (heading && user_name && customer) {
    const requestBody = {
      heading,
      user_name,
      comment
      
    };

    // Make the POST request
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
    
      },
    });

    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert('Failed to create blog');
    }
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


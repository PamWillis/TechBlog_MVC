const newFormHandler = async (event) => {
  try {
    event.preventDefault();

    const heading = document.querySelector('#blog-heading').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    const blogData = {
      heading: heading,
      content: content,
    
    };
  
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify(blogData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Blog post created successfully:', blogData);
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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('blog-id')) {
    const id = event.target.getAttribute('blog-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/blog');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

  document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);

const updateFormHandler = async (event) => {
  try {
    event.preventDefault();

    const heading = document.querySelector('#blog-heading').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    const blogData = {
      heading: heading,
      content: content,
    
    };
  
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Blog put updated successfully:', blogData);
      document.location.replace('/blog');
    } else {
      console.error('Failed to update blog:', response.status, response.statusText);
      alert('Failed to update blog');
    }
  } catch (error) {
    console.error('Error in updateFormHandler:', error);
    alert('An error occurred while processing the form');
  }
};

document
  .querySelector('.update-blog-form')
  .addEventListener('submit', updateFormHandler);
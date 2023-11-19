const updateFormHandler = async (event) => {
  
  try {
    
    event.preventDefault();

    const heading = document.querySelector('#blog-heading').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    const blogID = document.querySelector('input[name="blogID"]').value.trim();
    alert('$blogID', blogID)
    const blogData = {
      
      heading: heading,
      content: content,

    };
    console.log(blogID)
    const response = await fetch(`/api/blogs/${blogID}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('after request')
    document.location.replace('/blog');

  } catch (error) {
    console.error('Error in updateFormHandler:', error);
    alert('An error occurred while processing the form');
  }
};

document
  .querySelector('.update-blog-form')
  .addEventListener('submit', updateFormHandler);
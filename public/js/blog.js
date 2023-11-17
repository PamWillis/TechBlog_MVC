const newFormHandler = async (event) => {
  try {
    event.preventDefault();

    const heading = document.querySelector('#blog-heading').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    const date = new Date("Sun Nov 12 2023 16:57:42 GMT-0500 (Eastern Standard Time)");


    const blogData = {
      heading: heading,
      content: content,
      date: date

    };
    console.log("TWO")
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

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

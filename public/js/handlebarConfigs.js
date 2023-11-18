const Handlebars = require('handlebars');

// Register the partial
Handlebars.registerPartial('singleBlog', '<section>{{blog.id}} ... </section>');
const Handlebars = require('handlebars');

// Register the partial
Handlebars.registerPartial('singleBlog', '<section>{{blog.id}} ... </section>');
Handlebars.registerPartial('addComment', '<section>{{blog.id}} ... </section>');
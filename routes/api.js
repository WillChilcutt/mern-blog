const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');

router.get('/', (request, response) => 
{
    
    BlogPost.find({ })
        .then ((data) => 
        {
            response.json(data);
        })
        .catch((error) => 
        {
            console.log(`Error finding blog post: ${ error}`);
        })
});

router.post('/save', (request, response) =>
{
    console.log('Body: ', request.body);

    const data = request.body;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) =>
    {
        if (error)
        {
            response.status(500).json({message: `Error saving the blog post: ${error}`});
            return;
        }
        else
        {
            response.json(
            {
                message:`Blog post named ${newBlogPost.title} created successfully!`   
            });
        }
    });
});

module.exports = router;
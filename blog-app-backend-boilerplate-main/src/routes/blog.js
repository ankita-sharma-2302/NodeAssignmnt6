const router = require('express').Router();
const Blogs = require('../models/Blog')
const express= require("express");
const {validationResult } = require('express-validator');
// const { query } = require('express');

// Your routing code goes here
router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.get('/blog',async(req,res)=>{
    // res.json({ok:'blog'})
    // console.log(req.query)
    const {page,search}= req.query;
    const users= await Blogs.find({topic:search}).limit(5).skip((page -1) * 5);
    res.json({
        status: "Success",
        users: users
    })
})

router.post("/blog" , async (req, res) => {
    // Write the code for fetch
// console.log(req.body)
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const users = await Blogs.create(req.body);
        res.json({
            status: "Success",
            users
        })

    }catch(e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
    // try {
    //     const data= new Blogs({
    //         topic:req.body.topic,
    //         description:req.body.description,
    //         posted_by:req.body.posted_by
    //     })
    //     const result= await data.save()
    //     res.json({
    //         status: "Success",
    //         result: result
    //     })

    // }catch(e) {
    //   console.log(e)
    // }

});

// update data 

router.put("/posts/:postId ", async (req, res) => {
    try {
        console.log(req.query);
        const users = await Blogs.updateOne({_id: req.params.id}, req.body);
        res.json({
            status: "Success",
            users
        })

    }catch(e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
    // try {
    //     const data= req.body;
    //     await Blog.findByIdAndUpdate(req.params.id,data)
    //     const result= await Blogs.find(req.params.id)
    //     res.json({
    //         status: "Success",
    //         result:result
    //     })

    // }catch(e) {
    //   console.log(e)
    // }

});

// Create data 
router.delete("/blog/:id", async (req, res) => {
    // Write the code for fetch
    try {
        const users = await Blogs.deleteOne({_id: req.params.id});
        res.json({
            status: "Success",
            users
        })

    }catch(e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
    // try {
    //     const result = await Blogs.deleteOne({_id: req.params.id});
    //     res.json({
    //         status: "Success",
    //         result: result
    //     })

    // }catch(e) {
    //    console.log(e)
    // }

});




module.exports = router;
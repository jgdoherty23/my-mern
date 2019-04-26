const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");


// @route   GET api/items
// @desc    Get all items
// @access  Public
// Use router instead of app because in different file
router.get("/", (req, res) =>
{
    Item.find() // mongoose gives find method
        .sort({ date: -1 }) // mongoose gives sort method, -1 indicates descending
        .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create an item
// @access  Public
router.post("/", (req, res) =>
{
    // Use mongoose Schema we created in other file
    const newItem = new Item({
        name: req.body.name
    });

    // mongoose Schema has save function
    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public
// :id is a placeholder for whatever we want to pass in for id
router.delete("/:id", (req, res) =>
{
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        // 404 is not found error
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
/********************************************************************************** 
 * ITE5315 – Assignment 4* I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * * No part of this assignment has been copied manually or electronically from any other source
 * * (including web sites) or distributed to other students.
 * ** Name: __Bhupinder Singh Virdi__ Student ID: _N01435365__ Date: _11/23/22__
 * **********************************************************************************/

// load mongoose since we need it to define a model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
EmpSchema = new Schema({
    _id: Number,
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String,
    authors: Array,
    categories: Array
});
module.exports = mongoose.model("Employee", EmpSchema);
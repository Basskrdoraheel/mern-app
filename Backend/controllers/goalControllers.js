const asyncHandler = require("express-async-handler");



// @desc Getgoals 
// @route GET /api/goals 
// @access Private
const getGoals = asyncHandler( async (req,res)=>{
    res.status(200).json({message:"Get Goals"})
})


// @desc Setgoal 
// @route POST /api/goals 
// @access Private
const setGoal = asyncHandler(  async (req,res)=>{
    // console.log(req.body)
    if(!req.body.text){
         res.status(400)
         throw new Error("please add a text field")
    }
    res.status(200).json({message:"Set Goals"})
})
// @desc Updategoals 
// @route PUT /api/goals 
// @access Private
const updateGoal = asyncHandler( async (req,res)=>{
    res.status(200).json({message:"Update Goals"})
})
// @desc Deletegoals 
// @route DELETE /api/goals 
// @access Private
const deleteGoal = asyncHandler(  async (req,res)=>{
    res.status(200).json({message:"Delete Goals"})
})


module.exports = {getGoals,updateGoal,deleteGoal,setGoal}
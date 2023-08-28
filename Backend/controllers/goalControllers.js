const asyncHandler = require("express-async-handler");
const Goal = require('../model/goalModel');


// @desc Getgoals 
// @route GET /api/goals 
// @access Private
const getGoals = asyncHandler( async (req,res)=>{
    // console.log(Goal);
    const goals = await Goal.find()
    res.status(200).json(goals)
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

    const goal = await Goal.create({
        text: req.body.text,
    })
    res.status(200).json(goal)
})
// @desc Updategoals 
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler( async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        throw new Error('No such goal found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    })
    res.status(200).json(updatedGoal)
})
// @desc Deletegoals 
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(  async (req,res)=>{

    const goal = await Goal.findById(req.params.id)
    if (!goal ) {
        throw new Error ('no such goal found ')
    }
   await goal.deleteOne();
    res.status(200).json({id:req.params.id})
})


module.exports = {getGoals,updateGoal,deleteGoal,setGoal}
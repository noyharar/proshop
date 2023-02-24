import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js"

// @desc    Auth user & get token
// @route   POST /users/login
// @access  Public
const authUser = asyncHandler(async (req, res) =>  {
    const {email, password} = await req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error("Invalid email or password")
    }
});

// @desc    Post Register new user profile
// @route   POST /users
// @access  Pablic
const registerUser = asyncHandler(async (req, res) =>  {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }
    let user = await User.create({name, email, password})
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("invalid user's data")
    }

});

// @desc    Get user profile
// @route   GET /users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) =>  {
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(401);
        throw new Error("Invalid email or password")
    }
});

// @desc    Update user profile
// @route   PUT /users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) =>  {
    const user = await User.findById(req.user._id);
    if(user){
        user.name =  req.body.name || user.name;
        user.email = req.body.email ||user.email;
        if(req.body.password){
            user.password = req.body.password
        }
        const updateUser = await user.save();
        console.log(user.name)
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        });
    }else{
        res.status(404);
        throw new Error("User not found")
    }
});

// @desc   Get all users
// @route  GET /users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req, res) =>  {
    const user = await User.findById(req.params.id);

    if(user){
        await user.remove()
        res.json({message: 'User removed'});
    }else{
        res.status(404);
        throw new Error("User not found")
    }
});


// @desc   Get user by id
// @route  GET /users/:id
// @access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error("User not found")
    }
});

// @desc    Update user
// @route   PUT /users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});

export {authUser, registerUser,getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}
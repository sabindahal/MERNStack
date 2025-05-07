const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getPosts = async (req, res) => {
  const { filter } = req.query;
  let posts = await Post.find();
  if (filter === 'popular') posts.sort((a, b) => b.listOfUsersWaved.length - a.listOfUsersWaved.length);
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

exports.addPost = async (req, res) => {
  const { title, content } = req.body;
  const imageName = req.file ? req.file.filename : '';
  const post = new Post({
    title,
    content,
    imageName,
    userID: req.user.id,
    listOfUsersWaved: [],
  });
  await post.save();
  res.status(201).json(post);
};

exports.editPost = async (req, res) => {
  const { title, content } = req.body;
  const imageName = req.file ? req.file.filename : undefined;
  const update = { title, content };
  if (imageName) update.imageName = imageName;
  const post = await Post.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(post);
};


exports.wavePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const userId = new mongoose.Types.ObjectId(req.user.id);

  // 如果用户已 wave，则取消 wave；否则添加 wave
  const index = post.listOfUsersWaved.findIndex(id => id.equals(userId));
  if (index === -1) {
    post.listOfUsersWaved.push(userId);
  } else {
    post.listOfUsersWaved.splice(index, 1);
  }

  await post.save();

  res.json({
    message: index === -1 ? 'Waved!' : 'Unwaved!',
    count: post.listOfUsersWaved.length
  });
};

exports.getWavers = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('listOfUsersWaved', 'email');
  res.json(post.listOfUsersWaved);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  if (req.user.isAdmin || req.user.id === post.userID.toString()) {
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } else {
    res.status(403).json({ error: 'Not authorized' });
  }
};

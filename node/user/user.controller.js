'use strict'
const db = require('../models');

// middleware
const checkIDInput = function (req, res, next) {
  if(req.params.id === '') {
    console.log('Invalid ID supplied', req.params.id);
    res.status(400).json('Invalid ID supplied');
  } else {
    next();
  }
};
const checkIDExist = function (req, res, next) {
  db.User.count({ where: { id: req.params.id } }).then(count => {
    if (count !== 0) {
      next();
    } else {
      res.status(400).json('Index not found');
    }
  });
};
const checkLastNameInput = function (req, res, next) {
  //console.log('Check ID input');
  if(req.params.lastname === '') {
    console.log('Invalid ID supplied', req.params.lastname);
    res.status(400).json('Invalid ID supplied');
  } else {
    next();
  }
};
const checkLastNameExist = function (req, res, next) {
  //console.log('Check ID exist');
  db.User.count({ where: { lastName: req.params.lastname } }).then(count => {
    if (count !== 0) {
      next();
    } else {
      //console.log('Book not found');
      res.status(400).json('Index not found');
    }
  });
};

// controller functions
const getAllUsers = (req, res, next) => {
  db.User.findAll({ include: ["bookings"] }).then(users => {
    res.set('Access-Control-Expose-Headers', 'Content-Range')
    res.set('Content-Range', users.length);
    res.status(200).json(users)
  })
}

const getUser = async (req, res, next) => {
  const user = await db.User.findAll({
    include: ["bookings"],
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(user[0])
}

const getUsersByLastname = async (req, res) => {
  const users = await db.User.findAll({
    include: ["bookings"],
    where: {
      lastName: req.params.lastname
    }
  })
  res.set('Access-Control-Expose-Headers', 'Content-Range')
  res.set('Content-Range', users.length);
  res.status(200).json(users)
}

const createUser = async (req, res) => {
  let errors=[]
  if (!req.body.firstName){
    errors.push("No firstName specified");
  }
  if (!req.body.lastName){
    errors.push("No lastName specified");
  }
  if (!req.body.email){
    errors.push("No email specified");
  }
  if (!req.body.birthday){
    errors.push("No birthdate specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email : req.body.email,
    birthday: req.body.birthday,
  }

  try {
    const user = await db.User.create(newUser);
    res.status(200).json(user);
  } catch (e) {
    res.status(405).json('Error Occurred in Creating Index!');
  }
}

const updateUser = async (req, res) => {
  let updatedUser= {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email : req.body.email,
    birthday: req.body.birthday,
  }

  try {
    const user = await db.User.update(updatedUser,{
      where: {
        id: req.params.id
      }
    } );
    res.status(200).json(user);
  } catch (e) {
    res.status(405).json('Error Occurred in Updating Index!');
  }
}

const deleteUser = (req, res) => {
  db.User.destroy({
    where: { id: req.params.id }
  }).then(result => {
    res.status(200).json(result);
  });
}

module.exports = {
  getAllUsers,
  getUser,
  getUsersByLastname,
  createUser,
  updateUser,
  deleteUser,
  checkIDInput,
  checkIDExist,
  checkLastNameExist,
  checkLastNameInput
}
const { createUserAuth, createUserDetails, getUserById, getUserByEmail,  getAllUsersDetails, updateToVerify, getUserDetailsByEmail, getUserByHostelId } = require('../DB/user');
const db = require('../config/db-config')
const fs = require('fs')
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const uploadId = async (req, res) => {
  const owner = 'vivekjpatil1357'; // Replace with your GitHub username
  const repo = 'images'; // Replace with your repository name
  const token = process.env.ACCESS_TOKEN_GITHUB; // GitHub token
  const filePathInRepo = 'images'; // Folder in the repo to store image

  try {
    if (!req.file) {
      return res.status(400).send('No image uploaded.');
    }

    // req.file.buffer holds the file data when using memoryStorage
    const fileBase64 = req.file.buffer.toString('base64');

    const response = await axios.put(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePathInRepo}/${Date.now()}.jpg`,
      {
        message: 'Add new image',
        content: fileBase64,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const downloadUrl = response.config.url || "No URL found from GitHub.";
    console.log("url", downloadUrl);
    console.log(response.config.url);


    res.status(200).json({ msg: 'Image uploaded successfully to GitHub!', url: downloadUrl });
  } catch (error) {
    console.error('Error uploading image:', error.response ? error.response.data : error.message);
    res.status(500).json({ msg: 'Error uploading image.' });
  }
};

const getImage = async (req, res) => {
  const { url } = req.body
  console.log(url);

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_GITHUB}`,
    },
  }).then((response) => response.json())
    .then((data) => {
      console.log("response", data);

      return res.json({ downloadUrl: data.download_url })
    })
    .catch((error) => {
      console.log("error in getimage", error);

    })

}

const isRegistered = async (req, res) => {
  const { email } = req.body
  console.log(email);
  getUserDetailsByEmail(email)
    .then((user) => {
      if (user)
        return res.json({ status: true, user })
      else
        return res.json({ status: false })
    })
    .catch((err) => {
      return res.json({ status: false, error: err })
    })
}

const isVerified = async (req, res) => {
  const { email } = req.body
  try {
    const user = await getUserDetailsByEmail(email)
    console.log(user);
    if (user?.verificationStatus) {
      return res.json({ status: true, user })
    }
    else {
      return res.json({ status: false })
    }
  } catch (error) {
    return res.json({ status: false, error })
  }
}
const isValidHostelId = async (req, res) => {
  const { hostelId } = req.body
  const user = await getUserByHostelId(hostelId)
  if (user)
    return res.json({ status: true, user })
  return res.json({ status: false })
}

const userByEmail = async (req, res) => {
  const email = req.body.email
  getUserByEmail(email).then((data) => {
    return res.json({ status: true, user: data })
  })
    .catch((err) => {
      return res.json({ status: false, error: err })
    })

}
const storeUserAuthInDb = async (req, res) => {
  const user = req.body;
  if (!user) {
    return res.status(400).json({ message: "Invalid data" });
  }
  const newUser = {
    ...user,
    creationDateTime: new Date()
  }
  await createUserAuth(db, newUser)
  res.json({ message: "User stored in DB" })
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersDetails()
    return res.json({ status: true, users })
  } catch (error) {
    return res.json({ status: false, error })
  }
}

const userById = async (req, res) => {
  const { uuid } = req.body
  getUserById(uuid).then((user) => {
    console.log(user);

    if (user)
      return res.json({ status: true, user })
    return res.json({ status: false })

  }).catch((error) => {
    return res.json({ status: false, error })
  })
}

const userVerify = async (req, res) => {
  const { id } = req.body
  console.log("id",id);
  try {
    const user = await updateToVerify(id)
    console.log("user is",user);
    return res.json({ status: true, user })
    
  } catch (error) {

    return res.json({status:false,error})
  }
}

const storeUserDetailsInDb = async (req, res) => {
  const user = req.body;
  if (!user) {
    return res.status(400).json({ message: "Invalid data" });
  }
  const newUser = {
    ...user,
    requestTime: new Date()
  }
  const result = await createUserDetails(db, newUser)
  return res.json(result)
}
module.exports = { storeUserAuthInDb, userVerify,isVerified, getImage, getAllUsers, storeUserDetailsInDb, isValidHostelId, uploadId, userByEmail, isRegistered, userById }
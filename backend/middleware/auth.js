require('dotenv').config()
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

// Replace with your MongoDB connection string
const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function authenticateUser(username, password) {
  try {
    await client.connect();
    console.log('Connected to the database');

    const database = client.db('userList');
    const collection = database.collection('usernames');

    // Find user by username
    const user = await collection.findOne({ email: username });

    if (user) {
      // Compare passwords
      const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

      if (passwordsMatch) {
        console.log('Login successful!');
      } else {
        console.log('Invalid password');
      }
    } else {
      console.log('User not found');
    }
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}
export default authenticateUser
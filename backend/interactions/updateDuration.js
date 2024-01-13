const { MongoClient } = require('mongodb');

async function updateFieldForAllDocuments() {
  const client = new MongoClient('YOUR_MONGODB_CONNECTION_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const database = client.db('your_database');
    const collection = database.collection('your_collection');

    // Your update query and operation
    const updateQuery = { duration: { $gt: 0 } };
    const updateOperation = {
      $set: {
        // Update field(s) as needed
        fieldName: 'new value',
      },
    };

    const result = await collection.updateMany(updateQuery, updateOperation);

    console.log(`${result.modifiedCount} documents updated`);
  } finally {
    await client.close();
  }
}

updateFieldForAllDocuments();

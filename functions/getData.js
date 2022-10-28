const { createClient } = require('@astrajs/collections')

exports.handler = async (event, context) => {
  // create an {astra_db} client
  const astraClient = await createClient({
    // astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseId: process.env.ID,
    // astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    astraDatabaseRegion: process.env.REGION,
    // applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
    applicationToken: process.env.TOKEN
  })

  // create a shortcut to the users collection in the app namespace/keyspace
  // collections are created automatically
  // const usersCollection = astraClient.namespace("app").collection("users");
  const quizCollection = astraClient.namespace(process.env.KEYSPACE).collection('quirky_quizes')

  try {
    // search a collection of documents
    // const quizData = await quizCollection.find({ name: { $eq: "Cliff" } });
    const quizData = await quizCollection.find()

    console.log('astra client?', astraClient)

    return {
      statusCode: 200,
      body: JSON.stringify(quizData),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } catch (error) {
    //   console.log(error),
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}

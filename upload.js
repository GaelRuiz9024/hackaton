const { MongoClient } = require('mongodb');
const datos = require('../quizzDiag.js'); // Importa tus datos desde el archivo datos.js
console.log(datos)
const uri = "mongodb+srv://azulichis:Apb_9205@cluster0.ysrzdoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // URI de conexión a tu instancia de MongoDB
const dbName = "test"; // Nombre de tu base de datos
const collectionName = "material"; // Nombre de la colección donde deseas almacenar tus datos

async function main() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Insertar los datos en la colección
    const result = await collection.insertMany(datos);
    console.log(`${result.insertedCount} documentos insertados`);

  } finally {
    await client.close();
  }
}

main();

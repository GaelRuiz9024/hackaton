const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://azulichis:Apb_9205@cluster0.ysrzdoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Reemplaza esto con tu cadena de conexión

async function main() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Conéctate al cliente
        await client.connect();

        // Conéctate a la base de datos (reemplaza "test" con el nombre de tu base de datos)
        const database = client.db('test');

        // Conéctate a una colección (reemplaza "users" con el nombre de tu colección)
        const collection = database.collection('material');

        // Ejemplo de una inserción
        const doc = { materia: "Alice", tema: 25, duracion: "123 Main St", tipoMaterial: "123 Main St", tipoAprendizaje: "123 Main St", nivel: "123 Main St", enlace: "123 Main St" };
        const result = await collection.insertOne(doc);
        console.log(`Documento insertado con el id: ${result.insertedId}`);

        // Ejemplo de una búsqueda
        const query = { materia: "Alice" };
        const user = await collection.findOne(query);
        console.log(`Usuario encontrado: ${JSON.stringify(user)}`);

         // Ejemplo de una actualización
         const filter = { _id: new ObjectId('6647a99337805516ae58bffc') }; // El criterio para seleccionar el documento a actualizar
         const updateDoc = {
             $set: {
                 tema: 3985, // Actualiza el campo "age" a 26
                 enlace: "https://www.youtube.com/watch?v=HTjfDUm1RsU" // Actualiza el campo "address"
             },
         };
         const result1 = await collection.updateMany(filter, updateDoc);
 
         console.log(`Documentos actualizados: ${result1.modifiedCount}`);

        // Ejemplo de una eliminación
        const filter1 = { name: "Alice" }; // El criterio para seleccionar el documento a eliminar
        const result2 = await collection.deleteOne(filter1);

        console.log(`Documentos eliminados: ${result2.deletedCount}`);
    } finally {
        // Asegúrate de cerrar la conexión cuando termines
        await client.close();
    }
}

main().catch(console.error);

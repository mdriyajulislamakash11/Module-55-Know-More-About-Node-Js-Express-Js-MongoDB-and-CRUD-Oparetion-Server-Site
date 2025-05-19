const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());

// akashahmed
// hMyb5CSbnGwIVczL

const uri =
  "mongodb+srv://akashahmed:hMyb5CSbnGwIVczL@cluster0.zchez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection= client.db("Somple-users-DB").collection("users");

    //get
    app.get("/users", async (rec, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    //ubdate
    app.get("/users/:id", async (rec, res) => {
      const id = rec.params.id;
      const query = {_id : new ObjectId(id)}
      const user = await userCollection.findOne(query)
      res.send(user)
      
    });

    app.put("/users/:id", async (rec, res) => {
      const id = rec.params.id;
      const users = rec.body;
      console.log(id, users)
      const filter = {_id: new ObjectId(id)}
      const option = {upsert: true}
      const updatedUsers = {
        $set: {
          name: users.name,
          email: users.email,
        }
      }

      const result = await userCollection.updateOne(filter, updatedUsers, option, )
      res.send(result)
    })

    // post
    app.post("/users", async (rec, res) => {
      const user = rec.body;
      console.log("new user: ", user);
      const result = await userCollection.insertOne(user);
      res.send(result)
    });

    //delete
    app.delete("/users/:id", async (rec, res) => {
      const id = rec.params.id;
      console.log("deleted id number", id)
      const query = {_id: new ObjectId(id)}

      const result = await userCollection.deleteOne(query)
      res.send(result)
    } )

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (rec, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`CURD id running Port: ${port}`);
});

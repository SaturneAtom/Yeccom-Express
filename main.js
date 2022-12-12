// Importing modules
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")




// Database Address
const url = "mongodb://127.0.0.1:27017/Yecoom"
const app = express()

// Options
app.use(cors())

// Settings Mongoose
mongoose.set('strictQuery', false);

// Connecting to database
mongoose.connect(url).then((ans) => {
    console.log("Connected Successful at MongoDB")
}).catch((err) => {
    console.log("Error in the Connection")
})

// Calling Schema class
const Schema = mongoose.Schema;

// Creating Structure of the collection
const collection_structure = new Schema({
    name: { type: String, require: true },
    avatar: { type: String, require: true },
    banner: { type: String, require: true },
    contact: {
        name: { type: String, require: true },
        email: { type: String, require: true },
        phone: { type: Number, require: true }
    },
    adress: {
        street : { type: String, require: true },
        cd_postal: { type: Number, require: true },
        city: { type: String, require: true },
        state: { type: String, require: true }
    },
    farm: {
        name: { type: String, require: true },
        type: { type: String, require: true },
        size: { type: String, require: true },
    },
    product: [
        {
            name: { type: String, require: true },
            price: { type: Number, require: true },
            quantity: { type: Number, require: true }
        }
    ]
})

app.use("/public/banner", express.static("assets/banner"))


// Creating collection
const collections = mongoose.model("Producer", collection_structure)

// Inserting one document
app.get("/api/newproducer", (req, res) => {
    collections.create({
        name: "La Ferme de la Garenne",
        avatar: "https://media.gettyimages.com/id/541327504/fr/photo/typical-house.jpg?s=612x612&w=gi&k=20&c=hS7cm9MYo5jqoi0avItWQoxD1VEsntQX8vsdi69xfB4=",
        banner: "http://localhost:8000/public/banner/champs.jpg",
        contact: {
            name: "Paul Henry",
            email: "paulhenry@gmail.com",
            phone: 123890
        },
        adress: {
            street : "12 rue de la garenne",
            city: "Montpellier",
            cd_postal: 34000,
            state: "France"
        },
        farm: {
            name: "aaush",
            type: "aush",
            size: "aash",
        },
        product: [
            {
                name: "Lait",
                price: 13,
                quantity: 13
            },
            {
                name: "Oeufs",
                price: 13,
                quantity: 23
            }
        ]
    }).then((ans) => {
        console.log("Document inserted")
    }).catch((err) => {
        console.log(err.Message);
    })
    res.send("Document inserted")
}

)

// Get all documents

app.get("/api/producer", (req, res) => {
    collections.find().then((ans) => {
        res.send(ans)
    }).catch((err) => {
        console.log(err.Message);
    })
})

// Get document by id

app.get("/api/:id", (req, res) => {
    collections.findById(req.params.id).then((ans) => {
        res.send(ans)
    }).catch((err) => {
        console.log(err.Message);
    })
})

// Get Sous-documents by id

app.get("/api/:id/contact", (req, res) => {
    collections.findById(req.params.id).then((ans) => {
        res.send(ans.contact)
    }).catch((err) => {
        console.log(err.Message);
    })
})

app.get("/api/:id/adress", (req, res) => {
    collections.findById(req.params.id).then((ans) => {
        res.send(ans.adress)
    }).catch((err) => {
        console.log(err.Message);
    })
})


app.get("/api/:id/farm", (req, res) => {
    collections.findById(req.params.id).then((ans) => {
        res.send(ans.farm)
    }).catch((err) => {
        console.log(err.Message);
    })
})

/// Get Sous-documents by id / product

app.get("/api/:id/products", (req, res) => {
    collections.findById(req.params.id).then((ans) => {
        res.send(ans.product)
    }).catch((err) => {
        console.log(err.Message);
    })
})

// Ecoute du serveur

app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000/api/newproducer");
})
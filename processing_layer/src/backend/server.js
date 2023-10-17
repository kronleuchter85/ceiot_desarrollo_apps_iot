
var PORT = 3000;

const cors = require('cors');
var express = require('express');
var app = express();

const fs = require('fs');
const mqtt = require("mqtt");

const { MongoClient } = require("mongodb");
const uri = "mongodb://mongodb:27017/?maxPoolSize=20&w=majority";
const mongoclient = new MongoClient(uri);
const database = mongoclient.db("test");

const client = mqtt.connect({
    host: 'eclipse-mosquito-tls',
    port: 1884,
    protocol: 'mqtts',
    protocolVersion: 5,
    cert: fs.readFileSync('./certs_3/client.crt').toString(),
    key: fs.readFileSync('./certs_3/client.key').toString(),
    ca: [fs.readFileSync('./certs_3/ca.crt').toString()]
});


client.on('auth', (packet, cb) => {
    console.log('Authenticating with certificate...');
    cb(null);
});

async function findDevice(id) {
    const devices2 = database.collection("devices");
    if (devices2 == undefined || devices2 == null) {
        console.log("collection devices not found");
        return null;
    }

    var query = { deviceId: id };
    var device = await devices2.findOne(query);
    console.log(device);
    return device;
}

client.on('message', async (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message}`);

    try {
        if (topic == "/topic/measures") {

            var new_measure = JSON.parse(message);
            var deviceId = new_measure['deviceId'];

            // var device = await database.collection("devices").findOne({ deviceId: deviceId }).then(
            //     (device)=>{
            //         processDevice(device , new_measure);
            //     }
            // );
            var device = await database.collection("devices").findOne({ deviceId: deviceId });

            if (device == null) {

                device = {
                    'deviceId': deviceId,
                    'deviceDescription': new_measure['type'],
                    'lastMeasureValue': new_measure['value'],
                    'lastMeasureLocation': new_measure['location'],
                    'lastMeasureTime': new_measure['time'],
                    'status': 'active',
                    'measures': [
                        new_measure
                    ]
                };
                console.log("inserting device ");
                const result = await database.collection('devices').insertOne(device);
                console.log("inserted: " + result.insertedId);
            } else {

                console.log("updating id " + device['_id']);
                await database.collection("devices").updateOne(
                    {_id: device['_id']} , 
                    {
                        $set: {
                            lastMeasureValue: new_measure['value'],
                            lastMeasureLocation: new_measure['location'],
                            lastMeasureTime: new_measure['time']
                        } , 
                        $push: {
                            "measures": new_measure
                        }
                    }
                );
            }

        } else {
        }
    } catch (error) {
        console.log(error);
    }
});

client.on("connect", () => {

    console.log("MQTT - connected  " + client.connected);

    //
    //
    //
    client.subscribe("presence", (err) => {
        if (!err) {
            client.publish("presence", "Hello mqtt");
        }
    });

    //
    //
    //
    client.subscribe("/topic/measures", (err) => {
        if (err) {
            console.log("no se pudo suscribir al topico /topic/measures");
        }
    });
});

client.on("error", (error) => {
    console.log("MQTT - Can't connect " + error);
});

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));
// to enable cors
app.use(cors(corsOptions));

//=======[ Main module code ]==================================================


app.get('/api/devices3/', async function (req, res, next) {
    res.send(await database.collection('devices').find({}).toArray());
});


app.listen(PORT, function (req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================

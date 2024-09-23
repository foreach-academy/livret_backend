const app = require("./index");
require('./Models/Joining');

app.listen(3006, () =>{
    console.log("votre serveur est lancée sur http://127.0.0.1:3006");
})
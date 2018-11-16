const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const fs = require('fs');
const download = require('download');

//para definir la carpeta publica
app.use(express.static('public'));
//para registrar el motor de render handlebars
app.engine('handlebars', hbs());
//para setear el motor de render a utilizar
app.set('view engine', 'handlebars');

// importar módulo body-parser
var bodyParser = require('body-parser');
// configurar módulo body-parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// usar body-parser
app.use(express.json());

app.get('/',function(req , res){
    res.render('home');
});

app.post('/api/descargar',function(req , res){
    var url = req.body.url;
    var nombre = req.body.nombre;

    //aqui descargo y guardo la imagen
    download(url).then(data => {
        fs.writeFileSync('public/imagenes/'+nombre+'.jpg', data);
    });

    var obj = {
        imagen : nombre+'.jpg',
        nombre : nombre,
    }

    res.json(obj);
});


app.listen(3000);

//http://localhost:3000/api/descargar?url=http://puppytoob.com/wp-content/uploads/2017/03/Black-Pug-750x422.jpg&nombre=more
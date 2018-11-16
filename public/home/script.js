window.addEventListener('load',function(){
    var urlimagen = document.querySelector('.url');
    var nombre = document.querySelector('.nombre');

    document.querySelector('.boton').addEventListener('click',function(e){
        e.preventDefault();
        console.log('entroooooo');
        var url = '/api/descargar?';
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'url='+urlimagen.value+'&nombre='+nombre.value,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(function(res){


            var p = document.createElement('p');
            p.innerHTML = "Se ha guardado con exita la imagen "+res.nombre+".jpg"

            var main = document.querySelector('.contenedor');
            main.innerHTML = "";
            main.appendChild(p);
            /*
            var img = document.createElement('img');
            img.setAttribute('src','../imagenes/'+res.imagen);


            */
        });
    });
});
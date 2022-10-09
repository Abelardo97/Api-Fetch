const obtener = () => {

    const datos = JSON.parse(localStorage.getItem("users"))
    datos && datos.time > Date.now() ?
        mostrarTabla(datos.contenido) :
        obtenerApi()
}

//Función para obtener los usuarios
function obtenerApi() {
    //consumiendo Api
    fetch('https://reqres.in/api/users?delay=3')
        .then( respuesta => respuesta.json() )
        .then( users  => {
            mostrarTabla(users.data)
            guardarDatos(users.data)
            
        } )
}
    //Mostrar datos en la tabla
    const mostrarTabla = (users) => {
        let thead = '';
        let tbody = ''; 

        //Encabezado de la tabla    
        thead = `
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Image</th>
                </tr>
            </thead>`
        document.getElementById("atributos"). innerHTML = thead;
        for(let i=0; i<users.length; i++){
            //llenado las filas de la tabla
            tbody += `
                <tr>
                <td>${users[i].id}</td>
                <td>${users[i].first_name}</td>
                <td>${users[i].last_name}</td>
                <td>${users[i].email}</td>
                <td><img src="${users[i].avatar}" class="rounded-circle mx-auto" style="width: 55px"></img></td>
            `
            document.getElementById("tablita"). innerHTML = tbody;
        
        } 
    }
    // Guardando los datos en localStorage
    const guardarDatos = data => {
        // creacion del objeto guardando users
        const users = {
            //volver a motrar datos en la tabla
            contenido: [...data],
            time: Date.now() + 60000
        }
        localStorage.setItem("users", JSON.stringify(users))
        
    }


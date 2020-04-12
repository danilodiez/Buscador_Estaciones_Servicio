const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
    ui.mostrarEstablecimientos();
})


//habilitar busqueda de lugares
const buscador = document.querySelector('#buscar input')

buscador.addEventListener('input', ()=>{

    if(buscador.value.length>5){

        ui.buscar(buscador.value)

    }else{
        ui.mostrarEstablecimientos()


    };

})
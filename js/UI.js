class UI {
    constructor() {

        //instanciar la api
        this.api = new API();

        //crear los markers con layerGroup
        this.markers= new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }


    mostrarEstablecimientos(){
        this.api.obtenerDatos()
        .then(datos => {
            const resultado = datos.respuestaJSON.results;
            //ejecutar la funcion para mostrar los pines
            this.mostrarPines(resultado);

        })
    }


    mostrarPines(datos){
        //limpiar los markers, funcion nativa de Leaflet
        this.markers.clearLayers();


        //recorrer los lugares
        datos.forEach( dato =>{
            //destructuring para sacar la info
            const {latitude, longitude, calle, regular, premium} = dato;

            //crear un popUp
            const opcionesPopUp = L.popup().setContent(
                `
                <p>
                Calle: ${calle}
                </p>
                <p>
                Regular: $${regular}
                </p>
                <p>
                Premium: $${premium}
                </p>

                `

            )


            //agregar el pin

            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)

            ]
            ).bindPopup(opcionesPopUp);

            this.markers.addLayer(marker);


        })
        this.markers.addTo(this.mapa);        
    }


    buscar(busqueda){
        this.api.obtenerDatos()
        .then(datos =>{
            const resultados = datos.respuestaJSON.results
        

        this.filtrarSugerencias(resultados, busqueda);
        });

    }

    //filtra las sugerencias
    filtrarSugerencias(resultado, busqueda){
        //filtrar con .filter

        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !==-1)
        
        
        this.mostrarPines(filtro);
    }
}
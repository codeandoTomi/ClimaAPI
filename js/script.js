
/////////////////////////////////////////////////////////////////////////////////////////////////////////

const container = document.querySelector('.container');
const form = document.querySelector('.form');
const resultado = document.querySelector('.desdeJS');

///////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('load', () =>{
    form.addEventListener('submit', buscarClima );


})
///////////////////////////////////////////////////////////////////////////////////////////////////////
function buscarClima(e){
    e.preventDefault();
    // console.log("buscando el clima....")
    ///// VALIDAR.. 
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#country').value;
    // console.log(ciudad)
    // console.log(pais)
    if(ciudad === "" || pais === ""){
        mostrarError("Ambos campos son obligatorios..");

        return
    } 
    ///// CONSULTAR API..
    consultarAPI(ciudad, pais);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mostrarError(mensaje, tipo){
    // console.log(mensaje);
    const alerta = document.querySelector('.alertaJS');
    if(!alerta){ // una vez que alerta tiene la classe alertaJS puesta. no vuelve a entrar.
        // crear alerta
        const div = document.createElement('div');
        div.classList.add("alertaJS");
        div.innerHTML = `
            <strong class=""> Error! </strong>
            <br>
            <span class=""> ${mensaje} </span>
        `;

        container.appendChild(div);

        setTimeout(() =>{
            div.remove();
        }, 3000)
    }
    

};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function consultarAPI(ciudad, pais){
    const appID = '961c52283fc1ceeaa26fb2ac4fffa319';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    // console.log(url)
    sppiner();
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {
            // console.log(datos)
            limpiarHTML();
            if(datos.cod === "404"){
                mostrarError("Ciudad no encontrada")
                return;
            }
            // IMPRIME RESPUESTA EN EL HTML
            mostrarClima(datos);
        })
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mostrarClima(datos){
    const { name, main: { temp, temp_max, temp_min } } = datos;
    // console.log(temp)
    const centigrados = kelvinACentigrados(temp);
    const min = kelvinACentigrados(temp_min);
    const max = kelvinACentigrados(temp_max);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en: ${name}`;
    nombreCiudad.classList.add('pDesdeJSM');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('pDesdeJS');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451`;
    tempMax.classList.add('pDesdeJSM');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451`;
    tempMin.classList.add('pDesdeJSM');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('divDesdeJS');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    

    resultado.appendChild(resultadoDiv);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const kelvinACentigrados = grados => parseInt(grados - 273.15);
// function kelvinACentigrados(grados){
//     return parseInt(grados - 273.15);
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function sppiner(){
    limpiarHTML();

    const divSpiner = document.createElement('div');
    divSpiner.classList.add('sk-cube-grid')
    divSpiner.innerHTML = `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
    `

    resultado.appendChild(divSpiner);
}
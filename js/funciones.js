import { formulario, resultado } from '../../38-PROYECTO-PixabayImagenes/js/variables.js';
import { SelectCripotomonedas, monedaSelect, obj } from './variables.js';
//1.-Criptomonedas
function consultarCriptomonedas() {

    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => llenarSelect(criptomonedas));


}
//2.- Obtener las criptomonedas por una promesa
//Crear una promesa
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas)
})


//3.- Llenar el select de criptomonedas
const llenarSelect = (criptomonedas) => {
    criptomonedas.forEach(criptomoneda => {
        //Obteniendo el nombre y su reduccion 
        const { FullName, Name } = criptomoneda.CoinInfo;

        //Llenando el select
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        console.log(option);
        SelectCripotomonedas.appendChild(option);
    });
}

//4.- submitForm
const submitForm = (e) => {
    e.preventDefault();

    const { moneda, criptomoneda } = obj;
    if (!moneda || !criptomoneda) {
        mostrarMensaje('Campos oblitatorios');
        return;
    }

    limpiarResultados();
    //consultarAPI
    consultarAPI();

}

//5.- leerMoneda
const leerMoneda = (e) => {
    console.log(e.target.value);
    obj[e.target.name] = e.target.value;
    console.log(obj);
}

//6.- mostrarMensaje
const mostrarMensaje = (mensaje) => {
    const validaMensaje = document.querySelector('.error');
    if (!validaMensaje) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        divMensaje.textContent = mensaje;
        formulario.appendChild(divMensaje)

        setTimeout(() => {
            divMensaje.remove()
        }, 2000);
    }
}

//7.-ConsultarAPI
function consultarAPI() {
    const { moneda, criptomoneda } = obj;
    console.log(moneda, criptomoneda);

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    mostrarSpinner();

    setTimeout(() => {
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(respuesta => {

                //accediento a la informacion de la moneda de forma dinamica
                setTimeout(() => {
                    mostrarCotizacion(respuesta.DISPLAY[criptomoneda][moneda], moneda);
                }, 300);

            })
    }, 2500);


}

//8.- MostrarCotizacion
function mostrarCotizacion(info, moneda) {

    console.log(info);
    const { CHANGE24HOUR, PRICE, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, HIGHDAY } = info

    createP(PRICE, moneda, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE);
    console.log(CHANGE24HOUR);


}


//crearParrafos
function createP(PRICE, moneda, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE) {
    limpiarResultados()
    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>${(PRICE.includes(moneda)) ? PRICE.replace(moneda, '$') : PRICE}</span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `<p>Precio mas alto del dia <span>${HIGHDAY}</span></p>`

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `<p>Precio mas bajo del dia <span>${LOWDAY}</span></p>`

    const ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML = `<p> Variacion ultimas 24 horas <span>${CHANGEPCT24HOUR}%</span></p>`

    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `<p> Ultima Actualizacion <span>${LASTUPDATE}</span></p>`

    resultado.appendChild(precio)
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)
    resultado.appendChild(ultimasHoras)
    resultado.appendChild(ultimaActualizacion)

}

//limpiar resultados anteriores
const limpiarResultados = () => {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

const mostrarSpinner = () => {

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    resultado.appendChild(spinner)
}

export {
    consultarCriptomonedas,
    submitForm,
    leerMoneda
}
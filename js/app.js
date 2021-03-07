import { consultarCriptomonedas, submitForm, leerMoneda } from './funciones.js';
import { formulario, SelectCripotomonedas, monedaSelect } from './variables.js';
document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitForm)
    SelectCripotomonedas.addEventListener('change', leerMoneda)
    monedaSelect.addEventListener('change', leerMoneda)

});
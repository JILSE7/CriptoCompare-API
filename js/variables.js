const SelectCripotomonedas = document.querySelector('#criptomonedas'),
    formulario = document.querySelector('#formulario'),
    monedaSelect = document.querySelector('#moneda'),
    resultado = document.querySelector('#resultado'),
    //obj
    obj = {
        //Con los name del select se mapean y se llenan 
        //por medio de una funcion
        moneda: '',
        criptomoneda: ''
    };

export { SelectCripotomonedas, formulario, monedaSelect, obj, resultado };
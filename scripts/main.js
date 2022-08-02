const linkEstilos = document.querySelector('link');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const arrayEstilos = [ '',linkEstilos.href, linkEstilos.href.slice(0, -11) + 'estilos2.css', linkEstilos.href.slice(0, -11) + 'estilos3.css']

// <<<<<<<<<<<<<<<<<<   Cambiar Estilo (Secuencial)   >>>>>>>>>>>>>>
btn1.addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        if (linkEstilos.href === arrayEstilos[1])
            linkEstilos.href = arrayEstilos[2];
        else if (linkEstilos.href === arrayEstilos[2])
            linkEstilos.href = arrayEstilos[3];
        else
            linkEstilos.href = arrayEstilos[1];
})
let ant = -1; //valor inicial, variable de evento btn2

// <<<<<<<<<<<<<<<<<<   Boton Aleatorio   >>>>>>>>>>>>>>
btn2.addEventListener('click', (e)=>{
    e.preventDefault();  e.stopPropagation();
    let aux = Math.floor((Math.random(4)) * 4);
    while (aux === ant) {
        aux = Math.floor((Math.random(4)) * 4);
    }// console.log(aux)
    linkEstilos.href = arrayEstilos[aux];
    ant = aux;
})

// <<<<<<<<<<<<<<<<<<   Boton Recordar   >>>>>>>>>>>>>>
let hundido = false;//evento btn3
btn3.addEventListener('click', (e)=>{
    e.preventDefault();  e.stopPropagation();
    hundido = hundido ? !hundido : hundido = true;
    setTimeout(()=>{
        if (hundido && localStorage.getItem('link') === null){
            window.localStorage.setItem('link',linkEstilos.href)
            btn3.className = 'btn3Abajo'
            console.log('condicion1 Puesta')
        }else if (!hundido && localStorage.getItem('link') !== null){
            window.localStorage.clear()
            btn3.className = 'btn3Arriba'
            console.log('condicion2 puesta')
        }
    }, 50);//Entra en condicion con delay, ya que hundido debe ser definido.
})

// <<<<<<<<<<<<<<<<<<   Select y Options   >>>>>>>>>>>>>>
// Select - Array Options {0=sin estilo, 1=original, etc}
let selectOptions = document.querySelector('#select-estilos');

//Evento change SELECT(Con Options)
selectOptions.addEventListener('change', ()=>{
    let aux = selectOptions.selectedOptions;
    console.log(`ID:${aux[0].id}`)
    linkEstilos.href = arrayEstilos[aux[0].id] 
    localStorage.setItem('optionActual', aux[0].id)
})

let selectO = document.querySelectorAll('.optionNav');
console.log('option[1] esta selected?:', selectO[1].selected)


// <<<<<<<<<<<<<<<<<<   Radio INPUTS   >>>>>>>>>>>>>>
let arrayRadio = document.querySelectorAll('.optionRadioNav');

console.dir(arrayRadio);

arrayRadio.forEach(element => {
    element.addEventListener('change', ()=>{//para evitar repetir ID en html: -4
        console.log(`Cambios en el array: ${element.id - 4}`)
        linkEstilos.href = arrayEstilos[element.id-4];
        localStorage.setItem('radioActual', element.id-4);
    })
});


// <<<<<<<<<<<<<<<<<<   Recargar Pagina   >>>>>>>>>>>>>>
//Recargo de pagina, accedo al locate.storage.
if (localStorage.getItem('link') !== null){
    btn3.className = 'btn3Abajo';
    hundido = true;
    linkEstilos.href = localStorage.getItem('link');
    //Si tengo una opcion de select seleccionada la recuerdo del locate.storage.
    if (localStorage.getItem('optionActual') !== null){
        let opActual = selectO[localStorage.getItem('optionActual')];
        opActual.selected = true;
    }
    if (localStorage.getItem('radioActual') !== null){
        let radAct = arrayRadio[localStorage.getItem('radioActual')];
        radAct.checked = true;
    }
}
// else{ //Condicion de 'Recordar' despulsado.
//     //-------------Borrar foreach-------------- (no hace falta)
//     selectO.forEach(element => { //Si NO tengo ninguna option del select seleccionada no la recuerdo(Deselected)
//         if (element.getAttribute('selected') !== null){
//             element.removeAttribute('selected');
//             console.log(`removido option${element.id} (deSelected)`)
//         }
//     });
//     // selectO[1].selected = true; //Valor por defecto (estilo original = 1)
//     // arrayRadio[1].checked = true;
// }





// setInterval(()=>{
//     console.log(`Hundido es: ${hundido}`)
//     console.log(`Storage actual: ${localStorage.getItem('link')}`)
    
// }, 5000)
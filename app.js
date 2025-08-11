// El desafío consiste en fortalecer mis habilidades en lógica de programación, para solver el problema.
alert('Bienvenido al Juego del Amigo Secreto');
alert('Deberás ingresar el nombre de tus 10 mejores amigos');
alert('Los cuales posteriormen serán sorteados');
let nombres = []
let cantidadMaxAmigos = 10;
const regex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]*$/; 

function agregarAmigo() {
    let nombreAmigo = document.getElementById("amigo").value; 
    if (nombres.length === cantidadMaxAmigos) { 
        asignarTextoElemento("h2", "Ya no puedes agregar más amigos.")
        limpiar("amigo");
        return;
    } else {
        if (nombreAmigo === "") {
            Swal.fire({
                title: 'Campo vacío',
                text: 'Por favor, ingresa un nombre.',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
            return;
        } 
        if (nombres.includes(nombreAmigo)) { 
            Swal.fire({
                title: 'Ya has ingresado este nombre.',
                text: 'Por favor, ingresa un nombre diferente.',
                icon: 'warning',
            });
            limpiar("amigo");
            return;
        }
        if (!regex.test(nombreAmigo)) { 
            Swal.fire({
                title: 'Nombre inválido',
                text: 'Por favor, ingresa un nombre válido.',
                icon: 'warning',
            });
            limpiar("amigo");
            return;
        }
        
    }
    nombres.push(nombreAmigo)

    limpiar("amigo"); 
    mostrarLista("listaAmigos", nombres)
    cursor();
}

function asignarTextoElemento(elemento, texto) { 
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto; 
}

function limpiar(identificar){//
    document.getElementById(identificar).value = ""; 
    document.getElementById(identificar).innerHTML = ""; 
}

function mostrarLista(lista, elementos) {
    let mostrarAmigos = document.getElementById(lista); 

    mostrarAmigos.innerHTML = ""

    for (let i = 0; i < elementos.length; i++) {
        let elementoLista = document.createElement("li");
        elementoLista.textContent = elementos[i];
        mostrarAmigos.appendChild(elementoLista);
    }
} 

function sortearAmigo() {
    if (nombres.length === 0) { 
        Swal.fire({
            title: 'Lista vacía',
            text: 'Por favor, ingresa al menos dos amigos.',
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
        return;
    }
    let amigoSecreto = nombres.splice(Math.floor(Math.random() * nombres.length), 1)[0]; 
    document.getElementById("resultado").innerHTML = `Tu amigo secreto es: ${amigoSecreto}`
    limpiar("listaAmigos");
    if (nombres.length === 0) {
        asignarTextoElemento("h2", "Ya no puedes sortear más amigos");
    }
}

function resetear() {
    nombres = []
    limpiar("listaAmigos");
    asignarTextoElemento("h2", "AGREGA EL NOMBRE DE TUS AMIGOS")
    limpiar("amigo");
    cursor();
    limpiar("resultado");

}

function cursor() {
    document.getElementById("amigo").focus();
}

document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});

cursor();
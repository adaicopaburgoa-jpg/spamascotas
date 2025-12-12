let correoRegla = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
let passRegla = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

function validarTelefono(num) {
    let telRegla = /^\+591[67][0-9]{7}$/;
    return telRegla.test(num);
}

function guardarRegistro() {

    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let pass = document.getElementById("password").value;

    let mascotaNombre = document.getElementById("mascotaNombre").value;
    let mascotaEspecie = document.getElementById("mascotaEspecie").value;
    let mascotaRaza = document.getElementById("mascotaRaza").value;

    let mensaje = document.getElementById("mensaje");

    if (!validarTelefono(telefono)) {
        mensaje.textContent = "Teléfono inválido. Use +591 6xxxxxxx o +591 7xxxxxxx";
        mensaje.style.color = "red";
        return;
    }

    if (!correoRegla.test(correo)) {
        mensaje.textContent = "Correo inválido.";
        mensaje.style.color = "red";
        return;
    }

    if (!passRegla.test(pass)) {
        mensaje.textContent = "Contraseña inválida (mayúscula, minúscula, número, min. 8 chars).";
        mensaje.style.color = "red";
        return;
    }

    if (nombre === "" || mascotaNombre === "") {
        mensaje.textContent = "Complete todos los campos obligatorios.";
        mensaje.style.color = "red";
        return;
    }

    mensaje.textContent = "Registro guardado correctamente.";
    mensaje.style.color = "green";
}

let productos = [
    { nombre: "Shampoo", precio: 40, imagen: "imagenes/producto1.jpg" },
    { nombre: "Juguete", precio: 25, imagen: "imagenes/producto2.jpg" },
    { nombre: "Comida", precio: 80, imagen: "imagenes/producto3.jpg" }
];

let carrito = [];

function mostrarProductos() {
    let div = document.getElementById("productos");
    productos.forEach((prod, i) => {
        let card = document.createElement("div");
        card.className = "producto";
        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <p>${prod.nombre}</p>
            <p>${prod.precio} Bs</p>
            <button onclick="agregarCarrito(${i})">Comprar</button>
        `;
        div.appendChild(card);
    });
}

function agregarCarrito(indice) {
    carrito.push(productos[indice]);
    actualizarCarrito();
}

function actualizarCarrito() {
    let lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";
    let subtotal = 0;
    carrito.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} - ${item.precio} Bs`;
        lista.appendChild(li);
        subtotal += item.precio;
    });
    document.getElementById("subtotal").textContent = subtotal;
}

function finalizarCompra() {
    if(carrito.length === 0){
        alert("El carrito está vacío.");
        return;
    }
    alert("Compra finalizada. Total: " + document.getElementById("subtotal").textContent + " Bs");
    carrito = [];
    actualizarCarrito();
}

mostrarProductos();
let citas = [];

function validarFecha(fecha) {
    return /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/.test(fecha);
}

function validarHora(hora) {
    return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(hora);
}

function agendarCita() {
    let mascota = document.getElementById("citaMascota").value.trim();
    let fecha = document.getElementById("citaFecha").value.trim();
    let hora = document.getElementById("citaHora").value.trim();
    let servicio = document.getElementById("citaServicio").value;

    let mensaje = document.getElementById("mensajeCita");

    if(mascota === "") {
        mensaje.textContent = "Ingrese el nombre de la mascota.";
        mensaje.style.color = "red";
        return;
    }

    if(!validarFecha(fecha)) {
        mensaje.textContent = "Fecha inválida. Formato DD/MM/AAAA";
        mensaje.style.color = "red";
        return;
    }

    if(!validarHora(hora)) {
        mensaje.textContent = "Hora inválida. Formato HH:MM";
        mensaje.style.color = "red";
        return;
    }

    let cita = { mascota, fecha, hora, servicio };
    citas.push(cita);

    mensaje.textContent = "Cita agendada correctamente: " + fecha + " a las " + hora;
    mensaje.style.color = "green";

    document.getElementById("citaMascota").value = "";
    document.getElementById("citaFecha").value = "";
    document.getElementById("citaHora").value = "";
}

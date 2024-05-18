// Función para recoger los datos del formulario al enviarlo
function recogerDatosFormulario(event) {
    // Evitar el envío del formulario por defecto
    event.preventDefault();

    // Obtener los valores de los campos de texto
    var nombre = document.getElementById("name-form02-3").value;
    var correo = document.getElementById("email-form02-3").value;
    var contraseña = document.getElementById("password-form02-3").value;

    // Almacenar los datos en el almacenamiento local del navegador
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('correo', correo);
    localStorage.setItem('contraseña', contraseña);

    // Abrir una nueva pestaña
    window.open('preguntas.html');
}

// Asignar la función recogerDatosFormulario al evento submit del formulario
document.querySelector(".mbr-form").addEventListener("submit", recogerDatosFormulario);

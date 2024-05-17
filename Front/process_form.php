<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "tu_base_de_datos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$name = $_POST['name'];
$email = $_POST['email'];

// Insertar datos en la base de datos
$sql = "INSERT INTO usuarios (nombre, correo) VALUES ('$name', '$email')";

if ($conn->query($sql) === TRUE) {
    // Redirigir a la página "preguntas.html"
    header("Location: preguntas.html");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

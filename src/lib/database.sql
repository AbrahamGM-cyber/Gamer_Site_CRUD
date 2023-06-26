CREATE DATABASE IF NOT EXISTS gamer_site; 

USE gamer_site;

CREATE TABLE IF NOT EXISTS usuarios (
    ID_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100),
    nombre_usuario VARCHAR(50) NOT NULL,   
    correo_electronico VARCHAR(50) NOT NULL,
    contraseña VARCHAR(150) NOT NULL,    
    telefono VARCHAR(50) NOT NULL, 
    genero VARCHAR(50) NOT NULL,   
    fecha_registro DATE 
);

CREATE TABLE IF NOT EXISTS juegos (    
    ID_juego INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_juego VARCHAR(50)NOT NULL,   
    descripcion VARCHAR(255),
    nombre_usuario VARCHAR(50)NOT NULL,
    requisitos_sistema VARCHAR(255),    
    link_descarga VARCHAR(255)NOT NULL,
    fecha_lanzamiento DATE
);

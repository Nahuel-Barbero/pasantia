-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2025 a las 18:21:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `escuela_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `fechaIngreso` date DEFAULT NULL,
  `fechaBaja` date DEFAULT NULL,
  `habitacion` varchar(255) DEFAULT NULL,
  `matricula` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `sexo` varchar(50) DEFAULT NULL,
  `cuil` varchar(50) DEFAULT NULL,
  `nacionalidad` varchar(255) DEFAULT NULL,
  `localidad` varchar(255) DEFAULT NULL,
  `nombreResponsable` varchar(255) DEFAULT NULL,
  `parentesco` varchar(255) DEFAULT NULL,
  `nacionalidadResponsable` varchar(255) DEFAULT NULL,
  `sexoResponsable` varchar(50) DEFAULT NULL,
  `ocupacion` varchar(255) DEFAULT NULL,
  `cuilResponsable` varchar(50) DEFAULT NULL,
  `domicilio` varchar(255) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `localidadResponsable` varchar(255) DEFAULT NULL,
  `distrito` varchar(255) DEFAULT NULL,
  `escuela` varchar(255) DEFAULT NULL,
  `anio` varchar(50) DEFAULT NULL,
  `tipoEscuela` varchar(255) DEFAULT NULL,
  `jurisdiccion` varchar(255) DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `docenteDesignada` varchar(255) DEFAULT NULL,
  `permanencia` varchar(255) DEFAULT NULL,
  `transitorio` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `gravedad` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id`, `fechaIngreso`, `fechaBaja`, `habitacion`, `matricula`, `nombre`, `fechaNacimiento`, `edad`, `sexo`, `cuil`, `nacionalidad`, `localidad`, `nombreResponsable`, `parentesco`, `nacionalidadResponsable`, `sexoResponsable`, `ocupacion`, `cuilResponsable`, `domicilio`, `telefono`, `localidadResponsable`, `distrito`, `escuela`, `anio`, `tipoEscuela`, `jurisdiccion`, `diagnostico`, `docenteDesignada`, `permanencia`, `transitorio`, `observaciones`, `gravedad`, `createdAt`, `updatedAt`) VALUES
(1, '2018-03-03', '2025-11-28', '702', '01', 'Nahuel Leonardo Barbero', '2006-10-04', 18, 'M', '47563534', 'argentina', 'mar del plata', 'paula diaz', 'madre', 'argentina', 'F', NULL, '27217180', 'dorrego 3642', '2234567844', 'mar del plata ', 'gral pueyrredon', 'tecnica 5', '7mo', 'Tecnica', 'Provincial', 'quebrado', 'Paola Flament', '16 a 30 días', 'Sí', 'asd', 'media', '2025-09-23 16:47:13', '2025-09-23 16:47:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `nombre`, `createdAt`) VALUES
(4, 'admin', '$2b$10$zaBBYsEk5fWgfs4uJgT31Or7akRNrudOQjvp0Wb6JUxRweeVwEEa2', 'Administrador', '2025-09-23 16:58:23');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

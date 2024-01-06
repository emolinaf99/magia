-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-12-2023 a las 22:48:00
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `magia_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adminuser`
--

CREATE TABLE `adminuser` (
  `id` int(11) NOT NULL,
  `user` varchar(60) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `adminuser`
--

INSERT INTO `adminuser` (`id`, `user`, `name`, `password`, `email`) VALUES
(1, 'AdminMagia2023CO', 'Admin', '$2a$10$jzobNSA3b2X2SXcCJSDgKeFnUkT9QSZoa1orrIBZuj/igS2orbKZa', 'molii.esteban@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `imgBanner` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `name`, `imgBanner`) VALUES
(1, 'Velas', '/images/imgBannerCategory-1702276499839-903468709.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `esencias`
--

CREATE TABLE `esencias` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `esencias`
--

INSERT INTO `esencias` (`id`, `name`) VALUES
(1, 'Arena Rosada'),
(2, 'Brisa Hawaiana'),
(3, 'Arena Rosada'),
(4, 'Brisa Hawaiana'),
(5, 'Calma'),
(6, 'Elíxir Tropical'),
(7, 'Energía'),
(8, 'Eucalipto'),
(9, 'Calma'),
(10, 'Sandía Pepino'),
(11, 'Uva'),
(12, 'Vainilla Francesa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `principalpage`
--

CREATE TABLE `principalpage` (
  `id` int(11) NOT NULL,
  `imagenBanner` varchar(200) NOT NULL,
  `textoBanner` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `principalpage`
--

INSERT INTO `principalpage` (`id`, `imagenBanner`, `textoBanner`) VALUES
(1, '/images/imagenBanner-1702316760486-233761692.jpg', 'Hola soy el tercer texto de ensayo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `presentacion` varchar(20) NOT NULL,
  `precio` int(20) NOT NULL,
  `categoria` int(11) NOT NULL,
  `imagenPrincipal` varchar(100) NOT NULL,
  `imagenDos` varchar(100) NOT NULL,
  `imagenTres` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `name`, `descripcion`, `presentacion`, `precio`, `categoria`, `imagenPrincipal`, `imagenDos`, `imagenTres`) VALUES
(1, 'Vela 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', '85 gr', 25000, 1, '/images/rojoCirculo.jpg', '/images/rojoCirculo.jpg', '/images/rojoCirculo.jpg'),
(2, 'Vela 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', '200 gr', 50000, 1, '/images/rojoCirculo.jpg', '/images/rojoCirculo.jpg', '/images/rojoCirculo.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `esencias`
--
ALTER TABLE `esencias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `principalpage`
--
ALTER TABLE `principalpage`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Producto_Categoria` (`categoria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adminuser`
--
ALTER TABLE `adminuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `esencias`
--
ALTER TABLE `esencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `principalpage`
--
ALTER TABLE `principalpage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `Producto_Categoria` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

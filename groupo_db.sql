-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 05 mars 2022 à 09:53
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupo_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `cmt`
--

CREATE TABLE `cmt` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `msg` text NOT NULL,
  `cmtdate` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `cmt`
--

INSERT INTO `cmt` (`id`, `postId`, `userId`, `msg`, `cmtdate`) VALUES
(6655638, 9434478, 186, 'N&amp;qut;hésitez pas à nous faire votre retour !', '2022-02-24 11:01:34');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `postedat` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `msg` text NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `userLike` varchar(255) DEFAULT '[]',
  `countLike` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `postedat`, `userId`, `msg`, `img`, `userLike`, `countLike`) VALUES
(9434478, '2022-02-24 11:01:23', 186, 'Bienvenue sur Groupomania !', 'http://localhost:3002/images/icon-above-font.png1645696883116.png', '[236,239,240,241,238,246,254]', 7);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg',
  `admin` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `lastname`, `firstname`, `avatar`, `admin`) VALUES
(186, 'admin@groupomania.fr', '$2b$10$uJkw6hCtclqteEiz/sZ9bOOzjmsOrwjmrc17LtKj4mbWUb.WxyjmC', 'Groupomania', 'Admin', 'http://localhost:3002/images/icon.png1645696865767.png', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cmt`
--
ALTER TABLE `cmt`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cmt`
--
ALTER TABLE `cmt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24841201;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=269;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

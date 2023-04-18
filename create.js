const mysql = require("mysql2");

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	multipleStatements: true,
});

con.query(
	"CREATE DATABASE `crud`; USE crud; CREATE TABLE `post` (`idpost` int NOT NULL AUTO_INCREMENT,`title` varchar(45) DEFAULT NULL,`content` varchar(255) DEFAULT NULL,`date` datetime DEFAULT NULL,PRIMARY KEY (`idpost`)) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;CREATE TABLE `user` (`iduser` int NOT NULL AUTO_INCREMENT,`name` varchar(45) DEFAULT NULL,`age` int DEFAULT NULL,`email` varchar(45) DEFAULT NULL,PRIMARY KEY (`iduser`)) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
	(err) => {
		if (err) throw "Base de dados já existe";
		console.log("Base de dados criada");
		return;
	}
);

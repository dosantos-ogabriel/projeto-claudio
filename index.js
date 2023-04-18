const express = require("express");
const mysql = require("mysql2");

const pool = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "crud",
});

pool.connect((error) => {
	if (error) throw error;
	console.log("Connected!");
});

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// user routes

server.get("/users", (req, res) => {
	let q = "SELECT * FROM user";
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.json(results);
	});
});
server.get("/users/:id", (req, res) => {
	const { id } = req.params;
	let q = `SELECT * FROM user WHERE iduser = ${parseInt(id)}`;
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.json(results);
	});
});
server.delete("/users/:id", (req, res) => {
	const { id } = req.params;
	let q = `DELETE FROM user WHERE iduser = ${id}`;
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.send("User deleted");
	});
});
server.post("/users", (req, res) => {
	const { name, age, email } = req.body;
	let q = `INSERT INTO user (name, age, email) values ("${name}", ${parseInt(
		age
	)}, "${email}")`;
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.send("User added");
	});
});
server.put("/users/:id", (req, res) => {
	const { name, age, email } = req.body;
	const { id } = req.params;
	let q = `UPDATE user SET name = "${name}", age = ${parseInt(
		age
	)}, email = "${email}" WHERE iduser = ${parseInt(id)}`;
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.send("User updated");
	});
});

// post routes

server.get("/posts", (req, res) => {
	let q = "SELECT * FROM post";
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.json(results);
	});
});
server.get("/posts/:id", (req, res) => {
	const { id } = req.params;
	let q = `SELECT * FROM post WHERE idpost = ${parseInt(id)}`;
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.json(results);
	});
});
server.delete("/posts/:id", (req, res) => {
	const { id } = req.params;
	let q = `DELETE FROM post WHERE idpost = ${parseInt(id)}`;
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.send("Post deleted");
	});
});
server.post("/posts", (req, res) => {
	const { title, content } = req.body;
	let q = `INSERT INTO post (title, content, date) values ("${title}", "${content}", "${new Date()
		.toISOString()
		.slice(0, 19)
		.replace("T", " ")}")`;
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.send("Post added");
	});
});
server.put("/posts/:id", (req, res) => {
	const { title, content, date } = req.body;
	const { id } = req.params;
	let q = `UPDATE post SET title = "${title}", content = "${content}", date = "${new Date()
		.toISOString()
		.slice(0, 19)
		.replace("T", " ")}" WHERE idpost = ${parseInt(id)}`;
	pool.query(q, (err, results) => {
		if (err) res.send(err);
		res.send("Post updated");
	});
});

server.listen(3000);

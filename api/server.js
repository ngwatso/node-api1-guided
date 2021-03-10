// !! IMPORTS AT THE TOP
const express = require('express');
const Dog = require('./dog-model');

// !! INSTANCE OF EXPRESS APP
const server = express();

// !! GLOBAL MIDDLEWARE
server.use(express.json());

// !! ENDPOINTS

// ?? [GET] / (Hello World endpoint)
server.get('/', (req, res) => {
	res.json({ hello: 'world' });
});

// ?? [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const dog = await Dog.findById(id);
		if (dog) {
			res.json(dog);
		} else {
			res.status(404).json({ message: 'bad id' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
});

// ?? [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get('/api/dogs', async (req, res) => {
	try {
		const dogs = await Dog.findAll();
		res.json(dogs);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
});

// ?? [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', async (req, res) => {
	const dog = req.body;

	if (!dog.name || !dog.weight) {
		res.status(400).json({ message: 'name and weight required' });
	} else {
		try {
			const newDog = await Dog.create(dog);
			res.status(200).json(newDog);
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: err });
		}
	}
});

// ?? [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', async (req, res) => {
	const { id } = req.params;
	const dog = req.body;
	try {
		const updatedDog = await Dog.update(id, dog);
		if (dog) {
			res.json(dog);
		} else {
			res.status(404).json({ message: 'bad id' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
});

// ?? [PATCH] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.patch('/api/dogs/:id', async (req, res) => {
	const { id } = req.params;
	const dog = req.body;
	try {
		const updatedDog = await Dog.modify(id, dog);
		if (dog) {
			res.json(dog);
		} else {
			res.status(404).json({ message: 'bad id' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
});

// ?? [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const dog = await Dog.delete(id);
		if (dog) {
			res.json(dog);
		} else {
			res.status(404).json({ message: 'bad id' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
});

// !! EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;

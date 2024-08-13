const express = require('express')
const fs = require('fs')

const app = express()
const users = require('./users.json')
const port = 3000


// MIDDLEWARES 

app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {

	const log = `${String(Date.now()).padEnd(10)}   ${req.method.padEnd(10)}   ${req.httpVersion.padEnd(4)}   ${req.path}\n`
	fs.appendFile('logs.txt', log, (err, data) => {
		next()
	})

})


// ROUTES

app.get('/api/users', (req, res) => {
	return res.json(users)
})

app.route('/api/users/:id')
	.get((req, res) => {
		const id = Number(req.params.id)
		const user = users.find(user => user.id === id)
		return res.json(user)
	})
	.patch((req, res) => {
		const id = Number(req.params.id)
		const details = req.body
		const buildUsers = users.map(user => {
			if (user.id === id) {
				return {
					id: user.id,
					first_name: details.first_name ?? user.first_name,
					last_name: details.last_name ?? user.last_name,
					email: details.email ?? user.email,
					gender: details.gender ?? user.gender,
				}
			}
			return user
		})
		fs.writeFile('./users.json', JSON.stringify(buildUsers), (err, data) => {
			res.send({status: 'success'})
		})
	})
	.delete((req, res) => {
		const id = Number(req.params.id)
		const buildUsers = users.filter(user => user.id !== id)
		fs.writeFile('./users.json', JSON.stringify(buildUsers), (err, data) => {
			res.send({status: 'success'})
		})
	})

app.post('/api/users', (req, res) => {
	const { first_name, last_name, email, gender} = req.body

	if ( !first_name || !last_name || !email || !gender ) {
		return res.status(400).json({ status: 'error', message: 'Missing Parameters'})
	}

	const id = users[users.length-1].id + 1
	const user = { id, first_name, last_name, email, gender }
	users.push(user)
	fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
		return res.status(201).json({status: 'success', user})
	})
})

app.listen(port, () => {
	console.log(`Server : http://127.0.0.1:${port}`)
})
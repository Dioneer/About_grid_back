import formidable from 'formidable';
import path from 'path';
import { saveUserData } from '../db.connection/saveUserData.js';
import { createWriteStream, unlink, stat } from 'fs';

export const parserJSON = async (req, res, answer = 'ok') => {
	res.send = () => {
		try {
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')
			res.writeHead(200, { "Content-type": "application/json" });
			res.end(JSON.stringify(answer))
		} catch (e) {
			throw new Error("Middleware parserJSON", e.message)
		}
	}
}

export const parserURL = (baseURL) => (req, res) => {
	const url = new URL(req.url, baseURL)
	const params = {}
	url.searchParams.forEach((value, key) => { params[key] = value })
	req.pathname = url.pathname
	req.params = params;
}

const saveFile = async (fields) => {
	return new Promise((resolve, reject) => {
		const stream = createWriteStream(path.join(path.resolve('text.json')), 'utf-8');
		stream.write(fields);
		stream.on('finish', () => stat(path.join(path.resolve('text.json')), (err) => { err ? reject(err) : resolve() }));
		stream.on('error', (e) => unlink(path.join(path.resolve('text.json')), (e) => reject(e.message)));
		stream.end();
	});
};

export const parserMultyForm = async (req, res) => {
	try {
		const form = formidable({ multiples: true });
		form.parse(req, async (err, fields) => {
			if (err) { throw new Error("Err of vlidation form-data", err.message); }
			const obj = {
				'name': String(fields.name),
				'email': String(fields.email),
				'message': String(fields.textarea),
			};
			const string = JSON.stringify(obj);
			await saveUserData(obj.name, obj.email, obj.message);
			await saveFile(string);
		})

	} catch (e) {
		throw new Error("Middleware parserMultyForm", e.message)
	}
}

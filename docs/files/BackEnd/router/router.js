export class Router {
	constructor() {
		this.endpoints = {}
	}
	request(path, method = 'GET', handler) {
		if (!this.endpoints[path]) {
			this.endpoints[path] = {}
		}
		let endpoint = this.endpoints[path]
		if (endpoint[method]) {
			throw new Error(`This ${method} at the address ${path} exists`)
		}
		endpoint[method] = handler
	}
	get(path, handler) {
		this.request(path, "GET", handler)
	}
	post(path, handler) {
		this.request(path, "POST", handler)
	}
	put(path, handler) {
		this.request(path, "PUT", handler)
	}
	delete(path, handler) {
		this.request(path, "DELETE", handler)
	}
}


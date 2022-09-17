class Documents {
	_entries = [];
	_listeners = [];

	_notify() {
		this._listeners.forEach((cb) => {
			cb(this._entries);
		});
	}

	subscribe(cb) {
		this._listeners.push(cb);
		cb(this._entries);

		return () => {
			this._listeners = this._listeners.filter((_cb) => _cb !== cb);
		};
	}

	remove(document) {
		this._entries = this._entries.filter(
			(doc) => doc.id !== document || doc !== document
		);
		this._notify();
	}

	removeAll() {
		this._entries = [];
		this._notify();
	}

	add(document) {
		this._entries.push(document);
		this._notify();
	}

	addAll(documents) {
		this._entries = documents;
		this._notify();
	}

	get() {
		return this._entries;
	}

	update(callback) {
		this._entries = callback(this._entries);
		this._notify();
	}
}

export class PluginProvider {
	documents = new Documents();

	constructor() {}
}

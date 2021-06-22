import Subject from './Subject';

function _parseItem(_stringified, _storageType) {
    if (_storageType === 'object') return JSON.parse(_stringified);
    if (_storageType === 'string') return _stringified;
    if (_storageType === 'number') return Number(_stringified);
    if (_storageType === 'boolean') return Boolean(_stringified);
    throw new Error('unsupported type');
}

// Support only plain objects and primitives of number, string, boolean.
// The types of initState and following states should be contant. 
export default class StorageSubject extends Subject {
    constructor(storage, storageKey, initState) {
        if (!('getItem' in storage) || !('setItem' in storage)) {
            throw new Error('`storage` should be an instance of `Storage` or of that interface.')
        }
        if (typeof storageKey !== 'string' || storageKey === '') {
            throw new Error('`storageKey` should be a non-empty string.');
        }

        const storageTypeKey = `typeof-${storageKey}`;
        const storageType = storage.getItem(storageTypeKey);
        if (storageType) { // old
            super(_parseItem(storage.getItem(storageKey), storageType));
            this.type = storageType;
            this.key = storageKey;
            this.storage = storage;
        } else { // fresh
            super(initState);
            this.type = typeof this.state;
            this.key = storageKey; // duplicated because this._save uses these properties.
            this.storage = storage;
            storage.setItem(storageTypeKey, this.type);
            this._save(this.state)
        }

        window.addEventListener('storage', e => {
            const storedItem = this.storage.getItem(this.key);
            if (e.key === this.key && storedItem !== this._getSnapshot()) { // chrome exclude itself from targets. but I do not know others.
                this.setState(this._parse(storedItem));
            }
        })
    }

    _stringify(v) {
        return this.type === 'object' ? JSON.stringify(v) : String(v)
    }

    _parse(stringified) {
        return _parseItem(stringified, this.type)
    }

    _setSnapshot(v) {
        return this.snapshot = this._stringify(v);
    }

    _getSnapshot() {
        return this.snapshot;
    }

    _save(v) {
        this.storage.setItem(this.key, this._setSnapshot(v));
    }

    // _load() {
    //     return this._parse(this.storage.getItem(this.key))
    // }

    setState(v) {
        super.setState(v) && this._save(this.state); // v could be a function 
    }
}
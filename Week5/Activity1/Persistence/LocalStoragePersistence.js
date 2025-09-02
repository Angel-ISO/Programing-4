import Persistence from './Persistence.js';

export default class LocalStoragePersistence extends Persistence {
    constructor(keyPrefix = "petstore_") {
        super();
        this.keyPrefix = keyPrefix;
    }

    saveData(filename, data) {
        try {
            const key = this.keyPrefix + filename;
            const jsonData = JSON.stringify(data, null, 2);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(key, jsonData);
            } else {
                this._storage = this._storage || {};
                this._storage[key] = jsonData;
            }
            return true;
        } catch (error) {
            console.error("Error al guardar datos:", error);
            return false;
        }
    }

    loadData(filename) {
        try {
            const key = this.keyPrefix + filename;
            let jsonData;
            
            if (typeof localStorage !== 'undefined') {
                jsonData = localStorage.getItem(key);
            } else {
                this._storage = this._storage || {};
                jsonData = this._storage[key];
            }
            
            return jsonData ? JSON.parse(jsonData) : null;
        } catch (error) {
            console.error("Error al cargar datos:", error);
            return null;
        }
    }

    deleteData(filename) {
        try {
            const key = this.keyPrefix + filename;
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(key);
            } else {
                this._storage = this._storage || {};
                delete this._storage[key];
            }
            return true;
        } catch (error) {
            console.error("Error al eliminar datos:", error);
            return false;
        }
    }
}
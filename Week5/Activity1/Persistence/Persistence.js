export default class Persistence {
    saveData(filename, data) {
        throw new Error("Método abstracto debe ser implementado");
    }

    loadData(filename) {
        throw new Error("Método abstracto debe ser implementado");
    }

    deleteData(filename) {
        throw new Error("Método abstracto debe ser implementado");
    }
}

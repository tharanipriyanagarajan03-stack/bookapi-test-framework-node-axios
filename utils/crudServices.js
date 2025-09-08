const apiClient = require("./apiClient");

class crudServices {

    static async create(endpoint, data) {

        return apiClient.post(endpoint, data);

    }

    static async read(endpoint) {

        return apiClient.get(endpoint);

    }

    static async update(endpoint, data) {

        return apiClient.put(endpoint, data);

    }

    static async delete(endpoint, data) {

        return apiClient.delete(endpoint, data);

    }

}

module.exports = crudServices;

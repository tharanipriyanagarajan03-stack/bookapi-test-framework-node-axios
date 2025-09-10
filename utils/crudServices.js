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

    static async delete(endpoint, header) {

        return apiClient.delete(endpoint, header);

    }

}

module.exports = crudServices;

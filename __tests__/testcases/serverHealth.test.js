const CrudService = require("../../utils/crudServices");
const endpoints = require("../../config/endPoints");
const Ajv = require('ajv');
const ajv = new Ajv();
const userSchema = require("../../schemas/userSchema");

describe("Validating Server Health", () => {

    test("01 - Check Health Status", async () => {

        const response = await CrudService.read(endpoints.HEALTH);

        //Schema Validation
        const validate = ajv.compile(userSchema.healthCheckSchema);
        const schemaValidation = validate(response.data); // Validate API response

        //Assertions
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.status).toBe("up");

    });
});
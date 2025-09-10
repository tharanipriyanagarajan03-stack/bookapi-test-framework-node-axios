const CrudService = require("../../utils/crudServices");
const { generateUser } = require("../../utils/randomDataSeeder");
const endpoints = require("../../config/endPoints");
const Ajv = require('ajv');
const ajv = new Ajv();
const userSchema = require("../../schemas/userSchema");

describe("Account Creation Test", () => {

    beforeAll(async () => {
        global.GeneratedUser = generateUser();
    });

    test("01 - Sign up a new user", async () => {

        const user = global.GeneratedUser;
        const response = await CrudService.create(endpoints.AUTH.SIGNUP, {
            id: user.id,
            email: user.email,
            password: user.password,
        });

        //Schema Validation
        const validate = ajv.compile(userSchema.signupSchema);
        const schemaValidation = validate(response.data); // Validate API response

        //Assertions
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.message).toBe("User created successfully");

    });

    test("02 - Login with Created User and receive Access Token", async () => {

        const loginDetails = global.GeneratedUser;
        const response = await CrudService.create(endpoints.AUTH.LOGIN, {
            id: loginDetails.id,
            email: loginDetails.email,
            password: loginDetails.password
        });

        //Schema Validation
        const validate = ajv.compile(userSchema.loginSchema);
        const schemaValidation = validate(response.data); // Validate API response

        //Assertions
        expect(response.data.access_token).not.toBeNull();
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.token_type).toBe("bearer");

        global.ACCESS_TOKEN = response.data.access_token;

    });

});
const CrudService = require("../utils/crudServices");
const endpoints = require("../config/endPoints");
const {stringFormat} = require("../utils/common");
const {getUserId, getEmail, getPassword} = require("../config/envConfig");

describe("Validating Negative Scenarios", () => {

    beforeAll(async () => {
        const response = await CrudService.create(endpoints.AUTH.LOGIN, {
            id: getUserId(),
            email: getEmail(),
            password: getPassword()
        });

        expect(response.status).toBe(200);
        global.ACCESS_TOKEN = response.data.access_token;
    });

    test("01 - Trying to delete already deleted book should return 404", async () => {
        const bookID = 5674;
        const response = await CrudService.delete(stringFormat(endpoints.BOOK.DELETE_BOOK_BY_ID, bookID));

        //Assertions
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.detail).toBe('Book not found');
    });

    test("02 - Invalid Json format should return 422", async () => {

        const invalidJson = `{"id": 12345,"email": "tharani@gmail","password": "tharani123",}`;
        const response = await CrudService.create(endpoints.AUTH.LOGIN, invalidJson)

        //Assertions
        expect(response.status).toBe(422);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.detail[0].msg).toBe('Input should be a valid dictionary or object to extract fields from');
    });

    test("03 - Create an existing user should fail with 400", async () => {

        const existingUser = {id: getUserId(), email: getEmail(), password: getPassword(),};

        console.log("Adding an existing user...");

        const response = await CrudService.create(endpoints.AUTH.SIGNUP, existingUser);

        // Assertions
        expect(response.status).toBe(400);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.detail).toBe("Email already registered");

        console.log("Unable to add an existing user!!!!");
    });

    test("04 - Get book with invalid ID should return 422", async () => {
        console.log("Fetching book with invalid ID...");

        const response = await CrudService.read(
            stringFormat(endpoints.BOOK.GET_BOOK_BY_ID, "inalid_id"),
            {headers: {Authorization: `Bearer ${global.ACCESS_TOKEN}`}}
        );

        // Assertions
        expect(response.status).toBe(422);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.detail[0].msg)
            .toBe("Input should be a valid integer, unable to parse string as an integer");

        console.log("Request failed as expected due to invalid ID!");
    });
});
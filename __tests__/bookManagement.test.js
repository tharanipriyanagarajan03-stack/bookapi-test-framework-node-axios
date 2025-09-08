const CrudService = require("../utils/crudServices");
const { generateUser, createRandomBook } = require("../utils/randomDataSeeder");
const endpoints = require("../config/endPoints");
const { stringFormat } = require("../utils/common");
const Ajv = require('ajv');
const ajv = new Ajv();
const bookSchema = require("../schemas/bookSchema");
const userSchema = require("../schemas/userSchema");

let accessToken = [];

describe("Book Management API Test", () => {

    beforeAll(async () => {
        global.GeneratedUser = generateUser();
    });

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

    test("02 - Sign up a new user", async () => {
        
        const user = global.GeneratedUser;
        const response = await CrudService.create(endpoints.AUTH.SIGNUP, { id: user.id, email: user.email, password: user.password, });

        //Schema Validation
        const validate = ajv.compile(userSchema.signupSchema);
        const schemaValidation = validate(response.data); // Validate API response
        
        //Assertions
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.message).toBe("User created successfully");

        console.log(response.data)

    });

    test("03 - Login with Created User and receive Access Token", async () => {
        
        const loginDetails = global.GeneratedUser;
        const response = await CrudService.create(endpoints.AUTH.LOGIN, { id: loginDetails.id, email: loginDetails.email, password: loginDetails.password });

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

        console.log(response.data)

    });

    test("04 - Create a new book Data", async () => {

        const bookData = createRandomBook();
        const response = await CrudService.create(endpoints.BOOK.CREATE_BOOK, bookData);

        //Schema Validation
        const validate = ajv.compile(bookSchema.createBookSchema);
        const schemaValidation = validate(response.data); // Validate API response
        
        //Assertions
        expect(response.status).toBe(200);
        global.bookId = response.data.id; // capture new book ID
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data).toMatchObject(bookData);
    });

    test("05 - Update Book Data Values", async () => {

        const updatedBookData = createRandomBook();
        const response = await CrudService.update(stringFormat(endpoints.BOOK.UPDATE_BOOK_DATA, global.bookId), { id: global.bookIdname, author: updatedBookData.author, published_year: updatedBookData.published_year, book_summary: updatedBookData.book_summary });

        //Schema Validation
        const validate = ajv.compile(bookSchema.updateBookSchema);
        const schemaValidation = validate(response.data); // Validate API response

        //Assertions
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');
    });

    test("06 - Get Book Details", async () => {

        const response = await CrudService.read(stringFormat(endpoints.BOOK.GET_BOOK_BY_ID, global.bookId));
         //Schema Validation
        const validate = ajv.compile(bookSchema.getBookSchema);
        const schemaValidation = validate(response.data); // Validate API response
        
        //Assertions
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');

    });

    test("07 - Get All Books Details", async () => {

        const response = await CrudService.read(endpoints.BOOK.GET_ALL_BOOKS);

        //Schema Validation
        const validate = ajv.compile(bookSchema.getAllBooksSchema);
        const schemaValidation = validate(response.data); // Validate API response

        //Assertions
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');

    });

    test("08 - Delete Book", async () => {

        const response = await CrudService.delete(stringFormat(endpoints.BOOK.DELETE_BOOK_BY_ID, global.bookId));

        //Schema Validation
        const validate = ajv.compile(bookSchema.deleteBookSchema);
        const schemaValidation = validate(response.data); // Validate API response
        
        //Assertions
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');

        console.log(response.data)

    });

    //Negative scenarios

    test("09 - Trying to delete already deleted book", async () => {

        const response = await CrudService.delete(stringFormat(endpoints.BOOK.DELETE_BOOK_BY_ID, global.bookId));

        //Assertions
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.detail).toBe('Book not found');
    });

    test("10 - Invalid Json format", async () => {

        const invalidJson = `{"id": 12345,"email": "tharani@gmail","password": "tharani123",}`;
        const response = await CrudService.create(endpoints.AUTH.LOGIN, invalidJson)

        //Assertions
        expect(response.status).toBe(422);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.data.detail[0].msg).toBe('Input should be a valid dictionary or object to extract fields from');
    });

});
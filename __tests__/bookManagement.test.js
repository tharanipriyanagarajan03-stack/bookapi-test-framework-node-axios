const CrudService = require("../utils/crudServices");
const { createRandomBook } = require("../utils/randomDataSeeder");
const endpoints = require("../config/endPoints");
const { stringFormat } = require("../utils/common");
const Ajv = require('ajv');
const ajv = new Ajv();
const { getUserId, getEmail, getPassword } = require("../config/envConfig");
const bookSchema = require("../schemas/bookSchema");

describe("Book Management API Test", () => {

    beforeAll(async () => {
        const response = await CrudService.create(endpoints.AUTH.LOGIN, {
            id: getUserId(),
            email: getEmail(),
            password: getPassword()
        });

        expect(response.status).toBe(200);
        global.ACCESS_TOKEN = response.data.access_token;
    });

    test("01 - Create a new book Data", async () => {

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

    test("02 - Update Book Data Values", async () => {

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

    test("03 - Get Book Details", async () => {

        const response = await CrudService.read(stringFormat(endpoints.BOOK.GET_BOOK_BY_ID, global.bookId));
         //Schema Validation
        const validate = ajv.compile(bookSchema.getBookSchema);
        const schemaValidation = validate(response.data); // Validate API response
        
        //Assertions
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');

    });

    test("04 - Get All Books Details", async () => {

        const response = await CrudService.read(endpoints.BOOK.GET_ALL_BOOKS);

        //Schema Validation
        const validate = ajv.compile(bookSchema.getAllBooksSchema);
        const schemaValidation = validate(response.data); // Validate API response

        //Assertions
        expect(response.status).toBe(200);
        expect(schemaValidation).toBe(true); // Pass test if schema matches
        expect(response.headers['content-type']).toContain('application/json');

    });

    test("05 - Delete Book", async () => {

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

});
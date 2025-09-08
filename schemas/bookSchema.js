const createBookSchema = {
  type: "object",
  properties: {
    id: {type: "number"},
    name: { type: "string" },
    author: { type: "string" },
    published_year: { type: "number" },
    book_summary: { type: "string" }
  },
  required: ["name", "author", "published_year", "book_summary"],
  additionalProperties: false
};

const updateBookSchema = {
  type: "object",
  properties: {
    id: {type: "number"},
    name: { type: "string" },
    author: { type: "string" },
    published_year: { type: "number" },
    book_summary: { type: "string" }
  },
  required: ["name", "author", "published_year", "book_summary"],
  additionalProperties: false
};

const getBookSchema = {
  type: "object",
  properties: {
    id: {type: "number"},
    name: { type: "string" },
    author: { type: "string" },
    published_year: { type: "number" },
    book_summary: { type: "string" }
  },
  required: ["name", "author", "published_year", "book_summary"],
  additionalProperties: false
};

const getAllBooksSchema = {
  type: "array",
  items: createBookSchema
};

const deleteBookSchema = {
  type: "object",
  properties: {
    message: {type: "string"}
  },
  required: ["message"],
  additionalProperties: false
};

module.exports = { createBookSchema, updateBookSchema, getBookSchema, getAllBooksSchema, deleteBookSchema};
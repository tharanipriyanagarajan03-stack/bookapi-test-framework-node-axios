const signupSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
  additionalProperties: false
};

const loginSchema = {
  type: "object",
  properties: {
    access_token: { type: "string" },
    token_type: { type: "string" },
  },
  required: ["access_token","token_type"],
  additionalProperties: false
};

const healthCheckSchema = {
  type: "object",
  properties: {
    status: { type: "string" },
  },
  required: ["status"],
  additionalProperties: false
};

module.exports = { loginSchema, signupSchema, healthCheckSchema};
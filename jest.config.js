module.exports = {
    testEnvironment: "jest-environment-node",
    testResultsProcessor: "jest-junit",
    verbose: true,
    testMatch: ["**/__tests__/*.test.js"],
    reporters: [
    "default",
    ["jest-html-reporters", {
      publicPath: "./html-report",
      filename: "report.html",
      expand: true
    }]
  ]
};

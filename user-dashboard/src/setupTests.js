import "@testing-library/jest-dom"

// polyfill TextEncoder/TextDecoder for environments where they're not defined
// (react-router / some libs expect them in the test environment)
if (typeof global.TextEncoder === "undefined") {
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const {TextEncoder, TextDecoder} = require("util")
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// You can add other global test setup here if needed in future

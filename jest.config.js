export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/utils/setupTests.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transforma arquivos .js e .jsx usando o Babel
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mapeia arquivos CSS para o identity-obj-proxy
  },
};

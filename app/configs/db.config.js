module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Admin@123",
    DB: "testdb", 
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
function connect() {
    const { Pool } = require("pg");
  
    const pool = new Pool({
      user: "ghqojmxdocvceo",
      host: "ec2-107-21-102-221.compute-1.amazonaws.com",
      database: "dbr5vpu7tsj9vt",
      password:
        "734cf8a90a76acdb337aca6243a8b3092016499aaf9e67759951cad797a3c3ba",
      port: 5432,
      ssl: true
    });
  
    return pool
  }
  module.exports = connect;
  
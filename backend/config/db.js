const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://college_world_user:5O5lL9pVrFm4Vgc3qRrJ9AVe8uML8kw8@dpg-d83lq699rddc738jbpk0-a.ohio-postgres.render.com/college_world", // paste here
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
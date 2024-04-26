db = db.getSiblingDB("admin");

db.createUser({
  user: "root",
  pwd: "123456",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
});

db = db.getSiblingDB("course_db");

db.createCollection("course_collection");

db.course_collection.insertMany([]);

const env = process.env.NODE_ENV;
if (env == "production") { }
else if (env == "test") {
  process.env.PORT = 3001
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoTest"
} else {
  process.env.PORT = 3000
  process.env.MONGODB_URI = "mongodb://localhost:27017/Todo"
}
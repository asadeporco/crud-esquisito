module.exports = (app) => {
    const App = require("../controllers/app.controller.js");
  
    app.post("/api/todo", App.create);
  
    app.get("/api/todo", App.findAll);
  
    app.get("/api/todo/:messageId", App.findOne);
  
    app.put("/api/todo/:messageId", App.update);
  
    app.delete("/api/todo/:messageId", App.delete);
  };
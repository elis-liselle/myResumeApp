const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myResumeAppDB", {
  useUnifiedTopology: true,
});

require("./user");
require("./resume");

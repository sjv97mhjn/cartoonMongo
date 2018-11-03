var express = require("express");
var router  = express.Router();
var routes = {
  views: {
	backend: require("./views/backend"),
	frontend:require("./views/frontend")
  }
}
// Routes

//FrontEnd
router.get("/",routes.views.frontend.index);

//Backend
router.get("/imdb",routes.views.backend.index);


module.exports = router ;
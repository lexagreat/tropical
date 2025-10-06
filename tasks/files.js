const { src, dest } = require("gulp");
const changed = require("gulp-changed");
const bs = require("browser-sync");
const plumber = require("gulp-plumber");

module.exports = function files() {
   return src("src/files/**/*")
      .pipe(plumber())
      .pipe(changed("build/files"))
      .pipe(dest("build/files"))
      .pipe(bs.stream());
};

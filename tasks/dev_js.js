const { src, dest } = require("gulp");
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const map = require("gulp-sourcemaps");
const bs = require("browser-sync");

module.exports = function dev_js() {
   return src(["src/components/**/*.js", "src/js/app.js"])
      .pipe(map.init())
      .pipe(concat("app.js")) // Создаем неминифицированный app.js
      .pipe(dest("build/js/")) // Сохраняем app.js
      .pipe(uglify()) // Минифицируем код
      .pipe(concat("app.min.js")) // Создаем main.min.js (или app.min.js)
      .pipe(map.write("../sourcemaps"))
      .pipe(dest("build/js/")) // Сохраняем app.min.js
      .pipe(bs.stream());
};

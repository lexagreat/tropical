const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const bulk = require("gulp-sass-bulk-importer");
const prefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean-css");
const concat = require("gulp-concat");
const map = require("gulp-sourcemaps");
const bs = require("browser-sync");

module.exports = function style() {
   return src("src/scss/style.scss")
      .pipe(map.init())
      .pipe(bulk())
      .pipe(sass().on("error", sass.logError))
      .pipe(
         prefixer({
            overrideBrowserslist: ["last 8 versions"],
         })
      )
      .pipe(dest("build/css/")) // Запись style.css
      .pipe(bs.stream()) // 🔥 Добавляем стрим после style.css

      .pipe(clean({ level: 2 }))
      .pipe(concat("style.min.css"))
      .pipe(map.write("../sourcemaps/"))
      .pipe(dest("build/css/")) // Запись style.min.css
      .pipe(bs.stream()); // Уже был, оставляем
};

var gulp = require("gulp");
var copy = require("gulp-copy");
var rename = require("gulp-rename");
var less = require("gulp-less");
var cleanCSS = require("gulp-clean-css");
var connect = require("gulp-connect");

var bootstrapFile = [
    "node_modules/bootstrap/dist/js/bootstrap.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
    "node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
    "node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
    "node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
    "node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"
];

var imgFiles = [
    "src/img/favicon.png",
    "src/img/gnode-logo-white.png"
];

gulp.task("less", function() {
    return gulp.src("src/less/bootstrap.less")
        .pipe(less())
        .pipe(gulp.dest("build/css/"));
});

gulp.task("css", ["less"], function () {
   return gulp.src(["build/css/*.css", "!build/css/*.min.css"])
       .pipe(cleanCSS())
       .pipe(rename({"suffix": ".min"}))
       .pipe(gulp.dest("build/css/"))
       .pipe(connect.reload())
});

gulp.task("copy-bootstrap", function () {
    return gulp.src(bootstrapFile)
        .pipe(copy("build", {"prefix": 3}))
});

gulp.task("copy-img", function () {
    return gulp.src(imgFiles)
        .pipe(copy("build", {"prefix": 1}))
});

gulp.task("watch", function() {
    gulp.watch("src/less/*.less", ["css"]);
});

gulp.task("dev", ["watch", "css", "copy-bootstrap", "copy-img"], function () {
    connect.server({
        port: 8084,
        livereload: true
    })
});

gulp.task("default", ["css", "copy-bootstrap", "copy-img"]);

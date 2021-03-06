const glob = require("glob");
const fs = require("fs");
const path = require("path");
const { transInfo, transDifficultyInfo } = require("./utils");
const { pathOrigin, pathDist, originDir, distDir } = require('./constants');

fs.readdir(pathOrigin, (err, dirs) => {
  dirs.forEach(dir => {
    fs.exists(path.resolve(pathDist, dir), exists => {
      if (!exists) {
        fs.mkdir(path.resolve(pathDist, dir), err => {
          if (err) console.log(err);
        });
      } else {
        glob(path.resolve(pathOrigin, dir, "*.jpg"), (err, files) => {
          if (err) {
            console.log(err);
            return;
          }
          files.forEach(file => {
            fs.copyFile(file, file.replace(originDir, distDir), err1 => {
              if (err1) console.log(err1);
            });
          });
        });
        glob(path.resolve(pathOrigin, dir, "*.egg"), (err, files) => {
          if (err) {
            console.log(err);
            return;
          }
          files.forEach(file => {
            fs.copyFile(
              file,
              file.replace(originDir, distDir).replace(/\.egg$/, ".ogg"),
              err1 => {
                if (err1) console.log(err1);
              }
            );
          });
        });

        const infoString = fs.readFileSync(
          path.resolve(pathOrigin, dir, "info.dat"),
          "utf8"
        );
        const infoJson = JSON.parse(infoString);
        fs.writeFile(
          path.resolve(pathDist, dir, "info.json"),
          JSON.stringify(transInfo(infoJson)),
          err1 => {
            if (err1) console.log(err1);
          }
        );

        glob(path.resolve(pathOrigin, dir, "*.dat"), (err, files) => {
          if (err) {
            console.log(err);
            return;
          }
          files.forEach(file => {
            const data20 = JSON.parse(fs.readFileSync(file, "utf8"));
            if (!/info\.dat$/.test(file)) {
              fs.writeFile(
                file.replace(originDir, distDir).replace(/dat$/, "json"),
                JSON.stringify(transDifficultyInfo(data20, infoJson)),
                err1 => {
                  if (err1) console.log(err1);
                }
              );
            }
          });
        });
      }
    });
  });
});

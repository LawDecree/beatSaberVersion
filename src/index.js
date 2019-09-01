const glob = require("glob");
const fs = require("fs");
const path = require("path");
const { transInfo, transDifficultyInfo } = require("./utils");
const pathDir20 = path.resolve(__dirname, "../demo/2.0");
const pathDist = path.resolve(__dirname, "../dist/");

fs.readdir(pathDir20, (err, dirs) => {
  dirs.forEach(dir => {
    fs.exists(path.resolve(pathDist, dir), exists => {
      if (!exists) {
        fs.mkdir(path.resolve(pathDist, dir), err => {
          if (err) console.log(err);
        });
      } else {
        glob(path.resolve(pathDir20, dir, "*.jpg"), (err, files) => {
          if (err) {
            console.log(err);
            return;
          }
          files.forEach(file => {
            fs.copyFile(file, file.replace("demo/2.0", "dist"), err1 => {
              if (err1) console.log(err1);
            });
          });
        });
        glob(path.resolve(pathDir20, dir, "*.egg"), (err, files) => {
          if (err) {
            console.log(err);
            return;
          }
          files.forEach(file => {
            fs.copyFile(
              file,
              file.replace("demo/2.0", "dist").replace(/\.egg$/, ".ogg"),
              err1 => {
                if (err1) console.log(err1);
              }
            );
          });
        });

        const infoString = fs.readFileSync(
          path.resolve(pathDir20, dir, "info.dat"),
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

        glob(path.resolve(pathDir20, dir, "*.dat"), (err, files) => {
          if (err) {
            console.log(err);
            return;
          }
          files.forEach(file => {
            const data20 = JSON.parse(fs.readFileSync(file, "utf8"));
            if (!/info\.dat$/.test(file)) {
              fs.writeFile(
                file.replace("demo/2.0", "dist").replace(/dat$/, "json"),
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

const vite = require("vite");
const process = require("process");
const fs = require("fs");
const path = require("path");

const build = ({ watch = false }) => {
  const projectDir = process.cwd();
  const projectPackegeJson = JSON.parse(
    fs.readFileSync(path.join(projectDir, "package.json"))
  );
  const entryFile = path.join(projectDir, projectPackegeJson.main);

  vite.build({
    build: {
      lib: {
        entry: entryFile,
        name: "plugin",
        fileName: projectPackegeJson.name,
      },
      watch,
      cssCodeSplit: false,
      assetsDir: "",
      outDir: "build",
      rollupOptions: {},
    },
  });
};

const dev = () => build({ watch: true });

module.exports = {
  dev,
  build,
};

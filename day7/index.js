const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
  .trimEnd() // remove ending whitespace
  .split("\n") // split by new line
  .map((line) => line.split(" ")); // split by space

let lastCommand = "";

const updatePaths = (path, paths) => {
  paths[path.name] = path.filesSize;
  return paths;
};

const getFileStructure = (paths, commands) => {
  let pathsCopy = { ...paths };
  let currentPath = { filesSize: 0, name: "" };

  commands.forEach((cmd) => {
    if (cmd[0] === "$") {
      lastCommand = cmd[1];
      if (cmd[1] === "cd") {
        currentPath.filesSize = 0;
        if (cmd[2] === "..") {
          const splittedPath = currentPath.name.split("/");
          splittedPath.pop();
          currentPath.name = splittedPath.join("/");
        } else if (cmd[2] === "/") {
          currentPath.name = "/";
        } else {
          currentPath.name =
            currentPath.name === "/"
              ? `${currentPath.name}${cmd[2]}`
              : `${currentPath.name}/${cmd[2]}`;
        }
      }
    } else {
      if (cmd[0] !== "dir") {
        currentPath.filesSize += parseInt(cmd[0]);
      }
    }
    if (currentPath.name !== "" && lastCommand === "ls") {
      pathsCopy = updatePaths(currentPath, pathsCopy); // update paths
    }
  });

  return pathsCopy;
};

let paths = {};

paths = getFileStructure(paths, lines);

// Part 1
// transform paths object into array
const pathsArray = Object.keys(paths).map((key) => ({
  name: key,
  filesSize: paths[key],
}));

let res = {};
for (let i = 0; i < pathsArray.length; i += 1) {
  let j = i + 1;
  if (res[pathsArray[i].name] === undefined) {
    res[pathsArray[i].name] = pathsArray[i].filesSize;
  }
  while (
    j < pathsArray.length &&
    pathsArray[j].name.includes(pathsArray[i].name)
  ) {
    if (res[pathsArray[i].name] !== undefined) {
      res[pathsArray[i].name] += pathsArray[j].filesSize;
    }
    j += 1;
  }
}

// sum the res object with values below 100000
const sum = Object.values(res).reduce((acc, val) => {
  if (val < 100000) {
    return acc + val;
  }
  return acc;
}, 0);

console.log(sum);

// Part 2
const DISK_SPACE_AVAILABLE = 70000000;
const NEEDED_SPACE = 30000000;

const unusuedSpace = DISK_SPACE_AVAILABLE - res["/"];
const neededSpace = NEEDED_SPACE - unusuedSpace;

const orderedRes = Object.keys(res)
  .sort((a, b) => res[a] - res[b])
  .reduce((acc, key) => {
    acc[key] = res[key];
    return acc;
  }, {});

// find the first key that has a value greater than neededSpace
const firstKey = Object.keys(orderedRes).find((key) => {
  return orderedRes[key] > neededSpace;
});

console.log(orderedRes[firstKey]);

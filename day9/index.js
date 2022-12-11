const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trimEnd()
  .split("\n");

let headPositions = [{ x: 0, y: 0 }];
let tailPositions = [{ x: 0, y: 0 }];

const moveTail = () => {
  const diffX = headPositions.at(-1).x - tailPositions.at(-1).x;
  const diffY = headPositions.at(-1).y - tailPositions.at(-1).y;

  if (diffX === 2 && diffY === 0) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x + 1, y: tailPositions.at(-1).y },
    ];
  }

  if (diffX === -2 && diffY === 0) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x - 1, y: tailPositions.at(-1).y },
    ];
  }

  if (diffX === 0 && diffY === 2) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x, y: tailPositions.at(-1).y + 1 },
    ];
  }

  if (diffX === 0 && diffY === -2) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x, y: tailPositions.at(-1).y - 1 },
    ];
  }

  if (diffX === 1 && diffY === 2) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x + 1, y: tailPositions.at(-1).y + 1 },
    ];
  }

  if (diffX === 1 && diffY === -2) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x + 1, y: tailPositions.at(-1).y - 1 },
    ];
  }

  if (diffX === -1 && diffY === 2) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x - 1, y: tailPositions.at(-1).y + 1 },
    ];
  }

  if (diffX === -1 && diffY === -2) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x - 1, y: tailPositions.at(-1).y - 1 },
    ];
  }

  if (diffX === 2 && diffY === 1) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x + 1, y: tailPositions.at(-1).y + 1 },
    ];
  }

  if (diffX === -2 && diffY === 1) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x - 1, y: tailPositions.at(-1).y + 1 },
    ];
  }

  if (diffX === -2 && diffY === -1) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x - 1, y: tailPositions.at(-1).y - 1 },
    ];
  }

  if (diffX === 2 && diffY === -1) {
    tailPositions = [
      ...tailPositions,
      { x: tailPositions.at(-1).x + 1, y: tailPositions.at(-1).y - 1 },
    ];
  }
};

input.forEach((movement) => {
  const [direction, distance] = movement.split(" ");

  for (let i = 0; i < distance; i++) {
    switch (direction) {
      case "U":
        headPositions = [
          ...headPositions,
          { x: headPositions.at(-1).x, y: headPositions.at(-1).y + 1 },
        ];
        moveTail();
        break;
      case "D":
        headPositions = [
          ...headPositions,
          { x: headPositions.at(-1).x, y: headPositions.at(-1).y - 1 },
        ];
        moveTail();
        break;
      case "R":
        headPositions = [
          ...headPositions,
          { x: headPositions.at(-1).x + 1, y: headPositions.at(-1).y },
        ];
        moveTail();
        break;
      case "L":
        headPositions = [
          ...headPositions,
          { x: headPositions.at(-1).x - 1, y: headPositions.at(-1).y },
        ];
        moveTail();
        break;
    }
  }
});

const positionsOfTail = tailPositions.reduce((acc, position) => {
  const key = `${position.x} ${position.y}`;
  if (!acc[key]) {
    acc[key] = 1;
    return acc;
  }

  acc[key] = acc[key] + 1;

  return acc;
}, {});

const countOfDifferentPositionsOfTail = Object.values(positionsOfTail).length;

console.log(countOfDifferentPositionsOfTail);

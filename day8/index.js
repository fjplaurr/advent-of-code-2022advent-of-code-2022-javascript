const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trimEnd()
  .split("\n")
  .map((line) => line.split(""))
  .map((row) => row.map(Number));

// global variable to store the trees
const trees = {};

const areAllTreesShortestByDirection = (
  treeHorizontalIndex,
  treeVerticalIndex,
  trees,
  direction
) => {
  const treeHeight = trees[treeHorizontalIndex][treeVerticalIndex];

  if (direction === "left") {
    const areAllTreesShortest = trees[treeHorizontalIndex]
      .slice(0, treeVerticalIndex)
      .every((el) => el < treeHeight);
    return areAllTreesShortest;
  }

  if (direction === "right") {
    const areAllTreesShortest = trees[treeHorizontalIndex]
      .slice(treeVerticalIndex + 1, trees[treeHorizontalIndex].length)
      .every((el) => el < treeHeight);
    return areAllTreesShortest;
  }

  if (direction === "top") {
    const areAllTreesShortest = trees
      .slice(0, treeHorizontalIndex)
      .every((row) => row[treeVerticalIndex] < treeHeight);
    return areAllTreesShortest;
  }

  if (direction === "bottom") {
    const areAllTreesShortest = trees
      .slice(treeHorizontalIndex + 1, trees.length)
      .every((row) => row[treeVerticalIndex] < treeHeight);
    return areAllTreesShortest;
  }
};

const updateTrees = ({
  trees,
  treeHorizontalIndex,
  treeVerticalIndex,
  areTreesOnTheLeftShortest,
  areTreesOnTheRightShortest,
  areTreesOnTopShortest,
  areTreesOnBottomShortest,
}) => {
  trees[`${treeHorizontalIndex},${treeVerticalIndex}`] = {
    value: input[treeHorizontalIndex][treeVerticalIndex],
    visible: {
      left: areTreesOnTheLeftShortest,
      right: areTreesOnTheRightShortest,
      top: areTreesOnTopShortest,
      bottom: areTreesOnBottomShortest,
    },
    isVisibleFromSomeDirection:
      areTreesOnTheLeftShortest ||
      areTreesOnTheRightShortest ||
      areTreesOnTopShortest ||
      areTreesOnBottomShortest,
  };
};

const part1 = () => {
  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      const areTreesOnTheLeftShortest = areAllTreesShortestByDirection(
        i,
        j,
        input,
        "left"
      );

      const areTreesOnTheRightShortest = areAllTreesShortestByDirection(
        i,
        j,
        input,
        "right"
      );

      const areTreesOnTopShortest = areAllTreesShortestByDirection(
        i,
        j,
        input,
        "top"
      );

      const areTreesOnBottomShortest = areAllTreesShortestByDirection(
        i,
        j,
        input,
        "bottom"
      );

      updateTrees({
        trees,
        treeHorizontalIndex: i,
        treeVerticalIndex: j,
        areTreesOnTheLeftShortest,
        areTreesOnTheRightShortest,
        areTreesOnTopShortest,
        areTreesOnBottomShortest,
      });
    }
  }

  const visibleInteriorTreesCount = Object.values(trees).reduce(
    (acc, tree) => (tree.isVisibleFromSomeDirection ? acc + 1 : acc),
    0
  );

  const treesInTopAndBottomRows = input[0].length * 2;
  const treesInLeftAndRightColumns = input.length * 2;
  const visibleTreesOnTheEdge =
    treesInTopAndBottomRows + treesInLeftAndRightColumns - 4;

  const totalVisibleTrees = visibleInteriorTreesCount + visibleTreesOnTheEdge;

  // console.log(totalVisibleTrees);
};

part1();

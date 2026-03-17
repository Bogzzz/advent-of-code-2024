const fs = require("fs");

// Read the input file that sits in the same folder as this script
const input = fs.readFileSync("input.txt", "utf8");

// Split the big string into an array of rows
// Each row becomes an array of numbers
const reports = input
  .trim()
  .split("\n")
  .map((line) =>
    line
      .trim() 
      .split(/\s+/)
      .map(Number)
  );

// -------------------------------------------------------
// PART 1 - Check if a row (report) is safe
// A report is safe if:
//   1. All numbers are either going UP or going DOWN
//   2. Each step between two numbers is between 1 and 3
// -------------------------------------------------------
function isSafe(levels) {
  // Build an array of differences between each pair of adjacent numbers
  const diffs = [];
  for (let i = 1; i < levels.length; i++) {
    diffs.push(levels[i] - levels[i - 1]);
  }

  // Check if every step is going UP by 1, 2, or 3
  const allIncreasing = diffs.every((d) => d >= 1 && d <= 3);

  // Check if every step is going DOWN by 1, 2, or 3
  const allDecreasing = diffs.every((d) => d >= -3 && d <= -1);

  // Safe if it's fully increasing OR fully decreasing
  return allIncreasing || allDecreasing;
}

// -------------------------------------------------------
// PART 2 - Same rules but with a "dampener"
// If a report is unsafe, we can try removing ONE number
// If removing that one number makes it safe, it still counts
// -------------------------------------------------------
function isSafeWithDampener(levels) {
  // If it's already safe without removing anything, we're done
  if (isSafe(levels)) return true;

  // Try removing each number one at a time and check if that fixes it
  for (let i = 0; i < levels.length; i++) {
    // Build a new array without the number at index i
    const modified = [...levels.slice(0, i), ...levels.slice(i + 1)];

    // If removing this number makes it safe, return true
    if (isSafe(modified)) return true;
  }

  // Nothing worked, report is truly unsafe
  return false;
}

// Count how many reports are safe for Part 1
const part1 = reports.filter(isSafe).length;

// Count how many reports are safe for Part 2 (with dampener)
const part2 = reports.filter(isSafeWithDampener).length;

console.log("Part 1:", part1); // Answer: 421
console.log("Part 2:", part2); // Answer: 476
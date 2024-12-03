import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Get the absolute path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the absolute path to the file
const filePath = path.join(__dirname, "inputs", "3.txt");
const input = readFileSync(filePath, "utf-8");

function restoreMemory(input) {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const correctData = input.match(regex);

  let total = 0;

  correctData.forEach((expression) => {
    // Loop for correct expressions
    const [a, b] = expression.match(/\d+/g);

    // Multiply only positive numbers
    const multiple = +a * +b;
    total += multiple;
  });
  return total;
}

const result = restoreMemory(input);

console.log(result);

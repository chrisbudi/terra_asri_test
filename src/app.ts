1; //calculate_diagonal_sum(grid_size)
const calculateDiagonal = (gridSize: number) => {
  const matrix = generateMatrix(gridSize);
  let sum = 0;
  for (let i = 0; i < gridSize; i++) {
    sum += matrix[i][i];
    sum += matrix[i][gridSize - 1 - i];
  }

  const middle = Math.floor(gridSize / 2);
  sum -= matrix[middle][middle];

  return sum;
};

const generateMatrix = (n: number) => {
  const matrix = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0)
  );
  let top = 0,
    bottom = n - 1,
    left = 0,
    right = n - 1;
  for (let num = n * n; num >= 1; num) {
    // fill top column
    for (let i = right; i >= left; i--) {
      matrix[top][i] = num;
      num--;
    }
    top++;

    // Fill left column
    for (let i = top; i <= bottom; i++) {
      matrix[i][left] = num;
      num--;
    }
    left++;

    // Fill the bottom row
    for (let i = left; i <= right; i++) {
      matrix[bottom][i] = num;
      num--;
    }
    bottom--;

    // Fill the right column
    for (let i = bottom; i >= top; i--) {
      matrix[i][right] = num;
      num--;
    }
    right--;
  }
  console.log(matrix);
  return matrix;
};

let grid = 5;
console.log(`${grid}: ${calculateDiagonal(grid)}`);
grid = 7;
console.log(`${grid}: ${calculateDiagonal(grid)}`);

2; // find_common_slot(meetings)
console.clear();

type Time = [number, number];
// compare start to second and thrid
const findCommonSlot = (selectedTime: Time[][]): Time[] => {
  let avaTime = selectedTime[0]; // [[9, 12], [14, 16]],

  for (let i = 1; i < selectedTime.length; i++) {
    // get second
    const currentSelectedTime = selectedTime[i]; // [[10, 12], [15, 17]] /
    const mergedTimes: Time[] = [];
    let j = 0,
      k = 0;
    console.log("start while " + i); // 2

    while (j < avaTime.length && k < currentSelectedTime.length) {
      console.log(
        avaTime,
        j,
        "ava Time",
        currentSelectedTime,
        k,
        "curr Time",
        mergedTimes,
        "merge time"
      ); // a=10-12, 15-16; b=11-13, 16-18

      const [start1, end1] = avaTime[j]; // j = 0 [9, 12] / j=1 [14, 16] /@/ [10, 12] / j=1[15, 16]
      const [start2, end2] = currentSelectedTime[k]; // k=0 [10, 12] // k=1 [15, 17] /@/ [11, 13] / [15, 17]

      const start = Math.max(start1, start2); // 10 / 15 / 15 /@/ 11 / 15 / 15
      const end = Math.min(end1, end2); // 12 / 12 / (16-17) - 16 /@/ 12 / 12 / 16

      console.log(start, end, "start-end");
      if (start < end) {
        // 10 - 12 / 15 - 12 / 15 - 16 /@/ 11-12 / 15-12
        mergedTimes.push([start, end]); // 10-12, 15-16 /#/ 11-12
        console.log(mergedTimes, "mergedTimes");
      }

      // console.log(end1, end2)
      if (end1 < end2) j++; // 12, 12 / 12 < 17 /@/ 12-13
      else k++;
    }
    console.log(mergedTimes, "end while");
    avaTime = mergedTimes; // get current max start and min end
  }
  console.log(avaTime, "avaltimes");
  return avaTime;
};

// Example usage:
let selectedTime: Time[][] = [
  [
    [9, 12],
    [14, 16],
  ],
  [
    [10, 12],
    [15, 17],
  ],
  [
    [11, 13],
    [16, 18],
  ],
];

// let selectedTime: Time[][] = [
//      [[8, 10]], [[12, 14]], [[9, 11]]
// ]

const result = findCommonSlot(selectedTime);
console.log(result);

3; // isCircularPaliandrome
const isCircularPalindrome = (word: string): boolean => {
  let result = false;
  let count = 0;

  for (let i = 0; i < word.length - 1; i++) {
    if (word[i].toUpperCase() === word[word.length - (i + 1)].toUpperCase()) {
      // 2 = b b //3 a a
      count++;
      if (count === word.length - 1) {
        result = true;
      }
    }
  }
  return result;
};

console.log(isCircularPalindrome("racecar"));

console.log(isCircularPalindrome("hello world"));

console.log(isCircularPalindrome("mAlAyAlaM"));

4; //
console.clear();

const getDigitSum = (n: number): number => {
  let numberText = String(n);
  let sum = 0;
  for (let i = 0; i < numberText.length; i++) {
    sum += parseInt(numberText[i]);
  }
  return sum;
};

const selfNumberSum = (): number => {
  const minN = 1;
  const maxN = 100;
  let totalsum = 0;
  const isSelfNumber: boolean[] = new Array(maxN).fill(true);

  for (let i = minN; i <= maxN; i++) {
    const dn = getDigitSum(i);
    const num = i + dn;
    if (num <= maxN) {
      isSelfNumber[num] = false;
    }
  }

  for (let i = 1; i <= maxN; i++) {
    if (isSelfNumber[i]) {
      totalsum += i;
    }
  }
  return totalsum;
};

console.log(selfNumberSum());

5; //
type Emoji = {
  [emoji: string]: string;
};

const decode = (text: string, emojiDict: Emoji): string => {
  const regex = new RegExp(Object.keys(emojiDict).join("|"), "g");

  const decodedText = text.replace(regex, (match) => {
    const phrase = emojiDict[match];
    return phrase ? phrase : match;
  });
  return decodedText;
};

// Example emoji dictionary

const emojiDir: Emoji = {
  "🍔": "burger",
  "🍟": "fries",
  "🍕": "pizza",
  "✈️": "airplane",
  "🛳": "cruise ship",
  "🗺": "map",
  "😄": "happy",
  "😢": "sad",
  "🤔": "thinking",
  "🐝": "bee",
  "🤖": "think",
  "🎊": "celebration",
  "🥷🏼": "keep it secret",
  "☄️": "blast off",
  "🚵‍♀️🎊": "win a race",
};

const textMessage: string =
  "I'm feeling 🤔 about the upcoming ✈️ !trip. Will we see ️🗺 landmarks?";

console.log(decode(textMessage, emojiDir));

const textMessageAdvance: string =
  "🥷🏼! 🎊 for the 🥷🏼 birthday surprise! ☄️ to the party place!";

console.log(decode(textMessageAdvance, emojiDir));

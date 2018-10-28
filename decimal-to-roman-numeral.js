// Convert decimal number into the roman numeral format
function convertToRoman(num) {
  let romanObj = {
    "M": 1000,
    "CM": 900,
    "D": 500,
    "CD": 400,
    "C": 100,
    "XC": 90,
    "L": 50,
    "XL": 40,
    "X": 10,
    "IX": 9,
    "V": 5,
    "IV": 4,
    "I": 1
  };
  let roman = "";
  // Iterate through roman/decimal pairs in romanObj which starts as M/1000
  for (let romanNum in romanObj) {
    // If the number is greater than or equal to the current roman/decimal pair, enter the while loop
    while (num >= romanObj[romanNum]) {
      // Add current roman key to roman variable
      roman += romanNum;
      // Decrement by the value stopped at
      num -= romanObj[romanNum];
    }
  }
 return roman;
}
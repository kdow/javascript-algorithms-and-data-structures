function palindrome(str) {
  // Remove non-alphanumeric characters
  str = str.replace(/[^0-9a-z]/gi, '').toLowerCase();
  
  // Make variable for first half of string
  let firstHalf = str.substr(0, str.length/2);
  
  /* Make variable for last half of string.
  Check if number of characters in string is an even number.
  If odd, add 1 to index in order to exclude character in the middle of the string */
  let lastHalf = str.length % 2 === 0 ? str.substr(str.length/2) : str.substr(str.length/2+1);
  
  // Reverse last half of string
  lastHalf = lastHalf.split("").reverse().join("").toString();
   
  if (firstHalf === lastHalf) {
    return true;
  } else {
    return false;
  }
}
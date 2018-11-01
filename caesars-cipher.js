// Take a ROT13 encoded string and return a decoded string
function rot13(str) { 
  let decoded = "";
  for (let i = 0; i < str.length; i++) {
    let decode = str.charCodeAt(i);
    if (decode >= 65 && decode <= 90) {
      let converted = decode + 13;
      if (converted > 90 ) {
        converted = converted - 26;
      }
      decode = String.fromCharCode(converted);
    } else {
      decode = String.fromCharCode(decode);
    }
    decoded += decode;
  }
  return decoded;
}
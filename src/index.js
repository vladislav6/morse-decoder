const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};

module.exports = function decode(expr) {
  function makeChunks(str, s, e, chunkSize) {
    const chunks = [];
    let start = s;
    let end = e;
    for (let i = 0; i < str.length; i += 1) {
      if (str[start]) {
        chunks.push(str.slice(start, end));
      }
      start += chunkSize;
      end += chunkSize;
    }
    return chunks;
  }
  const chunks = makeChunks(expr, 0, 10, 10);
  let result = [];
  chunks.map((chunk) => {
    if (chunk === '**********') {
      result += ' ';
    } else {
      result += makeChunks(chunk, 0, 2, 2)
        .filter((f) => f !== '00')
        .map((m) => (m === '10' ? '.' : '-'))
        .join('')
        .split()
        .map((m) => MORSE_TABLE[m]);
    }
    return result;
  });
  return result;
};

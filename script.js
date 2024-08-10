const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const form = document.getElementById("passwordGeneratorForm");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const passwordDisplay = document.getElementById("passwordDisplay");

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

const LOWER_CASE_LETTERS = arrayFromLowToHigh(97, 122);
const UPPER_CASE_LETTERS = arrayFromLowToHigh(65, 90);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeUppercaseElement.checked;
  const IncludeSymbols = includeUppercaseElement.checked;
  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    IncludeSymbols
  );
  passwordDisplay.innerText = password;
});

function generatePassword(
  characterAmount,
  includeNumbers,
  includeUppercase,
  includeSymbols
) {
  let charCodes = LOWER_CASE_LETTERS;
  if (includeUppercase) charCodes = charCodes.concat(UPPER_CASE_LETTERS);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

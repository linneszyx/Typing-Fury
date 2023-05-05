const quotes = [
	"Be yourself; everyone else is already taken.",
	"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
	"So many books, so little time.",
	"A room without books is like a body without a soul.",
	"You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
	"You only live once, but if you do it right, once is enough.",
	"Be the change that you wish to see in the world.",
	"In three words I can sum up everything I've learned about life: it goes on.",
];

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("start");
const resultElement = document.getElementById("result");

let currentQuoteIndex = 0;
let startTime = null;
let endTime = null;

function getRandomQuote() {
	return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayQuote() {
	const quote = getRandomQuote();
	quoteElement.innerText = quote;
	inputElement.value = "";
	currentQuoteIndex++;
}

function startGame() {
	startTime = new Date();
	displayQuote();
	inputElement.focus();
	startButton.style.display = "none";
}

function endGame() {
	endTime = new Date();
	const elapsedTimeInSeconds = (endTime - startTime) / 1000;
	const quote = quotes[currentQuoteIndex - 1];
	const typedText = inputElement.value;
	const wordsPerMinute = Math.round((typedText.split(" ").length / elapsedTimeInSeconds) * 60);
	const accuracy = Math.round((getMatchingCharacters(typedText, quote).length / quote.length) * 100);
	resultElement.innerText = `You typed "${typedText}" in ${elapsedTimeInSeconds} seconds with ${wordsPerMinute} words per minute and ${accuracy}% accuracy.`;
	startButton.innerText = "Play Again";
	startButton.style.display = "";
}

function getMatchingCharacters(str1, str2) {
	let matchingCharacters = "";
	for (let i = 0; i < str1.length; i++) {
		if (str1[i] === str2[i]) {
			matchingCharacters += str1[i];
		}
	}
	return matchingCharacters;
}

startButton.addEventListener("click", startGame);

inputElement.addEventListener("input", function() {
	const quote = quotes[currentQuoteIndex - 1];
	const typedText = inputElement.value;
	if (typedText === quote) {
		endGame();
	} else if (quote.startsWith(typedText)) {
		inputElement.classList.remove("error");
	} else {
		inputElement.classList.add("error");
	}
});
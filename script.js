const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
let apiRequestCounter = 0;

// Show Loading
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function hideLoader() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    showLoader();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    hideLoader();
}

// Get Quotes From API
async function getQuotes() {
    showLoader();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error) {
        if (apiRequestCounter <= 10){
            getQuotes();
            alert(error);
            console.log('Whoops, no quote:', error);
            apiRequestCounter += 1;
        } else {
            throw new Error('Too many API Requests. Something is Wrong !!!')
        }
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

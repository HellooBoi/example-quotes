const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
 
// Get Quote From API
async function getQuote() {
    const proxyUrl = 'https://jacinto-cors-proxy.herokuapp.com';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, and 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
    } catch (error) {
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = author.Text.innerText;
    const twitterUtl = `https://twitter.com/intent/tweet?=${quote} - ${author}`;
    window.open(twitterUtl, '_blank');
}

// On Load
getQuote()
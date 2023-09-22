// This postpones the running of all code until the DOM has loaded:
document.addEventListener('DOMContentLoaded', () => {

    // This array contains the image file paths for
    // all images available for cards:
    const cardArray = [
        {
            name: 'bulldog',
            img: 'app_images/bulldog_clipart_100.png',
        },
        {
            name: 'chihauhua',
            img: 'app_images/chihauhua_clipart_100.png',
        },
        {
            name: 'great dane',
            img: 'app_images/dane_clipart_100.png',
        },
        {
            name: 'golden retriever',
            img: 'app_images/golden_retriever_clipart.png',
        },
        {
            name: 'husky',
            img: 'app_images/husky_clipart_100.png',
        },
        {
            name: 'dalmatian',
            img: 'app_images/dalmatian_clipart_100.png',
        },
        {
            name: 'bulldog',
            img: 'app_images/bulldog_clipart_100.png',
        },
        {
            name: 'chihauhua',
            img: 'app_images/chihauhua_clipart_100.png',
        },
        {
            name: 'great dane',
            img: 'app_images/dane_clipart_100.png',
        },
        {
            name: 'golden retriever',
            img: 'app_images/golden_retriever_clipart.png',
        },
        {
            name: 'husky',
            img: 'app_images/husky_clipart_100.png',
        },
        {
            name: 'dalmatian',
            img: 'app_images/dalmatian_clipart_100.png',
        }
    ] 

    // This randomizes the indexes of the cardArray, 
    // which essentially "shuffles" the cards
    cardArray.sort(() => 0.5 - Math.random());

    // Here we are selecting the elements to be worked with from 
    // the DOM and give each element a variable to work with:

    // This variable refers to the <div> where the clickable cards
    // will be displayed:
    const grid = document.querySelector('.grid');
    // This variable refers to the <h3> where the number of matches
    // made will be displayed to the user:
    const resultsDisplay = document.querySelector('#result');
    // This variable refers to the <h3> where the number of attempts
    // to make matches will be displayed to the user:
    const attemptsDisplay = document.querySelector('#tries');
    
    // This variable refers to the array used for keeping track of
    // which were cards chosen in an attempt to make a match:
    let cardsChosen = [];
    // This variable refers to the array used for keeping track of 
    // the IDs of the cards chosen in an attempt to make a match:
    let cardsChosenId = [];
    // This variable refers to the array that holds the cards that were
    // matched, and allows them to be counted in the matchesDisplay: 
    let cardsWon = [];
    // This variable refers to the array that counts the number of times 
    // cards were flipped to be shown in the attemptsDisplay:
    let cardsFlipped = [];
    

    // This function renders the clickable cards onto the screen:
    function createBoard() {
        // Here we iterate through the cardArray:
        for (let i=0; i<cardArray.length; i++) {
            // This creates the <>img> elements for each of the clickable "cards":
            let card = document.createElement('img');
            // This puts the pawprint image on the front of each card:
            card.setAttribute('src', 'app_images/pawprints_clipart_100.png');
            // This gives each card an ID (which is the randomized index of the 
            // image from the cardArray);
            card.setAttribute('data-id', i);
            // This identifies which function will run when the card is clicked:
            card.addEventListener('click', flipCard);
            // This puts the cards onto the gameBoard:
            grid.appendChild(card);
        }
    }

    // This function checks for matches:
    function checkForMatch() {
        // This variable selects all image elements from teh DOM and gives them
        // the variable of "cards":
        let cards = document.querySelectorAll('img');
        // This identifies the first card clicked as the first item in the 
        // cardsChosen array and gives it the variable "optionOneId":
        const optionOneId = cardsChosenId[0];
        // This identifies the second card clicked as the second item in the 
        // cardsChosen array and gives it the variable "optionTwoId":
        const optionTwoId = cardsChosenId[1];
        // This compares the images on the two chosen cards and instructs what to do 
        // if the two images are a match:
        if (cardsChosen[0] === cardsChosen[1]) {
            // This alerts the user that the chosen cards are a match:
            alert('You found a match!');
            // This replaces the images on the matched cards to "blank", indicating
            // that the cards' matches have been found:
            cards[optionOneId].setAttribute('src','app_images/blank_square_100.png');
            cards[optionTwoId].setAttribute('src','app_images/blank_square_100.png');
            // This moves the items from the cardsChosen array into the cardsWon array
            // to be counted in the "resultsDisplay":
            cardsWon.push(cardsChosen);
            // This moves the items from the cardsChosen array into the cardsFlipped array
            // to be counted in the "attemptsDisplay":
            cardsFlipped.push(cardsChosen);
        // This instructs what to do if the two chosen cards are not a match: 
        } else {
            // This flips the cards back over to reveal the pawprint image on the front of the cards:
            cards[optionOneId].setAttribute('src', 'app_images/pawprints_clipart_100.png');
            cards[optionTwoId].setAttribute('src', 'app_images/pawprints_clipart_100.png'); 
            // This puts the items in the cardsChosen array into the cardsFlipped array 
            // to be counted in the "attemptsDisplay":
            cardsFlipped.push(cardsChosen);   
            // This alerts the user that the cards chosen were not a match:
            alert('Sorry. Please try again.');
        }
        // This resets the arrays containing the cardsChosen and CardsChosenId to empty:
        cardsChosen = [];
        cardsChosenId = [];
        // This renders the number of matches made in the resultsDisplay <h3>:
        resultsDisplay.textContent = cardsWon.length;
        // This renders the number of attempts made in the attemptsDisplay <h3>:
        attemptsDisplay.textContent = cardsFlipped.length;
        // This counts the number of cards in the cardsWon array.  If it is 
        // equal to the number of cards in the cardArray, then all of the
        // possible matches have been made:  
        if (cardsWon.length === cardArray.length/2) {
            // This displays that the game has been won in the "Matches" display:
            resultsDisplay.textContent = 'Congratulations! You win!'
        
        }

    }

    // This function will fun whenever a card on the gameBoard is flipped: 
    function flipCard () {
        // This variable refers to the cardArray index of the image that is
        // on the back of the cards:
        let cardId = this.getAttribute('data-id');
        // When a card is clicked, this puts the name of the card (which is
        // the name of the image from the cardArray) into the cardsChosen array:
        cardsChosen.push(cardArray[cardId].name);
        // When a card is clicked, this puts the ID of the card (which is the 
        // data-id created when the card was created in the createBoard function):
        cardsChosenId.push(cardId);
        // This reveals the image on the back of each card:
        this.setAttribute('src', cardArray[cardId].img);
        // Once two cards have been clicked, this delays the running of the
        // checkForMatches function by 500 miliseconds:
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // This runs the createBoard function to begin the game:
    createBoard()


})
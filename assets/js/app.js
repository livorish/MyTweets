
const tweetList = document.getElementById('tweet-list');





// Event listiners
eventListeners();

function eventListeners() {
    document.querySelector('#form').addEventListener('submit', newTweet)
    tweetList.addEventListener('click', removeTweet);
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

// Functions

function newTweet(e) {
    e.preventDefault();
    const tweet = document.getElementById("tweet").value;

    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';



    let li = document.createElement('li');
    li.textContent = tweet;
    tweetList.appendChild(li)

    li.appendChild(removeBtn);

    tweetList.appendChild(li);

    addTweetLocalStorage(tweet);

    alert('Tweet Added');

    this.reset();
}
localStorageOnLoad
function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')){
        e.target.parentElement.remove();
    }
    
    removeTweetLocalStorage(e.target.parentElement.textContent);
}


function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    // Add the tweet into the array
    tweets.push(tweet);

    // Convert tweet array into String
    localStorage.setItem('tweets', JSON.stringify( tweets )  );
}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    // Get the values, if null is returned then we create an empty array
    if(tweetsLS === null) {
         tweets = [];
    } else {
         tweets = JSON.parse( tweetsLS ); 
    }
    return tweets;
}

function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();
    
    tweets.forEach(function(tweet) {
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';
    
        let li = document.createElement('li');
        li.textContent = tweet;
        tweetList.appendChild(li)
    
        li.appendChild(removeBtn);
    
        tweetList.appendChild(li);
    })
}

function removeTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    const tweetDelete = tweet.substring(0, tweet.length - 1);
    
    tweets.forEach(function(tweetLS, index){
        if(tweetDelete === tweetLS){
            tweets.splice(index, 1);
        }
    })

    localStorage.setItem('tweets', JSON.stringify(tweets))
}
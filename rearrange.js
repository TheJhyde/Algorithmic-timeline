var words = ["brands", "BRANDS", "buy", "twitter", "fun", "our machine overloads", "shoes", "moments", "MOMENTS", "ALGORITHMS"];
var tweets = ["HAVE YOU CONSIDERED MOMENTS???", "ALGORITHMS ARE OK BY ME", "BRANDS ARE COOL"];

var frequency = 7000;

var scrambleStream = function(){
	console.log("Scrambling?");
	var ol = $("#stream-items-id");
	var tweets = ol.children('li');
	tweets.detach();
	ol.append(pull_out_tweets(tweets, "brands"));
	frequency /= 1.2;
	setTimeout(scrambleStream, frequency);
 }

setTimeout(scrambleStream, frequency);

//Given this that tweets is a collection, not an array, I don't know why this works
//But it does, so that's nice!
function shuffle(array) {
  var currentIndex = array.length, randomIndex;
  var temporaryValue;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Takes all the tweets that contain a given word and puts them on the top of the list
//Then scrambles them all
function pull_out_tweets(collection, word){
	var goodTweets = [];
	var badTweets = [];
	collection.each(function(){
		if( !hasWord($(this)) ){
			//This tweet doesn't include a significant word, and is therefore bad
			if(Math.random() <= 0.4){
				$(this).find("p.tweet-text").text(tweets[Math.floor(Math.random()*tweets.length)]);
				$(this).find("strong.fullname").text("THE ALGORITHMS");
				$(this).find("span.username").text('@ALGORITHMS');
				badTweets.push($(this));
			}else{
				badTweets.push($(this));
			}
		}else{
			//This tweet does include a significant word, and is therefore good.
			goodTweets.push($(this));
		}
	});
	if(goodTweets.length > 1){
		goodTweets = shuffle(goodTweets);
	}
	if(badTweets.length > 1){
		badTweets = shuffle(badTweets);
	}
	return $.merge(goodTweets, badTweets);
}

//Checks a tweet for one of the important words
function hasWord(tweet){
	for(var i = 0; i < words.length; i++){
		if(tweet.find("p.tweet-text").text().indexOf(words[i]) != -1){
			return true;
		}
	}
	return false;
}
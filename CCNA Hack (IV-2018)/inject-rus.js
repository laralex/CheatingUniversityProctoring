(function() {
    // Load the script
    var script = document.createElement("script");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

var russian_dictionary;

var english_quiz;

// load external html source with dictionary
jQuery.get( "https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/CCNA%20Hack%20(IV-2018)/russian_dictionary.json", function( data ) {
	russian_dictionary = JSON.parse(data); //entire page in html string
});



jQuery.get( "https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/CCNA%20Hack%20(IV-2018)/russian_dictionary.json", function( data ) {
	english_quiz = JSON.parse(data); //entire page in html string
});


var questionElement = document.getElementsByClassName("coreContent")[0];

var answersElements = document.getElementsByClassName("rTableOptionCell");

questionElement.innerText += ' *Hello*';

var answersList = answersElements.map(function(e){ return e.innerText; });


function machinizeSentences(expr) {
		return expr.replace(/(\. | \.|:| -|- | –|– |\?|,|\(|\)|\.$|\s+)/img, '   ').replace(/(\. | \.|:| -|- | –|– |\?|,|\(|\)|\.$|\s+)/img, '   ')
				   .replace(/(\s|^)(\s|$)/igm, ' ')
				   .replace(/\s+/img,' ')
				   .trim()
				   .toLowerCase();
}

var machinizedQuestion = machinizeSentences(questionElement.innerText);
	
var machinizedAnswers = answersList.map(machinizeSentences);

var questionWords = machinizedQuestion.split(' ')

var answersWords = [];

for (ans in machinizedAnswers) {
	answersWords.concat(ans.split(' '));
}

var rus_words = questionWords.concat(answersWords);

var regexp_to_eng_dict = {};

for (key in russian_dictionary) {
	regexp_to_eng_dict[russian_dictionary[key]] = [];
}

for (key in russian_dictionary) {
	regexp_to_eng_dict[russian_dictionary[key]].push(key);
}

var recognized_words = [];

for (word in rus_words) {
	if (russian_dictionary[word] === "") {
		recognized_words.push([word,5]);
	}
	for(regex in regexp_to_eng_dict) {
		if (word.match(regex)){
			recognized_words.push([word,1]);
		}
	}
}


var priority_array = [];






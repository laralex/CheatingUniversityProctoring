var $;
(function() {
    // Load the script
    var script = document.createElement("script");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        $ = window.jQuery;
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

var english_quiz;
$.get( "https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/CCNA%20Hack%20(IV-2018)/quiz.json", function( data ) {
	english_quiz = JSON.parse(data); //entire page in html string
});


var questionElement = document.getElementsByClassName("coreContent")[0];

var answersElements = document.getElementsByClassName("rTableOptionCell");

var questionText = questionElement.innerText;

var finalAnswers;

for (var question in Object.keys(english_quiz)) {
	if (questionText.indexOf(question.substring(0, 40)) != -1) {
		var answersGuess = english_quiz[question];
		if (answersGuess.every( function(ag) {
			for (var answElem in answersElements) {
				if (answElem.innerText == ag) return true;	
			}
			return false;
		})
		finalAnswers = answersGuess;
	}	
}

questionElement.innerText += ' Распознано: [ ';
for (var answ in finalAnswers) {
	questionElement.innerText += '\'' + answ + '\' ,';
}
questionElement.innerText += ' ]\n';






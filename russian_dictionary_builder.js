// Removed all unnecessary words
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

var html_answers;

// load external html source with answers
jQuery.get( "https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/quiz.json", function( data ) {
    
	quiz = JSON.parse(data); //entire page in html string
});

var machine_quiz = {};

for (var question in quiz) {
	let replaceGarbageWords = function(expr) {
		return expr.replace(/(\. | \.|:| -|- | –|– |\?|,|\(|\)|\.$|\s+)/img, '   ').replace(/(\. | \.|:| -|- | –|– |\?|,|\(|\)|\.$|\s+)/img, '   ')
				   .replace(/(\s|^)(is|are|a|an|as|the|of|that|to|by)(\s|$)/igm, ' ')
				   .replace(/\s+/img,' ')
				   .trim()
				   .toLowerCase();
	}
	if (quiz[question]) {
		machine_question = replaceGarbageWords(question);
		machine_quiz[machine_question] = quiz[question].map(replaceGarbageWords);
	}
}

var dictionary = {};

for (var e in machine_quiz){
		var splitted_question = e.split(' ');
		splitted_question.map(
			function(qw){
				dictionary[qw] = "";
			}
		);
		machine_quiz[e].map(
			function(answ){
				var splitted_answer = answ.split(' ');
				for (aw in splitted_answer) {
					dictionary[aw] = "";
				}
			}
		); 	
}

JSON.stringify(dictionary);
		
					 // ..replace(/(\s)(is|are|a|an|the|of|that|to|by)$/igm, ' ').replace(/[\?.:]/igm, '').replace(/\*$/igm).trim()] = quiz[k].map(function(v) { return v.replace(/(\s)(is|are|a|an|the|of|that|to|by)(\s)/igm, ' ').replace(/^(is|are|a|an|the|of|that|to|by)(\s)/igm, ' ').replace(/(\s)(is|are|a|an|the|of|that|to|by)$/igm, ' ').replace(/[\?.:]/igm, '').replace(/\*$/igm).trim()}); }

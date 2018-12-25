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

var quiz;

// load external html source with answers
jQuery.get( "https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/CCNA%20Hack%20(IV-2018)/quiz.json", function( data ) {
    
	quiz = JSON.parse(data); //entire page in html string
});

function q(word) {
	var printMe = new Set();
	for (var question in quiz) {
		if (question.indexOf(word) >= 0) {
			printMe.add([quiz[question], question]);
		}
	}
	var vals = Object.values(quiz);
	for (var answers_i = 0; answers_i < vals.length; ++answers_i) {
		var flag = false;
		var answers = vals[answers_i];
		//console.log(answers);
		if (answers == null) continue;
		for (var answ_i = 0; answ_i < answers.length; ++answ_i) {
			var answer = answers[answ_i].toString();
			console.log(answer);
			if (answer.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
				if (!flag) {
					printMe.add([answers, Object.keys(quiz).find(key => quiz[key] === answers)]);
					flag = true;
				}
			}
		}
		flag = false;
	}
	printMe.forEach((el) => {
		if (el == null || el[0] == null || el[1] == null) return; 
		var str = '';		
		for (var a in el[0]) {
			str += el[0][a] + (a < el[0].length - 1 ? '\t@@\t' : '');
		}
		console.log({[str.trim()] : el[1].substring(0, 100)});
	} );
}
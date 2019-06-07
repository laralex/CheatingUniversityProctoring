// load jQuery
var $;
(function() {
    var script = document.createElement("script");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        $ = window.jQuery;
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

(function(url_quiz_web_site) {
    var html_answers;
    console.log("Quiz Site 1) " + url_quiz_web_site);
// load external html source with answers
$.get(url_quiz_web_site, function( data ) {    
	html_answers = data; //entire page in html string

console.log("Html fetched 2) ");

// list of questions in raw format
var splited = html_answers.split(/<li><strong>/mg);

console.log("Splited 3) ");

// map of questions to answers
var quiz = {};

function removeGarbage(cur) { 
	// Take just the text
    return cur
        .replace(/<.?li>/ig, '')
        .replace(/<.?span.*?>/ig, '')
        .replace(/<.?strong>/ig, '')
        .replace(/\*$/i, ''); 
}

    console.log("Forming quiz 4)");
// fill quiz dictionary with all questions - variants - answers
    for (var val = 0; val < splited.length; ++val) {
	var question_block = splited[val].match(/.*<\/strong>/im); 
	if (question_block != null && val !== 0 && val !== splited.length - 1) {
		var question_text = question_block[0].replace(/(.*)<\/strong>/im, '$1');
		var answers = splited[val].match(/<span.*>.*<\/span>/img);
		var variants = splited[val].match(/<li>.*<\/li>/img);
		quiz[question_text] = [
			answers ? answers.map(removeGarbage) : null, 
			variants ? variants.map(removeGarbage) : null
		];
	} else console.log(splited[val]);
}

// Unparsed questions from Final exam
    console.log("Final parsed quiz");
    console.log(JSON.stringify(quiz));

});
    
})('https://itexamanswers.net/ccna-2-v6-0-final-exam-answers-routing-switching-essentials.html');

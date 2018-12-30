// load jQuery
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
//https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/CCNA%20Hack%20(IV-2018)/CCNA%20answers%20html%20Final%20Exam.txt
jQuery.get( "https://raw.githubusercontent.com/laralex/UniversitySmallStuff/master/CCNA%20Hack%20(IV-2018)/CCNA%20answers%20html%20(1-11%2C%20Final%20Exam%2C%20Practice%20Exam).txt", function( data ) {
    
	html_answers = data; //entire page in html string
});

// list of questions in raw format
var splited = html_answers.split(/<li><strong>/mg);

// map of questions to answers
var quiz = {};

function removeGarbage(cur) { 
	// Take just the text
	return cur.replace(/<.?li>/ig, '').replace(/<.?span.*?>/ig, '').replace(/<.?strong>/ig, '').replace(/\*$/i, ''); 
}
													
for (var val in splited) {
	var question_block = splited[val].match(/.*<\/strong>/im); 
	if (question_block != null) {
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
quiz[`A network administrator wants to have the same subnet mask for three subnetworks at a small site. The site has the following networks and numbers of devices:<br>
Subnetwork A: IP phones – 10 addresses<br>
Subnetwork B: PCs – 8 addresses<br>
Subnetwork C: Printers – 2 addresses`] = [[`255.255.255.240`], [`255.255.255.0`, `255.255.255.240`, `255.255.255.248`, `255.255.255.252`]];

quiz[`What network service resolves the URL entered on a PC to the IP address of the destination server?`] = [[`DNS`], [`DNS`, `DHCP`,`FTP`,`SNMP`]];

JSON.stringify(quiz);

(function(quiz_json_url) {
	
jQuery.get(quiz_json_url, function( data ) {
	let quiz;
	quiz = JSON.parse(data); // Take a dictionary with all questions and answers
	let selectionEndTimeout = null; 
	document.onselectionchange = userSelectionChanged;
	
	function getSelectionText() {
		let text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		return text;
	};
	
	function userSelectionChanged() {

		if (selectionEndTimeout) {
			clearTimeout(selectionEndTimeout);
		}

		selectionEndTimeout = setTimeout(function () {
			jQuery(window).trigger('selectionEnd');
		}, 500);
		
	};

	// Triggers when you've ended selection of text
	jQuery(window).bind('selectionEnd', function () {
		
				selectionEndTimeout = null; // timeout reset
				let selectedText = getSelectionText();
				if(selectedText != ''){
				   let foundOptions = findPossibleAnswers(selectedText);
				   console.log(foundOptions);
				   document.getElementById('hdr').title = foundOptions[0]; // Hover purple header - get options, where word in ANSWERS
				   document.getElementById('breadcrumbs').title = foundOptions[1]; // Hover grey header - get options, where word in QUESTION
				}
			});

	function findPossibleAnswers(word) {
		if (word == '' || word == ' ' || word == null) return null;
		
		let questionOccurenceSet = new Set();
		for (let question in quiz) {
			if (question.indexOf(word) >= 0) {
				questionOccurenceSet.add([quiz[question][0], question]);
			}
		}
		
		let answersOccurenceSet = new Set();
		let quizAnswersArrays = Object.values(quiz); 
		for (let answers_i = 0; answers_i < quizAnswersArrays.length; ++answers_i) {
			let flag = false;
			let answersArray = quizAnswersArrays[answers_i][1];
			if (answersArray == null) continue;
			for (let answ_i = 0; answ_i < answersArray.length; ++answ_i) {
				let oneAnswerStr = answersArray[answ_i];
				if (oneAnswerStr.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
					if (!flag) {
						answersOccurenceSet.add([quizAnswersArrays[answers_i][0], Object.keys(quiz).find(key => quiz[key][0] === quizAnswersArrays[answers_i][0])]);
						flag = true;
					}
				}
			}
			flag = false;
		}
		
		let stringifySet = (set, isInQuestion) => {
			let returnStr = '';
			
			set.forEach((el) => {
				if (el == null || el[0] == null || el[1] == null) return;			
				for (let a in el[0]) {
					returnStr += a + ') ' + el[0][a] + (a < el[0].length - 1 ? ' ' : ' #Q: ');
				}
				if (isInQuestion) console.log(el[1].indexOf(word), el[1]);
				returnStr = returnStr.trim() + ' ' + (isInQuestion ? el[1].substring(el[1].indexOf(word) - 50, 100).slice(0,-1) : el[1].substring(el[1].length - 100).slice(0,-1)) + '#\n'
			});
			
			return returnStr;
		};
		
		let strAnswersSource = stringifySet(answersOccurenceSet, false), strQuestionSource = stringifySet(questionOccurenceSet, true);
		return [strAnswersSource, strQuestionSource];
	}

});

})(
"https://raw.githubusercontent.com/laralex/University-Small-Stuff/master/CCNA%20Hack%20(IV-2018)/CCNA%202/quiz.json");






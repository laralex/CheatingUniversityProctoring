/*  
	<content_script.js>
	This script is executed on certain tab (i.e. separate script for every needed tab),
	it can read/modify DOM of page from this tab.
	
	Using this, we can download web-content of test and modify it, to provide
	answers on your test (or expell you from university lmao).
	
	As I said, this script is isolated from the rest of extension, thus it has to use
	Chrome API to communicate with 'popup' and 'background'
*/


var qtexts = Array.from(document.getElementsByClassName("qtext"));

function GetQuestions(qtexts){
	return { texts: qtexts.map((e) => e.innerText), htmls: qtexts.map((e) => e.innerHTML)};
}

function AddTips(qtexts, answers){
	for (let i = 0; i < qtexts.length; ++i){
		qtexts[i].title = "";
		if (answers[i].length === 0){
			qtexts[i].title += "ОТВЕТОВ НЕТ В БАЗЕ";
		} else {
			for (let ans = 0; ans < answers[i].length; ++ans){
				qtexts[i].title += "@:" + answers[i][ans]['a'] + "\n";
			}
		}
	}
}

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		switch (message.action) {
			case "GetQuestions":
				//console.log("Request for questions: ", message);
				sendResponse({
					result: "ok",
					questions: GetQuestions(qtexts)
				});
				break;
			case "AddTips":
				console.log("Распознанные ответы на тест: ");
				for (let q = 0; q < message.answers.length; ++q){
					let answer_str = "";
					for (let a = 0; a < message.answers[q].length; ++a){
						answer_str += "\nОтвет " + parseInt(a + 1) + " ) " + message.answers[q][a]['a'];
					}
					console.log(parseInt(q + 1) + ")" + answer_str);
				}
				AddTips(qtexts, message.answers);
				sendResponse({
					result: "ok"
				});
				break;
		}
	}
);

(()=>{
	chrome.runtime.sendMessage({action:"SearchMany", questions:GetQuestions(qtexts)}, function(response){
		AddTips(qtexts, response.answers);
	});
	/*
	var qtexts = document.getElementsByClassName("qtext"); 

	for (let qtext = 0; qtext < qtexts.length; qtext++) {
		let tmp = qtexts[qtext];
		for (a in answers) {
			if (AreSimiliar(tmp.textContent, shpora[a]['q']) ) 
				tmp.title += shpora[a]['a'] + '\n'
		}
	};
	*/
})();


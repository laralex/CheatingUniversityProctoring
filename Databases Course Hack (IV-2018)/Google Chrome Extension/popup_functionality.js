/*
	This script extends popup.html to provide you cool functionality using extension icon
	
	Also, this script is considered as a place, where extension's DATA is stored (e.g. status, options, etc)
*/

/* Need some extra actions on load */

/* Actions on popup.html UI events */	 
window.onload=()=>{
	BindFunctionality();
	SetAppEnabled(true);
	/*chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
		console.log("Calling content");
		chrome.tabs.sendMessage(tabs[0].id, {action:"RunContentScript"});
	});*/
};

/* Aliases for document.getElementById(...) stuff */
let app_action_reload;
let app_action_save;
let app_action_enable;
let app_status_div;
let app_status_span;
let search_txtarea;
let search_clear_btn;
let search_copy_btn;
let search_paste_btn;
let search_result_div;
let search_result_span; 
let search_result_size_span;
let search_result_table;

/* Extension data */
let app_data = {
	status: 0, 
	isEnabled: true, 
	search_request: "",
	search_result: {}, 
	search_result_size: 0 
} 

/*  Fill table with answers.
	Input format: array with dictionaries those have atleast keys "q" and "a" 
	for question and answer strings respectively (anything else is ignored)
	[ { "q":"question", "a":"answer" }, { ... } ] */
function FillSearchTable(quiz){
	search_result_table.innerHTML = "";
	let content = "";
	for(let q_i in quiz){
		let question = quiz[q_i].q, answer = quiz[q_i].a;
		
		let num = parseInt(q_i) + 1;
		content += '<tr><td class="number">' + num + '</td><td>' + question + '</td></tr><tr class="answer"><td></td><td>' + answer + '</td></tr></tr>';
	}
	search_result_table.innerHTML = content;
}

/* Make content script to provide answers once again (if it somehow didn't) */
function ReloadHackScript(){
	
}

/* Make content script to download current html page */
function DownloadHtmlPage(){
	
}		

/* Enable or Disable&Clear application activities */
function SetAppEnabled(bool){
	app_data.isEnabled = bool;
	if (bool === true) {
		app_status_div.classList.remove("red");
		app_status_div.classList.add("green");
		app_status_span.innerText = "вроде работает";
	} else {
		app_status_div.classList.remove("green");
		app_status_div.classList.add("red");
		app_status_span.innerText = "отключен";
	}
}

function OnReloadHackScriptPressed(){
	ReloadHackScript();
}

function OnDownloadPagePressed(){
	DownloadHtmlPage();
}

function OnEnablePressed(){
	SetAppEnabled(!app_data['isEnabled']);
}	

function OnClearSearchPressed(){
	
}

function OnCopySearchPressed(){
	
}

function OnPasteSearchPressed(){
	
}

function OnTextareaInput(){
	//console.log("Textarea changed");
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action:"Search", search_str:search_txtarea.value}, function(response){
			console.log(response);
			if (response.length > 0) {
				search_result_span.classList.add("green");
				search_result_span.classList.remove("red"); 				
			} else {
				search_result_span.classList.add("red");
				search_result_span.classList.remove("green"); 	
			}
			search_result_size_span.innerText = response.length;
			FillSearchTable(response);
		});
	});
}

function BindFunctionality(){
	app_action_reload			= document.getElementById("popup_action_reload");
	app_action_save				= document.getElementById("popup_action_save");
	app_action_enable 			= document.getElementById("popup_action_enable");
	app_status_div 				= document.getElementById("status");
	app_status_span 			= document.getElementById("status_text");
	search_txtarea 				= document.getElementById("manual_search");
	search_clear_btn 			= document.getElementById("clear_button");
	search_copy_btn 			= document.getElementById("copy_button");
	search_paste_btn 			= document.getElementById("paste_button");
	search_result_div 			= document.getElementById("manual_search_result");
	search_result_span 			= document.getElementById("result_label");
	search_result_size_span 	= document.getElementById("result_size");
	search_result_table 		= document.getElementById("result_table");
	search_txtarea.oninput 		= OnTextareaInput;
	app_action_enable.onclick 	= OnEnablePressed;
};
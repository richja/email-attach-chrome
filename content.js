/* Prepare */

var words = [
	"příloha",
	"priloha",
	"přílohy",
	"prilohy",
	"příloze",
	"priloze",
	"přílohou",
	"prilohou",
	"přílohu",
	"prilohu",
	"attach"
];

var wordsInRegex = words.join("|");
var regexed = new RegExp(wordsInRegex,"i");
var defaultLabel, sendButton;

/* Listen, validate, notify */

window.addEventListener("hashchange", checkHash, false);

function checkHash() {
	if (location.hash == "#compose") {
		defaultLabel = document.getElementById("wm-compose-send").innerHTML;
		sendButton = document.getElementById("wm-compose-send");

		var email = document.getElementsByClassName("editor-content")[0];
		email.addEventListener("keyup", runValidation, true);
		email.addEventListener("focusout", runValidation, true);
	}
}

function runValidation(e) {
	if (!hasAttachment() && mentionAttachment()) {
		showWarning();
	}
	else {
		hideWarning();
	}
}

function hasAttachment () {
	return document.getElementsByClassName("wm-attachment").length;
}

function mentionAttachment() {
	var email = document.getElementsByClassName("editor-content")[0].innerHTML;
	return (email.search(regexed) !== -1);
}

function showWarning() {
	sendButton.classList.add("ext-warn-btn");
	sendButton.innerHTML = defaultLabel + " bez přílohy?";
}

function hideWarning() {
	sendButton.classList.remove("ext-warn-btn");
	sendButton.innerHTML = defaultLabel;
}
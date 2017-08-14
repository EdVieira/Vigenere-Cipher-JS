function stringToIntList(string)
{
	var s = new Array();
	for (var i = 0; i < string.length; i++) {
		s[i] = string.charCodeAt(i);
	}
	return s;
}
function intsToCharList(integers)
{
	var ints = new Array();
	for (var i = 0; i < integers.length; i++) {
		ints[i] = String.fromCharCode(integers[i]);
	}
	return ints;
}
function encrip(text, key, cipher)
{
	text = stringToIntList(text.value);
	key = stringToIntList(key.value);
	var table = makeTable();
	var keyChar = 0;
	var message = new Array();
	while(message.length<text.length) {
		for(var i = 0; i < text.length; i++) {
			var row = table[0].indexOf(key[keyChar]);
			var col = table[0].indexOf(text[i]);
			message[message.length] = table[row][col];
			if (keyChar<key.length-1) {
				keyChar++;
			} else {
				keyChar = 0;
			}
		}
	}
	message = intsToCharList(message).join("");
	cipher.value = message;
}
function decrip(text, key, cipher)
{
	cipher = stringToIntList(cipher.value);
	key = stringToIntList(key.value);
	var table = makeTable();
	var keyChar = 0;
	var message = new Array();
	while (message.length<cipher.length) {
		for (var i = 0; i < cipher.length; i++) {
			var row = table[0].indexOf(key[keyChar]);
			var col = table[row].indexOf(cipher[i]);
			message[message.length] = table[0][col];
			if (keyChar<key.length-1) {
				keyChar++;
			} else {
				keyChar = 0;
			}
		}
	}
	message = intsToCharList(message).join("");
	text.value = message;

}
function makeTable()
{
	var table = new Array();
	var minASCII = parseInt(document.getElementById('minASCII').value);
	var maxASCII = parseInt(document.getElementById('maxASCII').value);
	var i = 0;
	while (i+minASCII < maxASCII) {
		var line = new Array();
		for (var j = 0; j < maxASCII - minASCII; j++) {
			if (j+i+minASCII >= maxASCII) {
				line[line.length] = (j+i)-(maxASCII-minASCII)+minASCII;
			} else {
				line[line.length] = j+i+minASCII;
			}
		}
		table[table.length] = line;
		i++;
	}
	return table;
}
function printTable()
{
	var t = makeTable();
	document.getElementById("ascii").innerHTML = "";
	for (var i = 0; i < t.length; i++) {
		document.getElementById("ascii").innerHTML = document.getElementById("ascii").innerHTML+"<tr><td>"+intsToCharList(t[i]).join("</td><td>")+"</td></tr>";
	}
}
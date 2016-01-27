document.addEventListener('DOMContentLoaded', function() {
	var grab = document.getElementById.bind(document);
	var screen = grab('screen');
	var buttons = document.getElementsByClassName('btn');

	//the register stores the state of the calculator
	var register = null;

	//stores the last operation for chaining
	var lastOp;

	//a switch for tracking whether or not the screen needs to refresh
	var refresh = false;

	//a single space is the content of an empty screen
	screen.textContent = ' ';

	//assign a click handler to all buttons
	for (var i=0; i < buttons.length; i++) {
		var instruction = buttons[i].textContent;
		//all the numbers and decimal place
		if (instruction.match(/[\d.]/)) {
				buttons[i].onclick = function() {
					if (refresh) {
						screen.textContent = ' ';
						refresh = false;
					}
					//only allow one decimal place
					if (this.textContent !== '.' || !screen.textContent.match(/\./))
						screen.textContent = screen.textContent + this.textContent;
				}			
		}
		//special cases
		else if (instruction === 'CE') {
			buttons[i].onclick = function() {
				screen.textContent = ' ';
			}
		}
		else if (instruction === 'AC') {
			buttons[i].onclick = function() {
				screen.textContent = ' ';
				register = null;
			}
		}
		else if (instruction === '%') {
			buttons[i].onclick = function() {
				if (screen.textContent !== ' ')
				screen.textContent = parseFloat(screen.textContent) / 100;
			}
		}
		//operators
		else buttons[i].onclick = function() {
				//ignore if there isn't anything going on 
				if (register === null && screen.textContent == ' ') return;
				//chain and display if we had something already
				if (lastOp && screen.textContent !== ' ')
					register = calc(register, lastOp, screen.textContent);
				//set up the initial register when empty
				if (register === null) register = screen.textContent;
				lastOp = this.textContent;
			  screen.textContent = register;
				refresh = true;
							};
	}

	//calculation function - takes three strings: two numbers and an 
	//operand and returns the result
	function calc(n1, oper, n2) {
		//a table mapping characters to functions
		var optable = { 'mod': (m, n) => { return m % n; },
										'/': (m, n) => { return m / n; },
										'*': (m, n) => { return m * n; },
										'-': (m, n) => { return m - n; },
										'+': (m, n) => { return m + n; },
										'=': (m, n) => { return m = n; } };
		return optable[oper](parseFloat(n1), parseFloat(n2));
	}
							
});


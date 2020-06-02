window.onload = () => {
	const arrow = "./images/arrow.png";
	const startButton = document.getElementsByClassName('start-button')[0];
	const missionControlTitle = document.getElementsByClassName('missionControl-title')[0];
	const missionControl = document.getElementsByClassName('missionControl')[0];
	const moveForward = document.getElementsByClassName('moveForward')[0];
	const rotate = document.getElementsByClassName('rotate')[0];
	const executeCommands = document.getElementsByClassName('execute')[0];
	const pattern = document.getElementsByClassName('pattern')[0];
	const clear = document.getElementsByClassName('clear')[0];
	const movements = [];

	const playground = document.createElement('div');
	const element = document.createElement('canvas');
	const leftBox = document.createElement('div');
	const rightBox = document.createElement('div');

	playground.className = "playground";
	element.id = "canvas"
	element.width = 1100;
	element.height = 700;
	element.tabIndex = '1';
	leftBox.className = "left-box";
	rightBox.className = "right-box";
	leftBox.innerHTML = "<p>Press start.</p><p>Move the arrow<p/><p>clicking</p><p>forward</p><p>or</p><p>rotate.</p><div class='okay'>OK</div>";
	rightBox.innerHTML = "<p>Click the</p><p>check button</p><p>to execute</p><p>your</p><p>logic.</p><div class='okay'>OK</div>";

	playground.append(leftBox, element, rightBox);
	document.body.insertBefore(playground, missionControl);

	const canvas = element;
	const ctx = canvas.getContext('2d');

	const movingArrow = {
		x: (canvas.width / 2) - 50,
		y: 0,
		pointing: "down",
		spin: null,
		get index() {
			return [this.x + 50, this.y + 50];
		}
	}

	const canvasCoords = {
		done: false,
	};

	const image = new Image();
	image.src = arrow;
	image.onload = function () {
		ctx.drawImage(image, movingArrow.x, movingArrow.y, 100, 100);
	}

	function shakeIt(element, input) {
		if (input === 'add') {
			element.classList.add('shakeit');
		} else {
			element.classList.remove('shakeit');
		}
	}

	const directions = move => {
		if (move === "forward") {
			switch (movingArrow.pointing) {
				case "down": {
					if (movingArrow.index[1] + 100 < 700 && !canvasCoords[`${movingArrow.x + 50} ${movingArrow.y + 100}`]) {
						movingArrow.y += 100;

					} else {
						shakeIt(canvas, "add");
					}
					break;
				};
				case "top": {
					if (movingArrow.index[1] - 100 > 0 && !canvasCoords[`${movingArrow.x + 50} ${movingArrow.y}`]) {
						movingArrow.y -= 100;
					} else {
						shakeIt(canvas, "add");
					}
					break;
				};
				case "left": {
					if (movingArrow.index[0] - 100 > 0 && !canvasCoords[`${movingArrow.x} ${movingArrow.y + 50}`]) {
						movingArrow.x -= 100;
					} else {
						shakeIt(canvas, "add");
					}
					break;
				};
				default: {
					if (movingArrow.index[0] + 100 < 1100 && !canvasCoords[`${movingArrow.x + 100} ${movingArrow.y + 50}`]) {
						movingArrow.x += 100;
					} else {
						shakeIt(canvas, "add");
					}
					break;
				}
			}

		} else if (move === 'rotate') {
			switch (movingArrow.pointing) {
				case "down": {
					movingArrow.pointing = "left";
					movingArrow.spin = 90 * Math.PI / 180;
					break;
				};
				case "left": {
					movingArrow.pointing = "top";
					movingArrow.spin = 180 * Math.PI / 180;
					break;
				};
				case "top": {
					movingArrow.pointing = "right";
					movingArrow.spin = 270 * Math.PI / 180;
					break;
				};
				default: {
					movingArrow.pointing = "down";
					movingArrow.spin = 0;
					break;
				}
			}
		}
		ctx.translate(movingArrow.x + 50, movingArrow.y + 50);
		ctx.rotate(movingArrow.spin);
		ctx.translate(-(movingArrow.x + 50), -(movingArrow.y + 50));
		ctx.drawImage(image, movingArrow.x, movingArrow.y, 100, 100);
	}

	const addMovement = direction => {
		movements.push(direction);
		pattern.append(movements.length + ". " + direction + " ");
	}

	const executeAll = (moves) => {
		const canvas = document.getElementById('canvas');
		let i = 0;
		let intervalId = setInterval(() => {
			shakeIt(canvas, 'remove');
			if (i > moves.length - 1) {
				clearInterval(intervalId);
				movements.length = 0;
			} else {
				ctx.clearRect(0, 0, element.width, element.height);
				draw();
				ctx.save();
				directions(moves[i]);
				ctx.restore();
			}
			i++;
		}, 400);
	}

	function addCanvasCoords(begin, end) {
		console.log("I'm calculating");
		if (begin[0] === end[0]) { //--> this means we are moving on Y axis
			if (begin[1] > end[1]) {
				for (let i = end[1]; i <= begin[1]; i++) {
					canvasCoords[`${begin[0]} ${i}`] = [begin[0], i];
				}
			} else {
				for (let i = begin[1]; i <= end[1]; i++) {
					canvasCoords[`${begin[0]} ${i}`] = [begin[0], i];
				}
			}
		} else if (begin[1] === end[1]) { //--> this means we are moving on X axis
			if (begin[0] > end[0]) {
				for (let j = end[0]; j <= begin[0]; j++) {
					canvasCoords[`${j} ${end[1]}`] = [j, end[1]];
				}
			} else {
				for (let j = begin[0]; j <= end[0]; j++) {
					canvasCoords[`${j} ${end[1]}`] = [j, end[1]];
				}
			}
		}
	}

	function draw() {

		ctx.lineWidth = 5;
		ctx.beginPath();

		// top (entrance from 500 to 600)
		ctx.moveTo(100, 100);
		ctx.lineTo(500, 100);
		canvasCoords.done === false ? addCanvasCoords([100, 100], [500, 100]) : "";
		ctx.moveTo(600, 100);
		ctx.lineTo(1000, 100);
		canvasCoords.done === false ? addCanvasCoords([600, 100], [1000, 100]) : "";

		// left side
		ctx.moveTo(100, 97.5);
		ctx.lineTo(100, element.height - 100);
		canvasCoords.done === false ? addCanvasCoords([100, 100], [100, element.height - 100]) : "";


		// bottom (exit from 500 to 600)
		ctx.lineTo(500, element.height - 100);
		canvasCoords.done === false ? addCanvasCoords([100, element.height - 100], [500, element.height - 100]) : "";
		ctx.moveTo(600, element.height - 100);
		ctx.lineTo(1000, element.height - 100);
		canvasCoords.done === false ? addCanvasCoords([600, element.height - 100], [1000, element.height - 100]) : "";
		// right side
		ctx.lineTo(1000, 97.5);
		canvasCoords.done === false ? addCanvasCoords([1000, element.height - 100], [1000, 100]) : "";

		// inside pattern
		//// horizontal lines
		ctx.moveTo(100, 200);
		ctx.lineTo(200, 200);
		canvasCoords.done === false ? addCanvasCoords([100, 200], [200, 200]) : "";
		ctx.moveTo(300, 200);
		ctx.lineTo(700, 200);
		canvasCoords.done === false ? addCanvasCoords([300, 200], [700, 200]) : "";
		ctx.moveTo(800, 200);
		ctx.lineTo(900, 200);
		canvasCoords.done === false ? addCanvasCoords([800, 200], [900, 200]) : "";
		ctx.moveTo(400, 300);
		ctx.lineTo(500, 300);
		canvasCoords.done === false ? addCanvasCoords([400, 300], [500, 300]) : "";
		ctx.moveTo(700, 300);
		ctx.lineTo(800, 300);
		canvasCoords.done === false ? addCanvasCoords([700, 300], [800, 300]) : "";
		ctx.moveTo(900, 300);
		ctx.lineTo(1000, 300);
		canvasCoords.done === false ? addCanvasCoords([900, 300], [1000, 300]) : "";
		ctx.moveTo(200, 400);
		ctx.lineTo(400, 400);
		canvasCoords.done === false ? addCanvasCoords([200, 400], [400, 400]) : "";
		ctx.moveTo(500, 400);
		ctx.lineTo(700, 400);
		canvasCoords.done === false ? addCanvasCoords([500, 400], [700, 400]) : "";
		ctx.moveTo(900, 400);
		ctx.lineTo(1000, 400);
		canvasCoords.done === false ? addCanvasCoords([900, 400], [1000, 400]) : "";
		ctx.moveTo(100, 500);
		ctx.lineTo(300, 500);
		canvasCoords.done === false ? addCanvasCoords([100, 500], [300, 500]) : "";
		ctx.moveTo(500, 500);
		ctx.lineTo(600, 500);
		canvasCoords.done === false ? addCanvasCoords([500, 500], [600, 500]) : "";
		ctx.moveTo(700, 500);
		ctx.lineTo(900, 500);
		canvasCoords.done === false ? addCanvasCoords([700, 500], [900, 500]) : "";

		//// vertical lines
		ctx.moveTo(200, 300);
		ctx.lineTo(200, 402.5);
		canvasCoords.done === false ? addCanvasCoords([200, 300], [200, 400]) : "";
		ctx.moveTo(300, 197.5);
		ctx.lineTo(300, 300);
		canvasCoords.done === false ? addCanvasCoords([300, 200], [300, 300]) : "";
		ctx.moveTo(400, 297.5);
		ctx.lineTo(400, 600);
		canvasCoords.done === false ? addCanvasCoords([400, 300], [400, 600]) : "";
		ctx.moveTo(500, 397.5);
		ctx.lineTo(500, 502.5);
		canvasCoords.done === false ? addCanvasCoords([500, 400], [500, 500]) : "";
		ctx.moveTo(600, 200);
		ctx.lineTo(600, 400);
		canvasCoords.done === false ? addCanvasCoords([600, 200], [600, 400]) : "";
		ctx.moveTo(600, 497.5);
		ctx.lineTo(600, 602.5);
		canvasCoords.done === false ? addCanvasCoords([600, 500], [600, 600]) : "";
		ctx.moveTo(700, 397.5);
		ctx.lineTo(700, 502.5);
		canvasCoords.done === false ? addCanvasCoords([700, 400], [700, 500]) : "";
		ctx.moveTo(800, 100);
		ctx.lineTo(800, 400);
		canvasCoords.done === false ? addCanvasCoords([800, 100], [800, 400]) : "";
		// drawing
		ctx.stroke();
		canvasCoords.done === false ? canvasCoords.done = true : "";
	}

	function resetStatus() {
		ctx.clearRect(0, 0, element.width, element.height);
		movingArrow.x = element.width / 2 - 50;
		movingArrow.y = 0;
		movingArrow.pointing = "down";
		movingArrow.spin = null;
		ctx.drawImage(image, movingArrow.x, movingArrow.y, 100, 100);
		movements.length = 0;
		draw();
		pattern.innerText = "";
	}

	function playerReady() {
		startButton.classList.add('hide');
		missionControlTitle.classList.remove('hide');
		missionControl.classList.remove('hide');
	}

	draw();

	startButton.addEventListener('click', () => { playerReady() });
	leftBox.addEventListener('click', () => { leftBox.style.visibility = "hidden" });
	rightBox.addEventListener('click', () => { rightBox.style.visibility = "hidden" });
	moveForward.addEventListener('click', () => { addMovement('forward') });
	rotate.addEventListener('click', () => { addMovement('rotate') });
	executeCommands.addEventListener('click', () => { executeAll(movements) });
	clear.addEventListener('click', () => { resetStatus() })
};

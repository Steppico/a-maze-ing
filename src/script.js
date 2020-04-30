window.onload = () => {
	const arrow = "./arrow.png";
	const moveForward = document.getElementsByClassName('moveForward')[0];
	const rotate = document.getElementsByClassName('rotate')[0];
	const executeCommands = document.getElementsByClassName('execute')[0];
	const element = document.createElement('canvas');
	const pattern = document.getElementsByClassName('pattern')[0];
	const movements = [];

	element.id = "canvas"
	element.width = 500;
	element.height = 500;
	element.tabIndex = '1';

	document.body.insertBefore(element, moveForward);

	const canvas = element;
	const ctx = canvas.getContext('2d');

	const movingArrow = {
		x: (canvas.width / 2) - 50,
		y: 0,
		pointing: "down",
		spin: null
	}

	image = new Image();
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
		if (move === 'forward') {
			switch (movingArrow.pointing) {
				case "down": {
					movingArrow.y + 200 <= element.height ? movingArrow.y += 100 : shakeIt(canvas, 'add');
					break;
				};
				case "top": {
					movingArrow.y > 0 ? movingArrow.y -= 100 : shakeIt(canvas, 'add');
					break;
				};
				case "left": {
					movingArrow.x > 0 ? movingArrow.x -= 100 : shakeIt(canvas, 'add');
					break;
				};
				default: {
					movingArrow.x + 200 <= element.width ? movingArrow.x += 100 : shakeIt(canvas, 'add');
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
				ctx.save();
				directions(moves[i]);
				ctx.restore();
			}
			i++;
		}, 200);
	}

	moveForward.addEventListener('click', () => { addMovement('forward') });
	rotate.addEventListener('click', () => { addMovement('rotate') });
	executeCommands.addEventListener('click', () => { executeAll(movements) })
};

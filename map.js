const mapCanvas = document.getElementById('worldMap');
const mapCtx = mapCanvas.getContext('2d');
const mapMessageEl = document.getElementById('mapMessage');

const TILE_SIZE = 40;

const mapCols = 40;
const mapRows = 28;

const camera = {
	x: 0,
	y: 0,
	width: mapCanvas.width,
	height: mapCanvas.height
};

const playerMap = {
	x: 3 * TILE_SIZE,
	y: 3 * TILE_SIZE,
	width: 26,
	height: 30,
	speed: 3,
	direction: 'down'
};

const keys = {
	up: false,
	down: false,
	left: false,
	right: false
};

/*
	타일 종류
	0 = 이동 가능 땅
	1 = 벽 / 산 / 바위
	2 = 물
	3 = 초원 지역
	4 = 숲 지역
	5 = 사막 지역
	6 = 마왕성 입구
*/
const tileMap = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,3,3,3,3,3,0,0,0,0,0,0,0,1,1,1,1,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
	[1,3,3,3,3,3,0,0,0,0,0,0,0,1,2,2,1,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,3,3,3,3,3,0,0,1,1,1,0,0,1,2,2,1,4,4,4,4,4,4,4,4,4,0,0,1,1,1,1,1,1,1,0,0,0,0,1],
	[1,3,3,3,3,3,0,0,1,1,1,0,0,1,2,2,1,4,4,4,4,4,4,4,4,4,0,0,1,1,1,1,1,1,1,0,0,0,0,1],
	[1,3,3,3,3,3,0,0,0,0,0,0,0,1,2,2,1,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,1,1,1,1,0,1,2,2,1,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,1,1,1,1,0,1,2,2,1,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,0,0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,5,5,5,5,5,5,5,5,5,0,0,0,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,0,1],
	[1,5,5,5,5,5,5,5,5,5,0,0,0,1,2,2,1,0,0,0,1,1,1,1,1,0,0,0,0,6,6,6,6,6,6,6,6,6,0,1],
	[1,5,5,5,5,5,5,5,5,5,0,0,0,1,2,2,1,0,0,0,1,1,1,1,1,0,0,0,0,6,6,6,6,6,6,6,6,6,0,1],
	[1,5,5,5,5,5,5,5,5,5,0,0,0,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,0,1],
	[1,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,0,1],
	[1,5,5,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1],
	[1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const tileColors = {
	0: '#3f7a3a',
	1: '#4a4a4a',
	2: '#2f6fa3',
	3: '#63a84f',
	4: '#1f5c37',
	5: '#c29a48',
	6: '#4b3a58'
};

const tileLabels = {
	3: '초원',
	4: '숲',
	5: '사막',
	6: '마왕성'
};

const areaTileMap = {
	3: {
		id: 'grass',
		name: '초원 지역'
	},
	4: {
		id: 'forest',
		name: '숲 지역'
	},
	5: {
		id: 'desert',
		name: '사막 지역'
	},
	6: {
		id: 'castle',
		name: '마왕성 입구'
	}
};

let currentMapAreaId = null;

function initMap() {
	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('keyup', handleKeyUp);
	
	initMobileControls();

	requestAnimationFrame(mapLoop);
}

function initMobileControls() {
	const moveButtons = document.querySelectorAll('.move-btn');

	moveButtons.forEach(function(button) {
		const direction = button.dataset.direction;

		button.addEventListener('touchstart', function(e) {
			e.preventDefault();
			setMoveKey(direction, true);
		}, { passive: false });

		button.addEventListener('touchend', function(e) {
			e.preventDefault();
			setMoveKey(direction, false);
		}, { passive: false });

		button.addEventListener('touchcancel', function(e) {
			e.preventDefault();
			setMoveKey(direction, false);
		}, { passive: false });

		// PC 브라우저에서 마우스로도 테스트 가능하게 추가
		button.addEventListener('mousedown', function(e) {
			e.preventDefault();
			setMoveKey(direction, true);
		});

		button.addEventListener('mouseup', function(e) {
			e.preventDefault();
			setMoveKey(direction, false);
		});

		button.addEventListener('mouseleave', function() {
			setMoveKey(direction, false);
		});
	});
}

function setMoveKey(direction, isPressed) {
	if(direction === 'up') {
		keys.up = isPressed;
	}

	if(direction === 'down') {
		keys.down = isPressed;
	}

	if(direction === 'left') {
		keys.left = isPressed;
	}

	if(direction === 'right') {
		keys.right = isPressed;
	}
}

function handleKeyDown(e) {
	if(e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
		keys.up = true;
		e.preventDefault();
	}

	if(e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
		keys.down = true;
		e.preventDefault();
	}

	if(e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
		keys.left = true;
		e.preventDefault();
	}

	if(e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
		keys.right = true;
		e.preventDefault();
	}
}

function handleKeyUp(e) {
	if(e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
		keys.up = false;
	}

	if(e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
		keys.down = false;
	}

	if(e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
		keys.left = false;
	}

	if(e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
		keys.right = false;
	}
}

function mapLoop() {
	updatePlayerPosition();
	updateCamera();
	checkCurrentArea();
	drawMap();

	requestAnimationFrame(mapLoop);
}

function updatePlayerPosition() {
	if(typeof isBattling !== 'undefined' && isBattling) {
		return;
	}
	
	let nextX = playerMap.x;
	let nextY = playerMap.y;

	if(keys.up) {
		nextY -= playerMap.speed;
		playerMap.direction = 'up';
	}

	if(keys.down) {
		nextY += playerMap.speed;
		playerMap.direction = 'down';
	}

	if(keys.left) {
		nextX -= playerMap.speed;
		playerMap.direction = 'left';
	}

	if(keys.right) {
		nextX += playerMap.speed;
		playerMap.direction = 'right';
	}

	if(!isCollidingWithBlockedTile(nextX, playerMap.y)) {
		playerMap.x = nextX;
	}

	if(!isCollidingWithBlockedTile(playerMap.x, nextY)) {
		playerMap.y = nextY;
	}
}

function isCollidingWithBlockedTile(nextX, nextY) {
	const margin = 4;

	const left = nextX + margin;
	const right = nextX + playerMap.width - margin;
	const top = nextY + margin;
	const bottom = nextY + playerMap.height - margin;

	const points = [
		{ x: left, y: top },
		{ x: right, y: top },
		{ x: left, y: bottom },
		{ x: right, y: bottom }
	];

	return points.some(function(point) {
		const tile = getTileAtPixel(point.x, point.y);

		return isBlockedTile(tile);
	});
}

function isBlockedTile(tile) {
	return tile === 1 || tile === 2 || tile === null;
}

function getTileAtPixel(pixelX, pixelY) {
	const col = Math.floor(pixelX / TILE_SIZE);
	const row = Math.floor(pixelY / TILE_SIZE);

	if(row < 0 || row >= tileMap.length) {
		return null;
	}

	if(col < 0 || col >= tileMap[row].length) {
		return null;
	}

	return tileMap[row][col];
}

function updateCamera() {
	const mapWidth = mapCols * TILE_SIZE;
	const mapHeight = mapRows * TILE_SIZE;

	camera.x = playerMap.x + playerMap.width / 2 - camera.width / 2;
	camera.y = playerMap.y + playerMap.height / 2 - camera.height / 2;

	if(camera.x < 0) {
		camera.x = 0;
	}

	if(camera.y < 0) {
		camera.y = 0;
	}

	if(camera.x > mapWidth - camera.width) {
		camera.x = mapWidth - camera.width;
	}

	if(camera.y > mapHeight - camera.height) {
		camera.y = mapHeight - camera.height;
	}
}

function checkCurrentArea() {
	const centerX = playerMap.x + playerMap.width / 2;
	const centerY = playerMap.y + playerMap.height / 2;

	const tile = getTileAtPixel(centerX, centerY);
	const area = areaTileMap[tile];

	if(!area) {
		mapMessageEl.textContent = '방향키 또는 WASD로 이동하세요.';
		return;
	}

	if(currentMapAreaId === area.id) {
		return;
	}

	currentMapAreaId = area.id;

	if(typeof selectArea === 'function') {
		selectArea(area.id);
	}

	mapMessageEl.textContent = `${area.name}에 진입했습니다. 전투하기 버튼으로 전투를 진행하세요.`;
}

function drawMap() {
	mapCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

	drawTiles();
	drawRegionLabels();
	drawPlayer();
	drawMiniInfo();
}

function drawTiles() {
	const startCol = Math.floor(camera.x / TILE_SIZE);
	const endCol = Math.ceil((camera.x + camera.width) / TILE_SIZE);

	const startRow = Math.floor(camera.y / TILE_SIZE);
	const endRow = Math.ceil((camera.y + camera.height) / TILE_SIZE);

	for(let row = startRow; row <= endRow; row++) {
		for(let col = startCol; col <= endCol; col++) {
			if(row < 0 || row >= tileMap.length) {
				continue;
			}

			if(col < 0 || col >= tileMap[row].length) {
				continue;
			}

			const tile = tileMap[row][col];

			const screenX = col * TILE_SIZE - camera.x;
			const screenY = row * TILE_SIZE - camera.y;

			mapCtx.fillStyle = tileColors[tile] || '#000';
			mapCtx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

			mapCtx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
			mapCtx.strokeRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

			drawTileObject(tile, screenX, screenY);
		}
	}
}

function drawTileObject(tile, x, y) {
	mapCtx.font = '20px Arial';
	mapCtx.textAlign = 'center';
	mapCtx.textBaseline = 'middle';

	if(tile === 1) {
		mapCtx.fillText('⛰️', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
	}

	if(tile === 2) {
		mapCtx.fillText('🌊', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
	}

	if(tile === 3) {
		mapCtx.fillText('🌱', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
	}

	if(tile === 4) {
		mapCtx.fillText('🌲', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
	}

	if(tile === 5) {
		mapCtx.fillText('🏜️', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
	}

	if(tile === 6) {
		mapCtx.fillText('🏰', x + TILE_SIZE / 2, y + TILE_SIZE / 2);
	}
}

function drawRegionLabels() {
	const labels = [
		{ text: '초원 지역', x: 3 * TILE_SIZE, y: 1 * TILE_SIZE },
		{ text: '숲 지역', x: 20 * TILE_SIZE, y: 1 * TILE_SIZE },
		{ text: '사막 지역', x: 3 * TILE_SIZE, y: 12 * TILE_SIZE },
		{ text: '마왕성 입구', x: 30 * TILE_SIZE, y: 12 * TILE_SIZE }
	];

	labels.forEach(function(label) {
		const screenX = label.x - camera.x;
		const screenY = label.y - camera.y;

		if(screenX < -100 || screenX > mapCanvas.width + 100 || screenY < -50 || screenY > mapCanvas.height + 50) {
			return;
		}

		mapCtx.fillStyle = 'rgba(0,0,0,0.55)';
		mapCtx.fillRect(screenX - 8, screenY - 22, 110, 28);

		mapCtx.fillStyle = '#fff';
		mapCtx.font = '14px Arial';
		mapCtx.textAlign = 'left';
		mapCtx.textBaseline = 'middle';
		mapCtx.fillText(label.text, screenX, screenY - 8);
	});
}

function drawPlayer() {
	const screenX = playerMap.x - camera.x;
	const screenY = playerMap.y - camera.y;

	mapCtx.fillStyle = '#ffffff';
	mapCtx.beginPath();
	mapCtx.arc(screenX + playerMap.width / 2, screenY + 10, 9, 0, Math.PI * 2);
	mapCtx.fill();

	mapCtx.fillStyle = '#4da3ff';
	mapCtx.fillRect(screenX + 5, screenY + 18, playerMap.width - 10, 16);

	mapCtx.fillStyle = '#111';
	mapCtx.font = '16px Arial';
	mapCtx.textAlign = 'center';
	mapCtx.textBaseline = 'middle';
	mapCtx.fillText('🙂', screenX + playerMap.width / 2, screenY + 13);
}

function drawMiniInfo() {
	mapCtx.fillStyle = 'rgba(0, 0, 0, 0.55)';
	mapCtx.fillRect(12, 12, 210, 58);

	mapCtx.fillStyle = '#fff';
	mapCtx.font = '14px Arial';
	mapCtx.textAlign = 'left';
	mapCtx.textBaseline = 'top';

	mapCtx.fillText('이동: 방향키 / WASD / 터치', 24, 22);
	mapCtx.fillText('벽/물/산은 이동 불가', 24, 44);
}

initMap();
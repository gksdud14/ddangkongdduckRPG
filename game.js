const battleCountEl = document.getElementById('battleCount');
const selectedAreaNameEl = document.getElementById('selectedAreaName');

const levelEl = document.getElementById('level');
const expEl = document.getElementById('exp');
const nextExpEl = document.getElementById('nextExp');
const hpEl = document.getElementById('hp');
const maxHpEl = document.getElementById('maxHp');
const atkEl = document.getElementById('atk');
const defEl = document.getElementById('def');
const goldEl = document.getElementById('gold');

const battleBtn = document.getElementById('battleBtn');
const restartBtn = document.getElementById('restartBtn');
const areaListEl = document.getElementById('areaList');
const logBox = document.getElementById('logBox');

const battleBg = document.getElementById('battleBg');
const battleMessage = document.getElementById('battleMessage');

const playerUnit = document.getElementById('playerUnit');
const monsterUnit = document.getElementById('monsterUnit');

const playerHpBar = document.getElementById('playerHpBar');
const monsterHpBar = document.getElementById('monsterHpBar');

const playerBattleHp = document.getElementById('playerBattleHp');
const playerBattleMaxHp = document.getElementById('playerBattleMaxHp');

const monsterNameEl = document.getElementById('monsterName');
const monsterIconEl = document.getElementById('monsterIcon');
const monsterBattleHp = document.getElementById('monsterBattleHp');
const monsterBattleMaxHp = document.getElementById('monsterBattleMaxHp');

const speedButtons = document.querySelectorAll('.speed-btn');

const equippedWeaponEl = document.getElementById('equippedWeapon');
const equippedArmorEl = document.getElementById('equippedArmor');
const inventoryListEl = document.getElementById('inventoryList');

const resultModal = document.getElementById('resultModal');
const resultTitle = document.getElementById('resultTitle');
const resultContent = document.getElementById('resultContent');
const resultCloseBtn = document.getElementById('resultCloseBtn');

const resetSaveBtn = document.getElementById('resetSaveBtn');

const bossListEl = document.getElementById('bossList');

const SAVE_KEY = 'miniInflationRpgSave';

let isBattling = false;
let currentModalType = null;
let battleSpeed = 1;

let killCount = 0;
let bossKillCount = 0;
let totalEarnedExp = 0;
let totalEarnedGold = 0;
let droppedItemCount = 0;

const areas = [
	{
		id: 'grass',
		name: '초원 지역',
		minLevel: 1,
		maxLevel: 10,
		bg: 'linear-gradient(#72a86d, #263b2b)',
		monsters: [
			{ name: '슬라임', icon: '🟢', hp: 28, atk: 6, def: 0, exp: 3000, gold: 12 },
			{ name: '작은 박쥐', icon: '🦇', hp: 35, atk: 7, def: 0, exp: 5000, gold: 14 },
			{ name: '들쥐', icon: '🐀', hp: 45, atk: 9, def: 1, exp: 8000, gold: 17 },
			{ name: '초원 늑대', icon: '🐺', hp: 65, atk: 12, def: 2, exp: 13000, gold: 26 }
		]
	},
	{
		id: 'forest',
		name: '숲 지역',
		minLevel: 10,
		maxLevel: 30,
		bg: 'linear-gradient(#1f4d33, #17291f)',
		monsters: [
			{ name: '고블린', icon: '👺', hp: 120, atk: 24, def: 6, exp: 60000, gold: 35 },
			{ name: '숲 거미', icon: '🕷️', hp: 150, atk: 28, def: 7, exp: 85000, gold: 42 },
			{ name: '오크 전사', icon: '🧌', hp: 190, atk: 35, def: 10, exp: 120000, gold: 55 },
			{ name: '숲의 정령', icon: '🌲', hp: 230, atk: 42, def: 14, exp: 170000, gold: 70 }
		]
	},
	{
		id: 'desert',
		name: '사막 지역',
		minLevel: 30,
		maxLevel: 60,
		bg: 'linear-gradient(#c49a4a, #4a351c)',
		monsters: [
			{ name: '스콜피온', icon: '🦂', hp: 320, atk: 55, def: 18, exp: 450000, gold: 85 },
			{ name: '사막 도적', icon: '🥷', hp: 380, atk: 65, def: 22, exp: 650000, gold: 105 },
			{ name: '모래 골렘', icon: '🗿', hp: 520, atk: 78, def: 35, exp: 950000, gold: 135 },
			{ name: '샌드 와이번', icon: '🐉', hp: 650, atk: 95, def: 32, exp: 1400000, gold: 170 }
		]
	},
	{
		id: 'castle',
		name: '마왕성 입구',
		minLevel: 60,
		maxLevel: 100,
		bg: 'linear-gradient(#343047, #111)',
		monsters: [
			{ name: '다크 나이트', icon: '💀', hp: 850, atk: 130, def: 45, exp: 3000000, gold: 220 },
			{ name: '헬 가고일', icon: '🦅', hp: 1000, atk: 155, def: 55, exp: 4500000, gold: 280 },
			{ name: '어둠의 마법사', icon: '🧙', hp: 900, atk: 190, def: 40, exp: 6500000, gold: 320 },
			{ name: '마왕의 수문장', icon: '👹', hp: 1400, atk: 220, def: 75, exp: 9500000, gold: 450 }
		]
	}
];

const bosses = [
	{
		id: 'boss_giant_slime',
		name: '킹 슬라임',
		icon: '🟣',
		requiredLevel: 10,
		hp: 400,
		atk: 45,
		def: 12,
		exp: 250000,
		gold: 250,
		bg: 'linear-gradient(#4c6f9f, #1e2633)',
		dropRate: 80
	},
	{
		id: 'boss_orc_lord',
		name: '오크 로드',
		icon: '👹',
		requiredLevel: 30,
		hp: 1200,
		atk: 120,
		def: 40,
		exp: 1500000,
		gold: 700,
		bg: 'linear-gradient(#5a2a2a, #171111)',
		dropRate: 90
	},
	{
		id: 'boss_dark_dragon',
		name: '다크 드래곤',
		icon: '🐲',
		requiredLevel: 60,
		hp: 3000,
		atk: 260,
		def: 90,
		exp: 9000000,
		gold: 1800,
		bg: 'linear-gradient(#2b1d3d, #09070d)',
		dropRate: 100
	}
];

const itemGrades = {
	common: {
		name: 'Common',
		className: 'grade-common',
		sellRate: 0.25
	},
	rare: {
		name: 'Rare',
		className: 'grade-rare',
		sellRate: 0.35
	},
	epic: {
		name: 'Epic',
		className: 'grade-epic',
		sellRate: 0.5
	},
	legendary: {
		name: 'Legendary',
		className: 'grade-legendary',
		sellRate: 0.75
	}
};

const dropItemPool = {
	weapon: [
		// Common Weapon
		{
			id: 'drop_wood_sword',
			type: 'weapon',
			name: '나무 검',
			grade: 'common',
			atk: 6,
			def: 0
		},
		{
			id: 'drop_rusty_dagger',
			type: 'weapon',
			name: '녹슨 단검',
			grade: 'common',
			atk: 8,
			def: 0
		},
		{
			id: 'drop_bone_club',
			type: 'weapon',
			name: '뼈 몽둥이',
			grade: 'common',
			atk: 10,
			def: 0
		},
		{
			id: 'drop_apprentice_spear',
			type: 'weapon',
			name: '수습병의 창',
			grade: 'common',
			atk: 12,
			def: 1
		},

		// Rare Weapon
		{
			id: 'drop_iron_sword',
			type: 'weapon',
			name: '철 검',
			grade: 'rare',
			atk: 18,
			def: 0
		},
		{
			id: 'drop_knight_blade',
			type: 'weapon',
			name: '기사의 검',
			grade: 'rare',
			atk: 22,
			def: 2
		},
		{
			id: 'drop_hunter_bow',
			type: 'weapon',
			name: '사냥꾼의 활',
			grade: 'rare',
			atk: 26,
			def: 0
		},
		{
			id: 'drop_battle_axe',
			type: 'weapon',
			name: '전투 도끼',
			grade: 'rare',
			atk: 31,
			def: -1
		},

		// Epic Weapon
		{
			id: 'drop_dragon_sword',
			type: 'weapon',
			name: '드래곤 소드',
			grade: 'epic',
			atk: 42,
			def: 0
		},
		{
			id: 'drop_shadow_blade',
			type: 'weapon',
			name: '그림자 검',
			grade: 'epic',
			atk: 48,
			def: 2
		},
		{
			id: 'drop_flame_spear',
			type: 'weapon',
			name: '화염 창',
			grade: 'epic',
			atk: 55,
			def: 0
		},
		{
			id: 'drop_giant_slayer',
			type: 'weapon',
			name: '거인 학살자',
			grade: 'epic',
			atk: 65,
			def: -3
		},

		// Legendary Weapon
		{
			id: 'drop_legend_sword',
			type: 'weapon',
			name: '천공의 검',
			grade: 'legendary',
			atk: 85,
			def: 5
		},
		{
			id: 'drop_demon_edge',
			type: 'weapon',
			name: '마검 데모닉 엣지',
			grade: 'legendary',
			atk: 100,
			def: 0
		},
		{
			id: 'drop_star_lance',
			type: 'weapon',
			name: '성운의 창',
			grade: 'legendary',
			atk: 92,
			def: 12
		},
		{
			id: 'drop_world_breaker',
			type: 'weapon',
			name: '월드 브레이커',
			grade: 'legendary',
			atk: 120,
			def: -8
		}
	],

	armor: [
		// Common Armor
		{
			id: 'drop_cloth_armor',
			type: 'armor',
			name: '천 갑옷',
			grade: 'common',
			atk: 0,
			def: 6
		},
		{
			id: 'drop_leather_vest',
			type: 'armor',
			name: '가죽 조끼',
			grade: 'common',
			atk: 0,
			def: 8
		},
		{
			id: 'drop_wooden_shield',
			type: 'armor',
			name: '나무 방패',
			grade: 'common',
			atk: 1,
			def: 10
		},
		{
			id: 'drop_guard_uniform',
			type: 'armor',
			name: '경비병 제복',
			grade: 'common',
			atk: 0,
			def: 13
		},

		// Rare Armor
		{
			id: 'drop_chain_armor',
			type: 'armor',
			name: '체인 아머',
			grade: 'rare',
			atk: 0,
			def: 18
		},
		{
			id: 'drop_knight_armor',
			type: 'armor',
			name: '기사 갑옷',
			grade: 'rare',
			atk: 2,
			def: 23
		},
		{
			id: 'drop_hunter_coat',
			type: 'armor',
			name: '사냥꾼 코트',
			grade: 'rare',
			atk: 5,
			def: 21
		},
		{
			id: 'drop_steel_shield',
			type: 'armor',
			name: '강철 방패',
			grade: 'rare',
			atk: 0,
			def: 31
		},

		// Epic Armor
		{
			id: 'drop_dragon_armor',
			type: 'armor',
			name: '드래곤 아머',
			grade: 'epic',
			atk: 0,
			def: 42
		},
		{
			id: 'drop_shadow_cloak',
			type: 'armor',
			name: '그림자 망토',
			grade: 'epic',
			atk: 8,
			def: 38
		},
		{
			id: 'drop_flame_plate',
			type: 'armor',
			name: '화염 판금갑옷',
			grade: 'epic',
			atk: 4,
			def: 52
		},
		{
			id: 'drop_giant_guard',
			type: 'armor',
			name: '거인의 수호갑',
			grade: 'epic',
			atk: -2,
			def: 65
		},

		// Legendary Armor
		{
			id: 'drop_legend_armor',
			type: 'armor',
			name: '황금 갑옷',
			grade: 'legendary',
			atk: 5,
			def: 85
		},
		{
			id: 'drop_demon_mail',
			type: 'armor',
			name: '마갑 데모닉 메일',
			grade: 'legendary',
			atk: 15,
			def: 82
		},
		{
			id: 'drop_star_guard',
			type: 'armor',
			name: '성운의 수호복',
			grade: 'legendary',
			atk: 10,
			def: 100
		},
		{
			id: 'drop_world_wall',
			type: 'armor',
			name: '월드 월',
			grade: 'legendary',
			atk: -5,
			def: 125
		}
	]
};

const shopItems = {
	sword1: {
		id: 'sword1',
		type: 'weapon',
		name: '낡은 검',
		grade: 'common',
		price: 30,
		atk: 5,
		def: 0
	},
	sword2: {
		id: 'sword2',
		type: 'weapon',
		name: '강철 검',
		grade: 'rare',
		price: 120,
		atk: 15,
		def: 0
	},
	armor1: {
		id: 'armor1',
		type: 'armor',
		name: '가죽 갑옷',
		grade: 'common',
		price: 40,
		atk: 0,
		def: 5
	},
	armor2: {
		id: 'armor2',
		type: 'armor',
		name: '강철 갑옷',
		grade: 'rare',
		price: 140,
		atk: 0,
		def: 15
	}
};

let player = {};
let selectedAreaId = 'grass';
let battleCount = 30;
let gameEnded = false;
let defeatedBossIds = [];

function initGame() {
	const permanentData = loadPermanentData();

	player = {
		level: 1,
		exp: 0,
		nextExp: 30,
		maxHp: 100,
		hp: 100,

		baseAtk: 10,
		baseDef: 3,

		atk: 10,
		def: 3,

		gold: 0,

		inventory: permanentData.inventory,
		equipped: permanentData.equipped
	};

	selectedAreaId = 'grass';
	battleCount = 30;
	gameEnded = false;
	isBattling = false;

	killCount = 0;
	bossKillCount = 0;
	totalEarnedExp = 0;
	totalEarnedGold = 0;
	droppedItemCount = 0;
	currentModalType = null;
	
	// 한 회차 보스 처치 기록 초기화
	defeatedBossIds = [];

	recalculateStats();

	logBox.innerHTML = '';
	addLog('새 회차를 시작했습니다. 보유 장비와 장착 상태는 유지됩니다.', 'system');

	renderAreas();
	renderBosses();
	updateUI();
	updateBattleScreen();
	renderInventory();
}

function recalculateStats() {
	let equipAtk = 0;
	let equipDef = 0;

	if(player.equipped.weapon) {
		equipAtk += player.equipped.weapon.atk;
		equipDef += player.equipped.weapon.def;
	}

	if(player.equipped.armor) {
		equipAtk += player.equipped.armor.atk;
		equipDef += player.equipped.armor.def;
	}

	player.atk = player.baseAtk + equipAtk;
	player.def = player.baseDef + equipDef;
}

speedButtons.forEach(function(button) {
	button.addEventListener('click', function() {
		speedButtons.forEach(function(btn) {
			btn.classList.remove('active');
		});

		this.classList.add('active');

		const speed = this.dataset.speed;

		if(speed === 'skip') {
			battleSpeed = 'skip';
		} else {
			battleSpeed = Number(speed);
		}

		addLog(`전투 속도: ${speed === 'skip' ? '스킵' : 'x' + speed}`, 'system');
	});
});

function renderAreas() {
	let html = '';

	areas.forEach(function(area) {
		const activeClass = area.id === selectedAreaId ? 'active' : '';

		const minExp = Math.min(...area.monsters.map(function(monster) {
			return monster.exp;
		}));

		const maxExp = Math.max(...area.monsters.map(function(monster) {
			return monster.exp;
		}));

		const minGold = Math.min(...area.monsters.map(function(monster) {
			return monster.gold;
		}));

		const maxGold = Math.max(...area.monsters.map(function(monster) {
			return monster.gold;
		}));

		html += `
			<div class="area-card ${activeClass}">
				<h3>${area.name}</h3>
				<p>권장 레벨: ${area.minLevel} ~ ${area.maxLevel}</p>
				<p>출현 몬스터: ${area.monsters.length}종</p>
				<p>보상: EXP ${formatNumber(minExp)}~${formatNumber(maxExp)} / GOLD ${formatNumber(minGold)}~${formatNumber(maxGold)}</p>
				<button type="button" onclick="selectArea('${area.id}')">선택</button>
			</div>
		`;
	});

	areaListEl.innerHTML = html;
}

function getRandomMonster(area) {
	const randomIndex = Math.floor(Math.random() * area.monsters.length);
	const baseMonster = area.monsters[randomIndex];

	return baseMonster;
}

function selectArea(areaId) {
	if(gameEnded) {
		addLog('게임이 종료되었습니다. 다시 시작해 주세요.', 'system');
		return;
	}

	selectedAreaId = areaId;
	renderAreas();
	updateUI();
	updateBattleScreen();
}

function getSelectedArea() {
	return areas.find(function(area) {
		return area.id === selectedAreaId;
	});
}

async function battle() {
	if(isBattling) {
		return;
	}

	if(gameEnded) {
		addLog('이미 게임이 종료되었습니다.', 'system');
		return;
	}

	if(battleCount <= 0) {
		endGame();
		return;
	}

	isBattling = true;
	battleBtn.disabled = true;

	const area = getSelectedArea();
	const monster = createMonster(area);

	addLog(`${area.name}에서 ${monster.name}와 전투를 시작했습니다.`, 'system');

	const result = await simulateBattleWithDisplay(monster);

	let levelUpCount = 0;
	let dropItem = null;

	if(result.win) {
		battleCount -= 1;

		player.exp += monster.exp;
		player.gold += monster.gold;

		totalEarnedExp += monster.exp;
		totalEarnedGold += monster.gold;
		killCount++;

		addLog(`${result.turn}턴 만에 승리했습니다.`, 'win');
		addLog(`플레이어가 준 총 피해: ${result.totalPlayerDamage}`, 'system');
		addLog(`플레이어가 받은 총 피해: ${result.totalMonsterDamage}`, 'system');
		addLog(`EXP ${monster.exp}, GOLD ${monster.gold} 획득`, 'win');

		levelUpCount = checkLevelUp();

		dropItem = rollDropItem();

		if(dropItem) {
			player.inventory.push(dropItem);
			droppedItemCount++;

			savePermanentData();

			const gradeInfo = itemGrades[dropItem.grade] || itemGrades.common;

			addLog(`${gradeInfo.name} 장비 [${dropItem.name}]을 획득했습니다.`, 'level-up');
		}

		player.hp = player.maxHp;
		battleMessage.textContent = '전투 승리! HP가 모두 회복되었습니다.';
	} else {
		battleCount -= 3;

		addLog(`${result.turn}턴 동안 버텼지만 패배했습니다.`, 'lose');
		addLog(`플레이어가 준 총 피해: ${result.totalPlayerDamage}`, 'system');
		addLog(`플레이어가 받은 총 피해: ${result.totalMonsterDamage}`, 'system');
		addLog(`패배하여 전투 횟수가 3 감소했습니다.`, 'lose');

		player.hp = player.maxHp;
		battleMessage.textContent = '전투 패배... HP가 모두 회복되었습니다.';
	}

	if(battleCount < 0) {
		battleCount = 0;
	}

	updateUI();
	renderInventory();

	showBattleResult({
		win: result.win,
		turn: result.turn,
		totalPlayerDamage: result.totalPlayerDamage,
		totalMonsterDamage: result.totalMonsterDamage,
		exp: result.win ? monster.exp : 0,
		gold: result.win ? monster.gold : 0,
		levelUpCount: levelUpCount,
		dropItem: dropItem,
		battleCountChange: result.win ? -1 : -3,
		isBoss: false
	});

	if(battleCount <= 0) {
		endGame();
	}

	updateBattleScreen();

	isBattling = false;

	if(!gameEnded) {
		battleBtn.disabled = false;
	}
}

function createMonster(area) {
	const baseMonster = getRandomMonster(area);
	const levelBonus = Math.max(1, Math.floor(player.level / 10));

	return {
		name: baseMonster.name,
		icon: baseMonster.icon,
		hp: baseMonster.hp + levelBonus * 10,
		atk: baseMonster.atk + levelBonus * 3,
		def: baseMonster.def + levelBonus,
		exp: baseMonster.exp,
		gold: baseMonster.gold
	};
}

function simulateBattle(monster) {
	let playerHp = player.hp;
	let monsterHp = monster.hp;

	let turn = 1;
	let totalPlayerDamage = 0;
	let totalMonsterDamage = 0;

	while(playerHp > 0 && monsterHp > 0 && turn <= 50) {
		const playerDamage = Math.max(1, player.atk - monster.def);
		monsterHp -= playerDamage;
		totalPlayerDamage += playerDamage;

		if(monsterHp <= 0) {
			return {
				win: true,
				turn: turn,
				totalPlayerDamage: totalPlayerDamage,
				totalMonsterDamage: totalMonsterDamage,
				playerHpAfterBattle: playerHp,
				monsterHpAfterBattle: 0
			};
		}

		const monsterDamage = Math.max(1, monster.atk - player.def);
		playerHp -= monsterDamage;
		totalMonsterDamage += monsterDamage;

		if(playerHp <= 0) {
			return {
				win: false,
				turn: turn,
				totalPlayerDamage: totalPlayerDamage,
				totalMonsterDamage: totalMonsterDamage,
				playerHpAfterBattle: 0,
				monsterHpAfterBattle: monsterHp
			};
		}

		turn++;
	}

	if(playerHp > 0) {
		return {
			win: true,
			turn: turn,
			totalPlayerDamage: totalPlayerDamage,
			totalMonsterDamage: totalMonsterDamage,
			playerHpAfterBattle: playerHp,
			monsterHpAfterBattle: monsterHp
		};
	}

	return {
		win: false,
		turn: turn,
		totalPlayerDamage: totalPlayerDamage,
		totalMonsterDamage: totalMonsterDamage,
		playerHpAfterBattle: 0,
		monsterHpAfterBattle: monsterHp
	};
}

function checkLevelUp() {
	let levelUpCount = 0;

	while(player.exp >= player.nextExp) {
		player.exp -= player.nextExp;
		player.level++;
		levelUpCount++;

		player.maxHp += 20;
		player.hp = player.maxHp;
		player.baseAtk += 4;
		player.baseDef += 2;

		player.nextExp = Math.floor(player.nextExp * 1.18 + 25);
	}

	recalculateStats();

	if(levelUpCount > 0) {
		addLog(`LEVEL UP! +${levelUpCount} → 현재 레벨 ${player.level}`, 'level-up');
	}

	return levelUpCount;
}

function formatNumber(num) {
	return Number(num).toLocaleString();
}

function buyItem(itemKey) {
	if(gameEnded) {
		addLog('게임이 종료되어 상점을 이용할 수 없습니다.', 'system');
		return;
	}

	const item = shopItems[itemKey];

	if(!item) {
		return;
	}

	const alreadyOwned = player.inventory.some(function(ownedItem) {
		return ownedItem.id === item.id;
	});

	if(alreadyOwned) {
		addLog(`${item.name}은 이미 보유 중입니다.`, 'system');
		return;
	}

	if(player.gold < item.price) {
		addLog(`${item.name} 구매 실패. GOLD가 부족합니다.`, 'lose');
		return;
	}

	player.gold -= item.price;

	player.inventory.push({
		id: item.id,
		originId: item.id,
		type: item.type,
		name: item.name,
		grade: item.grade,
		atk: item.atk,
		def: item.def
	});

	savePermanentData();

	addLog(`${item.name}을 구매했습니다. 인벤토리에 추가되었습니다.`, 'system');

	updateUI();
	renderInventory();
}

function equipItem(itemId) {
	const item = player.inventory.find(function(inventoryItem) {
		return inventoryItem.id === itemId;
	});

	if(!item) {
		return;
	}

	if(item.type === 'weapon') {
		player.equipped.weapon = item;
		addLog(`${item.name}을 무기로 장착했습니다.`, 'system');
	}

	if(item.type === 'armor') {
		player.equipped.armor = item;
		addLog(`${item.name}을 방어구로 장착했습니다.`, 'system');
	}

	recalculateStats();
	savePermanentData();
	
	updateUI();
	renderInventory();
}

function renderInventory() {
	equippedWeaponEl.textContent = player.equipped.weapon ? player.equipped.weapon.name : '없음';
	equippedArmorEl.textContent = player.equipped.armor ? player.equipped.armor.name : '없음';

	if(player.inventory.length === 0) {
		inventoryListEl.innerHTML = '<p class="empty-text">보유 장비가 없습니다.</p>';
		return;
	}

	let html = '';

	player.inventory.forEach(function(item) {
		let isEquipped = false;

		if(item.type === 'weapon' && player.equipped.weapon && player.equipped.weapon.id === item.id) {
			isEquipped = true;
		}

		if(item.type === 'armor' && player.equipped.armor && player.equipped.armor.id === item.id) {
			isEquipped = true;
		}

		const gradeInfo = itemGrades[item.grade] || itemGrades.common;
		const typeName = item.type === 'weapon' ? '무기' : '방어구';
		const compareInfo = getItemCompareText(item);
		const sellPrice = getSellPrice(item);

		html += `
			<div class="inventory-item ${isEquipped ? 'equipped' : ''} ${gradeInfo.className}">
				<strong>${item.name}</strong>
				<p>${gradeInfo.name} / ${typeName} / ATK +${item.atk} / DEF +${item.def}</p>
				<p class="${compareInfo.className}">${compareInfo.text}</p>
				<p>판매가: ${sellPrice} GOLD</p>

				<div class="inventory-actions">
					<button type="button" class="equip-btn" onclick="equipItem('${item.id}')" ${isEquipped ? 'disabled' : ''}>
						${isEquipped ? '장착 중' : '장착'}
					</button>
					<button type="button" class="sell-btn" onclick="sellItem('${item.id}')" ${isEquipped ? 'disabled' : ''}>
						판매
					</button>
				</div>
			</div>
		`;
	});

	inventoryListEl.innerHTML = html;
}

function sellItem(itemId) {
	const itemIndex = player.inventory.findIndex(function(item) {
		return item.id === itemId;
	});

	if(itemIndex === -1) {
		return;
	}

	const item = player.inventory[itemIndex];

	if(player.equipped.weapon && player.equipped.weapon.id === item.id) {
		addLog('장착 중인 무기는 판매할 수 없습니다.', 'lose');
		return;
	}

	if(player.equipped.armor && player.equipped.armor.id === item.id) {
		addLog('장착 중인 방어구는 판매할 수 없습니다.', 'lose');
		return;
	}

	const sellPrice = getSellPrice(item);

	player.gold += sellPrice;
	player.inventory.splice(itemIndex, 1);

	savePermanentData();

	addLog(`${item.name}을 판매하여 ${sellPrice} GOLD를 획득했습니다.`, 'system');

	updateUI();
	renderInventory();
}

function endGame() {
	gameEnded = true;
	battleBtn.disabled = true;

	addLog(`전투 횟수를 모두 사용했습니다. 최종 레벨은 ${player.level}입니다.`, 'level-up');
}

function updateUI() {
	const area = getSelectedArea();

	battleCountEl.textContent = battleCount;
	selectedAreaNameEl.textContent = area.name;

	levelEl.textContent = player.level;
	expEl.textContent = formatNumber(player.exp);
	nextExpEl.textContent = formatNumber(player.nextExp);
	hpEl.textContent = player.hp;
	maxHpEl.textContent = player.maxHp;
	atkEl.textContent = player.atk;
	defEl.textContent = player.def;
	goldEl.textContent = formatNumber(player.gold);

	battleBtn.disabled = gameEnded;
	
	renderBosses();
}

function addLog(message, type) {
	const p = document.createElement('p');

	if(type) {
		p.classList.add(type);
	}

	p.textContent = message;

	logBox.prepend(p);
}

battleBtn.addEventListener('click', battle);

restartBtn.addEventListener('click', function() {
	initGame();
});

if(resetSaveBtn) {
	resetSaveBtn.addEventListener('click', resetPermanentData);
}

function updateBattleScreen(monster = null) {
	const area = getSelectedArea();

	if(monster && monster.bg) {
		battleBg.style.background = monster.bg;
		battleMessage.textContent = `${monster.name}이 나타났습니다!`;
	} else {
		battleBg.style.background = area.bg;
		battleMessage.textContent = `${area.name}에 도착했습니다.`;
	}

	playerBattleHp.textContent = player.maxHp;
	playerBattleMaxHp.textContent = player.maxHp;
	playerHpBar.style.width = '100%';

	const displayMonster = monster || area.monsters[0];

	monsterNameEl.textContent = displayMonster.name;
	monsterIconEl.textContent = displayMonster.icon;

	monsterBattleHp.textContent = displayMonster.hp;
	monsterBattleMaxHp.textContent = displayMonster.hp;
	monsterHpBar.style.width = '100%';
}

async function simulateBattleWithDisplay(monster) {
	let playerHp = player.maxHp;
	let monsterHp = monster.hp;

	let turn = 1;
	let totalPlayerDamage = 0;
	let totalMonsterDamage = 0;

	updateBattleScreen(monster);
	updateBattleHp(playerHp, player.maxHp, monsterHp, monster.hp);

	await wait(400);

	while(playerHp > 0 && monsterHp > 0 && turn <= 50) {
		battleMessage.textContent = `${turn}턴 - 플레이어 공격!`;

		const playerDamage = Math.max(1, player.atk - monster.def);
		monsterHp -= playerDamage;

		if(monsterHp < 0) {
			monsterHp = 0;
		}

		totalPlayerDamage += playerDamage;

		await playAttackAnimation(playerUnit, monsterUnit, playerDamage);
		updateBattleHp(playerHp, player.maxHp, monsterHp, monster.hp);

		if(monsterHp <= 0) {
			await wait(500);

			return {
				win: true,
				turn: turn,
				totalPlayerDamage: totalPlayerDamage,
				totalMonsterDamage: totalMonsterDamage
			};
		}

		await wait(400);

		battleMessage.textContent = `${turn}턴 - ${monster.name} 반격!`;

		const monsterDamage = Math.max(1, monster.atk - player.def);
		playerHp -= monsterDamage;

		if(playerHp < 0) {
			playerHp = 0;
		}

		totalMonsterDamage += monsterDamage;

		await playAttackAnimation(monsterUnit, playerUnit, monsterDamage);
		updateBattleHp(playerHp, player.maxHp, monsterHp, monster.hp);

		if(playerHp <= 0) {
			await wait(500);

			return {
				win: false,
				turn: turn,
				totalPlayerDamage: totalPlayerDamage,
				totalMonsterDamage: totalMonsterDamage
			};
		}

		turn++;

		await wait(300);
	}

	return {
		win: playerHp > 0,
		turn: turn,
		totalPlayerDamage: totalPlayerDamage,
		totalMonsterDamage: totalMonsterDamage
	};
}

function updateBattleHp(playerHp, playerMaxHp, monsterHp, monsterMaxHp) {
	const playerPercent = Math.max(0, Math.floor((playerHp / playerMaxHp) * 100));
	const monsterPercent = Math.max(0, Math.floor((monsterHp / monsterMaxHp) * 100));

	playerBattleHp.textContent = playerHp;
	playerBattleMaxHp.textContent = playerMaxHp;
	playerHpBar.style.width = playerPercent + '%';

	monsterBattleHp.textContent = monsterHp;
	monsterBattleMaxHp.textContent = monsterMaxHp;
	monsterHpBar.style.width = monsterPercent + '%';
}

async function playAttackAnimation(attackerEl, targetEl, damage) {
	if(battleSpeed === 'skip') {
		showDamageText(targetEl, damage);
		return;
	}

	attackerEl.classList.add('attack');

	await wait(180);

	attackerEl.classList.remove('attack');
	targetEl.classList.add('hit');

	showDamageText(targetEl, damage);

	await wait(250);

	targetEl.classList.remove('hit');
}

function showDamageText(targetEl, damage) {
	const damageEl = document.createElement('div');
	damageEl.className = 'damage-text';
	damageEl.textContent = '-' + damage;

	targetEl.appendChild(damageEl);

	setTimeout(function() {
		damageEl.remove();
	}, 700);
}

function wait(ms) {
	if(battleSpeed === 'skip') {
		return Promise.resolve();
	}

	return new Promise(function(resolve) {
		setTimeout(resolve, ms / battleSpeed);
	});
}

function rollDropItem(options = {}) {
	const dropRate = options.dropRate ?? 35;
	const legendaryEnabled = options.legendaryEnabled ?? false;

	const roll = Math.floor(Math.random() * 100) + 1;

	if(roll > dropRate) {
		return null;
	}

	const gradeRoll = Math.floor(Math.random() * 100) + 1;

	let grade = 'common';

	if(legendaryEnabled && gradeRoll <= 3) {
		grade = 'legendary';
	} else if(gradeRoll <= 15) {
		grade = 'epic';
	} else if(gradeRoll <= 45) {
		grade = 'rare';
	}

	const type = Math.random() < 0.5 ? 'weapon' : 'armor';

	const candidates = dropItemPool[type].filter(function(item) {
		return item.grade === grade;
	});

	if(candidates.length === 0) {
		return null;
	}

	const randomIndex = Math.floor(Math.random() * candidates.length);
	const baseItem = candidates[randomIndex];

	return {
		id: baseItem.id + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
		originId: baseItem.id,
		type: baseItem.type,
		name: baseItem.name,
		grade: baseItem.grade,
		atk: baseItem.atk,
		def: baseItem.def
	};
}

function showBattleResult(resultData) {
	currentModalType = 'battle';

	let html = '';

	html += `<p>결과: <strong>${resultData.win ? '승리' : '패배'}</strong></p>`;
	html += `<p>전투 턴: ${resultData.turn}턴</p>`;
	if(typeof resultData.battleCountChange !== 'undefined') {
		const sign = resultData.battleCountChange > 0 ? '+' : '';

		html += `<p>전투 횟수 변화: ${sign}${resultData.battleCountChange}</p>`;
	}
	html += `<p>준 피해: ${resultData.totalPlayerDamage}</p>`;
	html += `<p>받은 피해: ${resultData.totalMonsterDamage}</p>`;

	if(resultData.win) {
		html += `<p>획득 EXP: ${formatNumber(resultData.exp)}</p>`;
		html += `<p>획득 GOLD: ${formatNumber(resultData.gold)}</p>`;
	}

	if(resultData.levelUpCount > 0) {
		html += `<p class="level-up">레벨업: +${resultData.levelUpCount}</p>`;
	}

	if(resultData.dropItem) {
		const gradeInfo = itemGrades[resultData.dropItem.grade] || itemGrades.common;

		html += `
			<div class="result-item ${gradeInfo.className}">
				<strong>장비 획득!</strong>
				<p>${gradeInfo.name} / ${resultData.dropItem.name}</p>
				<p>ATK +${resultData.dropItem.atk} / DEF +${resultData.dropItem.def}</p>
			</div>
		`;
	} else if(resultData.win) {
		html += `<p>장비 드랍: 없음</p>`;
	}

	resultTitle.textContent = resultData.isBoss ? '보스전 결과' : '전투 결과';
	resultContent.innerHTML = html;
	resultModal.classList.add('show');
}

function showFinalResult() {
	currentModalType = 'final';

	let html = '';

	html += `<p>최종 레벨: <strong>${player.level}</strong></p>`;
	html += `<p>처치 몬스터 수: ${killCount}</p>`;
	html += `<p>보스 처치 수: ${bossKillCount}</p>`;
	html += `<p>총 획득 EXP: ${totalEarnedExp}</p>`;
	html += `<p>총 획득 GOLD: ${totalEarnedGold}</p>`;
	html += `<p>획득 장비 수: ${droppedItemCount}</p>`;
	html += `<p>최종 ATK: ${player.atk}</p>`;
	html += `<p>최종 DEF: ${player.def}</p>`;

	resultTitle.textContent = '최종 결과';
	resultContent.innerHTML = `<div class="final-result result-item">${html}</div>`;
	resultModal.classList.add('show');
}

function getItemPower(item) {
	if(item.type === 'weapon') {
		return item.atk * 1.2 + item.def * 0.5;
	}

	if(item.type === 'armor') {
		return item.def * 1.2 + item.atk * 0.5;
	}

	return item.atk + item.def;
}

function getSellPrice(item) {
	const gradeInfo = itemGrades[item.grade] || itemGrades.common;
	const power = Math.round(getItemPower(item));

	return Math.max(5, Math.floor(power * gradeInfo.sellRate * 10));
}

function getEquippedItemByType(type) {
	if(type === 'weapon') {
		return player.equipped.weapon;
	}

	if(type === 'armor') {
		return player.equipped.armor;
	}

	return null;
}

function getItemCompareText(item) {
	const equippedItem = getEquippedItemByType(item.type);

	if(!equippedItem) {
		return {
			text: '현재 장착 장비 없음',
			className: 'compare-good'
		};
	}

	const itemPower = Math.round(getItemPower(item));
	const equippedPower = Math.round(getItemPower(equippedItem));
	const diff = itemPower - equippedPower;

	if(diff > 0) {
		return {
			text: `현재 장비보다 +${diff} 좋음`,
			className: 'compare-good'
		};
	}

	if(diff < 0) {
		return {
			text: `현재 장비보다 ${diff} 낮음`,
			className: 'compare-bad'
		};
	}

	return {
		text: '현재 장비와 동일',
		className: 'compare-same'
	};
}

function renderBosses() {
	let html = '';

	bosses.forEach(function(boss) {
		const canChallenge = player.level >= boss.requiredLevel;
		const isDefeated = defeatedBossIds.includes(boss.id);

		let buttonText = '레벨 부족';
		let disabled = true;

		if(isDefeated) {
			buttonText = '처치 완료';
			disabled = true;
		} else if(canChallenge) {
			buttonText = '도전하기';
			disabled = false;
		}

		html += `
			<div class="boss-card ${canChallenge && !isDefeated ? 'active' : ''} ${isDefeated ? 'defeated' : ''}">
				<h3>${boss.icon} ${boss.name}</h3>
				<p>도전 가능 레벨: ${boss.requiredLevel} 이상</p>
				<p>보상: EXP ${formatNumber(boss.exp)} / GOLD ${formatNumber(boss.gold)}</p>
				<p>장비 드랍률: ${boss.dropRate}%</p>
				<p>상태: ${isDefeated ? '처치 완료' : '미처치'}</p>
				<button type="button" onclick="battleBoss('${boss.id}')" ${disabled ? 'disabled' : ''}>
					${buttonText}
				</button>
			</div>
		`;
	});

	bossListEl.innerHTML = html;
}

function getBossById(bossId) {
	return bosses.find(function(boss) {
		return boss.id === bossId;
	});
}

function createBossMonster(boss) {
	const levelBonus = Math.max(1, Math.floor(player.level / 20));

	return {
		name: boss.name,
		icon: boss.icon,
		hp: boss.hp + levelBonus * 50,
		atk: boss.atk + levelBonus * 10,
		def: boss.def + levelBonus * 4,
		exp: boss.exp,
		gold: boss.gold,
		bg: boss.bg,
		dropRate: boss.dropRate,
		isBoss: true
	};
}

async function battleBoss(bossId) {
	if(isBattling) {
		return;
	}

	if(gameEnded) {
		addLog('이미 게임이 종료되었습니다.', 'system');
		return;
	}

	if(battleCount <= 0) {
		endGame();
		return;
	}

	const bossData = getBossById(bossId);

	if(!bossData) {
		return;
	}
	
	if(defeatedBossIds.includes(bossData.id)) {
		addLog(`${bossData.name}은 이번 회차에서 이미 처치했습니다.`, 'system');
		return;
	}

	if(player.level < bossData.requiredLevel) {
		addLog(`${bossData.name}에 도전하려면 레벨 ${bossData.requiredLevel} 이상이 필요합니다.`, 'lose');
		return;
	}

	isBattling = true;
	battleBtn.disabled = true;

	const monster = createBossMonster(bossData);

	addLog(`보스 ${monster.name}에게 도전합니다!`, 'system');

	updateBattleScreen(monster);

	const result = await simulateBattleWithDisplay(monster);

	let levelUpCount = 0;
	let dropItem = null;

	if(result.win) {
		battleCount += 10;

		player.exp += monster.exp;
		player.gold += monster.gold;

		totalEarnedExp += monster.exp;
		totalEarnedGold += monster.gold;
		killCount++;
		bossKillCount++;
		
		defeatedBossIds.push(bossData.id);

		addLog(`보스 ${monster.name} 처치 성공!`, 'win');
		addLog(`${result.turn}턴 만에 승리했습니다.`, 'win');
		addLog(`EXP ${monster.exp}, GOLD ${monster.gold} 획득`, 'win');
		addLog(`보스전 승리로 전투 횟수가 10 증가했습니다.`, 'system');

		levelUpCount = checkLevelUp();

		dropItem = rollDropItem({
			dropRate: monster.dropRate,
			legendaryEnabled: true
		});

		if(dropItem) {
			player.inventory.push(dropItem);
			droppedItemCount++;

			savePermanentData();

			const gradeInfo = itemGrades[dropItem.grade] || itemGrades.common;

			addLog(`${gradeInfo.name} 장비 [${dropItem.name}]을 획득했습니다.`, 'level-up');
		}

		player.hp = player.maxHp;
		battleMessage.textContent = '보스전 승리! HP가 모두 회복되었습니다.';
	} else {
		battleCount -= 3;

		addLog(`보스 ${monster.name}에게 패배했습니다.`, 'lose');
		addLog(`${result.turn}턴 동안 버텼지만 패배했습니다.`, 'lose');
		addLog(`보스전 패배로 전투 횟수가 3 감소했습니다.`, 'lose');

		player.hp = player.maxHp;
		battleMessage.textContent = '보스전 패배... HP가 모두 회복되었습니다.';
	}

	if(battleCount < 0) {
		battleCount = 0;
	}

	updateUI();
	renderInventory();

	showBattleResult({
		win: result.win,
		turn: result.turn,
		totalPlayerDamage: result.totalPlayerDamage,
		totalMonsterDamage: result.totalMonsterDamage,
		exp: result.win ? monster.exp : 0,
		gold: result.win ? monster.gold : 0,
		levelUpCount: levelUpCount,
		dropItem: dropItem,
		battleCountChange: result.win ? 10 : -3,
		isBoss: true
	});

	if(battleCount <= 0) {
		endGame();
	}

	updateBattleScreen();

	isBattling = false;

	if(!gameEnded) {
		battleBtn.disabled = false;
	}
}

resultCloseBtn.addEventListener('click', function() {
	resultModal.classList.remove('show');

	if(currentModalType === 'battle' && gameEnded) {
		currentModalType = null;
		showFinalResult();
		return;
	}

	if(currentModalType === 'final') {
		currentModalType = null;
	}
});

document.querySelectorAll('.shop-item button').forEach(function(button) {
	button.addEventListener('click', function() {
		const itemKey = this.dataset.item;
		buyItem(itemKey);
	});
});

function savePermanentData() {
	const data = {
		inventory: player.inventory,
		equipped: {
			weaponId: player.equipped.weapon ? player.equipped.weapon.id : null,
			armorId: player.equipped.armor ? player.equipped.armor.id : null
		}
	};

	localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function loadPermanentData() {
	const defaultData = {
		inventory: [],
		equipped: {
			weapon: null,
			armor: null
		}
	};

	const savedData = localStorage.getItem(SAVE_KEY);

	if(!savedData) {
		return defaultData;
	}

	try {
		const parsedData = JSON.parse(savedData);
		const inventory = Array.isArray(parsedData.inventory) ? parsedData.inventory : [];

		const weaponId = parsedData.equipped ? parsedData.equipped.weaponId : null;
		const armorId = parsedData.equipped ? parsedData.equipped.armorId : null;

		const weapon = inventory.find(function(item) {
			return item.id === weaponId;
		}) || null;

		const armor = inventory.find(function(item) {
			return item.id === armorId;
		}) || null;

		return {
			inventory: inventory,
			equipped: {
				weapon: weapon,
				armor: armor
			}
		};
	} catch(e) {
		console.error('저장 데이터를 불러오지 못했습니다.', e);
		return defaultData;
	}
}

function resetPermanentData() {
	if(!confirm('저장된 장비 데이터를 모두 삭제하시겠습니까?')) {
		return;
	}

	localStorage.removeItem(SAVE_KEY);

	initGame();

	addLog('저장된 장비 데이터가 삭제되었습니다.', 'system');
}

initGame();


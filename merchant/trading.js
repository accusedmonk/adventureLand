const keepItems = ['hpot0', 'hpot1', 'mpot0', 'mpot1'];

const merchantName = 'LorChant';
var lastTraded = null;

const sendAllGoldAndItems = () => {
  const merchant = get_player(merchantName);
  if (merchant == null) {
    return;
  }
  if (distance(merchant, character) > 300) {
    return;
  }
  // Give 10 second delay between giving merchant all items to avoid call limit.
  if (lastTraded != null && Date.now() - lastTraded < 60000) {
    return;
  }

  send_gold(merchant, character.gold);

  const items = character.items;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item == null) continue;
    if (keepItems.includes(item.name)) {
      continue;
    }

    send_item(merchant, i, item.q);
  }
  game_log(`Sending All Items to ${merchantName}`);

  lastTraded = Date.now();
};

const autoBuffLuck = () => {
  for (let c of getOnlineCharacters()) {
    let cha = get_player(c.name);
    if (!cha) continue;
    if (cha.s && cha.s.mluck) {
      let duration = cha.s.mluck.ms;
      if (duration < 45 * 60 * 1000) {
        if (is_in_range(cha, 'mluck')) {
          game_log(`Using luck on ${cha.name}`);
          use_skill('mluck', cha);
          return;
        }
      }
    }
  }
};

const getOnlineCharacters = () => {
  var online = [];
  for (let c of get_characters()) {
    if (c.name != character.name && c.online > 0) {
      online.push(c);
    }
  }

  return online;
};

const goToParty = () => {
  var characters = get_characters();
  let map = 'main';
  let x,
    y = 0;
  for (let cha of characters) {
    if (cha.online == 0) {
      continue;
    }
    if (cha.name == character.name) {
      continue;
    }

    map = cha.map;
    x = cha.x;
    y = cha.y;
  }

  smart_move({ map: map, x: x, y: y });
};

///
///	Auto Sell
///

const junkItems = ['slimestaff'];

const sellAllJunkItems = () => {
  for (i = 0; i < character.items.length; i++) {
    let item = character.items[i];
    if (!item) continue;

    if (junkItems.includes(item.name)) {
      sell(i, item.q ?? 1);
    }
  }
};

/////////////////////////////
// COMPOUND/COMBINING
/////////////////////////////

const combineNames = ['hpbelt', 'hpamulet', 'ringsj', 'wbook0'];
const combineLevel = {
  0: 'cscroll0',
  1: 'cscroll0',
};
const maxLevelAttempt = 2;
const nextAttemptDelay = 15 * 1000;
var lastAttempt = 0;

const autoCombine = () => {
  if (character.q.compound) return;
  if (Date.now() - lastAttempt < nextAttemptDelay) return;
  for (let name of combineNames) {
    for (let level = 0; level < maxLevelAttempt; level++) {
      let count = getItemCountInInventory(name, level);
      if (count >= 3) {
        combine(name, level);
        return;
      }
    }
  }
};

const getItemCountInInventory = (itemName, level) => {
  let count = 0;
  for (i = 0; i < character.items.length; i++) {
    let item = character.items[i];
    if (!item) continue;

    if (item.name === itemName && item.level === level) {
      count++;
    }
  }

  return count;
};

const getNextIndexOfItem = (itemName, level, index) => {
  for (i = index; i < character.items.length; i++) {
    let item = character.items[i];
    if (!item) continue;

    if (item.name === itemName && item.level === level) {
      return i;
    }
  }

  return -1;
};

const combine = (itemName, level) => {
  game_log(`Combining Level ${level + 1} ${itemName}`);
  let first = getNextIndexOfItem(itemName, level, 0);
  let second = getNextIndexOfItem(itemName, level, first + 1);
  let third = getNextIndexOfItem(itemName, level, second + 1);
  let scroll = getNextIndexOfItem(combineLevel[level], undefined, 0);

  if (scroll == -1) {
    buy_with_gold(combineLevel[level], 5)
      .then(() => {
        compound(first, second, third, scroll);
      })
      .catch(() => {
        lastAttempt = Date.now();
      });
  } else {
    compound(first, second, third, scroll).catch(() => {
      lastAttempt = Date.now();
    });
  }
};

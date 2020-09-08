const playerWhitelist = [
  'Lorinth',
  'accusedmonk',
  'abusedmonk',
  'sluttymonk',
  'preachermonk'
]
const assistName = 'abusedmonk';
​
function on_party_invite(name) {
  set_message('joined ' + name);
  
  if(playerWhitelist.includes(name)){
      accept_party_invite(name);
  }
}
​
const reInviteParty = (expectedMembers) => {
  const party = get_party();
  const currentMembers = Object.keys(party);

  if (currentMembers.length >= expectedMembers.length)
    return;

  expectedMembers.map(p => {
    const player = get_player(p);

    if(player && !currentMembers.includes(p)){
      send_party_invite(p);
    }
  });
}

const getTankTarget = () => {
  var player = get_player(assistName);
  
  if(player === null){
    return;    
  }
  
  var target = get_monster(player.target);
  
  if(!target) return;
  
  if(target.target === assistName){
      return target;    
  }
}
​
const maxDistanceFromTank = 100;
​
const followTank = () => {
  const tank = get_player('abusedmonk');
  
  const xDelta = tank.x - character.x;
  const yDelta = tank.y - character.y;
  const distance = Math.sqrt((xDelta * xDelta) + (yDelta * yDelta));
  
  if (distance > maxDistanceFromTank){
      move(character.x + xDelta / 2, character.y + yDelta / 2);
  }
}
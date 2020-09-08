const playerWhitelist = [
  'Lorinth',
  'accusedmonk',
  'abusedmonk',
  'sluttymonk'
]
var assistName = 'abusedmonk';
​
function on_party_invite(name) {
  set_message('joined ' + name);
  
  if(playerWhitelist.contains(name)){
      accept_party_invite(name);
  }
}
​
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
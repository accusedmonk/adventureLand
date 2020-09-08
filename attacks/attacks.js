const autoAttack = (target) => {
  if(!attack_mode || character.rip || is_moving(character))
      return;
​
  if(!target && role !== 'Tank'){
      target = getTankTarget();
  }
  
  if(!target){
      return;
  }
  
  change_target(target);
  
  if(!is_in_range(target)){
      move(
          character.x + (target.x - character.x) / 2,
          character.y + (target.y - character.y) / 2
      );
  }
  else if(can_attack(target)){
      set_message('Attacking');
      attack(target);
  }
}
​
const getAggroFromParty = () => {
  if (!is_on_cooldown('taunt')){
      const partyMembers = Object.keys(get_party());
​
      for (entId in parent.entities) {
          const ent = get_entity(entId);
​
          if (ent.type === 'monster') {
​
              partyMembers.map(x => {
                  const memberName = x !== character.name ? x : null;
​
                  if (memberName && ent.target === memberName) {
                      use_skill('taunt', ent);
                  }
              });
          }
      };
  };
}
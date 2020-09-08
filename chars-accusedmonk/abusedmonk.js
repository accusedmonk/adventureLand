var attack_mode=true;
load_code('Heals');
load_code('Parties');
load_code('Attacks');
const role = 'Tank';
​
const getTarget = () => {
    const args = {
        type: 'goo' 
    }
    return get_nearest_monster(args);
}
​
const loop = () => {
    loot();
    regenerate();
    selfHealPotions();
    getAggroFromParty();
    
    const target = get_entity(character.target) ?? getTarget();
    
    autoAttack(target);
}
​
setInterval(loop, 100);
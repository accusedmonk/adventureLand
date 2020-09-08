var attack_mode=true;
load_code('Heals');
load_code('Parties');
load_code('Attacks');
const role = 'Ranged DPS';
​
const loop = () => {
    loot();
    regenerate();
    selfHealPotions();
    followTank();
    autoAttack();
}
​
setInterval(loop, 250);
var attack_mode=true;
load_code('Heals');
load_code('Parties');
load_code('Attacks');
const role = 'Healer';
​
const loop = () => {
    loot();
    regenerate();
    healParty();
    selfHealPotions();
    followTank();
    autoAttack();
}
​
setInterval(loop, 100);
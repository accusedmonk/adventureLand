const regenerate = () => {
  const healthPercent = character.hp / character.max_hp;
  const manaPercent = character.mp / character.max_mp;

  if (
    !is_on_cooldown('regen_mp') &&
    manaPercent < healthPercent &&
    manaPercent < 1
  ) {
    use_skill('regen_mp');
  }
  if (!is_on_cooldown('regen_hp') && healthPercent < 1) {
    use_skill('regen_hp');
  }
};

const selfHealPotions = () => {
  const healthThreshold = 50;
  const manaThreshold = 50;

  if (
    !is_on_cooldown('use_hp') &&
    character.hp / character.max_hp < healthThreshold / 100
  ) {
    use_skill('use_hp');
  }
  if (
    !is_on_cooldown('use_mp') &&
    character.mp / character.max_mp < manaThreshold / 100
  ) {
    use_skill('use_mp');
  }
};

const healParty = () => {
  const partyMembers = Object.keys(get_party());

  partyMembers.map((memberName) => {
    const player = get_player(memberName);

    if (!is_on_cooldown('heal') && player.hp < player.max_hp * 0.9) {
      set_message(`Healing ${memberName.slice(0, 3)}`);
      heal(player);
    }
  });
};

const types = [];
pokedex.forEach(pokemon => {
  pokemon.type.forEach(type => {
    if (!types.includes(type)) {
      types.push(type);
    }
  });
});

types.sort();

const typesNav = document.getElementById('types-nav');
types.forEach(type => {
  const typeLink = document.createElement('a');
  typeLink.classList.add('nav-link');
  typeLink.textContent = type;
  typeLink.href = `#${type.toLowerCase()}-section`;
  typesNav.appendChild(typeLink);
});

pokedex.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
});

const pokedexDiv = document.getElementById('pokedex');
types.forEach(type => {
  const typeSection = document.createElement('section');
  typeSection.classList.add('type-section');
  typeSection.id = `${type.toLowerCase()}-section`;
  const typeHeader = document.createElement('h2');
  typeHeader.textContent = `${type} (${pokedex.filter(pokemon => pokemon.type.includes(type)).length} total)`;
  typeSection.appendChild(typeHeader);

  const typePokemon = [];
  pokedex.forEach(pokemon => {
    if (pokemon.type.includes(type)) {
      typePokemon.push(pokemon);
    }
  });
  typePokemon.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });

  const totalHp = typePokemon.reduce((acc, pokemon) => acc + pokemon.base.HP, 0);
  const totalAttack = typePokemon.reduce((acc, pokemon) => acc + pokemon.base.Attack, 0);

  const typeStats = document.createElement('div');
  typeStats.classList.add('type-stats');
  typeStats.textContent = `Total HP: ${totalHp}, Total Attack: ${totalAttack}`;
  typeSection.appendChild(typeStats);

  const typePokemonWrapper = document.createElement('div');
  typePokemonWrapper.classList.add('type-pokemon-wrapper');

  typePokemon.forEach(pokemon => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');

    const spriteLink = document.createElement('a');
    spriteLink.href = pokemon.url;
    spriteLink.target = '_blank';

    const spriteImg = document.createElement('img');
    spriteImg.src = pokemon.sprite;
    spriteImg.alt = pokemon.name;

    spriteLink.appendChild(spriteImg);
    pokemonDiv.appendChild(spriteLink);

    const nameHeader = document.createElement('h3');
    nameHeader.textContent = pokemon.name;
    pokemonDiv.appendChild(nameHeader);

    const baseStatsList = document.createElement('ul');
    Object.keys(pokemon.base).forEach(stat => {
      const statItem = document.createElement('li');
      statItem.textContent = `${stat}: ${pokemon.base[stat]}`;
      baseStatsList.appendChild(statItem);
    });

    pokemonDiv.appendChild(baseStatsList);
    typePokemonWrapper.appendChild(pokemonDiv);
  });

  typeSection.appendChild(typePokemonWrapper);
  pokedexDiv.appendChild(typeSection);
});

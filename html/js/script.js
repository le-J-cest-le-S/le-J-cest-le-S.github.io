const tBody = $('tbody');

const allPokemons = Object.values(Pokemon.all_pokemons);

allPokemons.forEach(pokemon => {
    pokemon.id = pokemon.id.toString().padStart(3, '0');
});

allPokemons.forEach(pokemon => {
    const tr = $('<tr></tr>');
    tr.append(`<td>${pokemon.id}</td>`);
    tr.append(`<td>${pokemon.name}</td>`);
    tr.append(`<td>${pokemon.generation}</td>`);
    tr.append(`<td>${pokemon.types.map(t => t.name).join(', ')}</td>`);
    tr.append(`<td>${pokemon.stamina}</td>`);
    tr.append(`<td>${pokemon.baseAttack}</td>`);
    tr.append(`<td>${pokemon.baseDefense}</td>`);
    tr.append(`<td><img src="/html/webp/images/${pokemon.id}.webp" alt="${pokemon.name}" width="100"></td>`);
    tBody.append(tr);
});


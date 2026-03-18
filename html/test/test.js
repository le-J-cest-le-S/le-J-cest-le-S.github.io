console.table(Attack.all_attacks);
console.table(Type.all_types);

function getPokemonsByType(typeName){
    Object.values(Pokemon.all_pokemons).forEach(pokemon => {
        if(pokemon.types && pokemon.types.includes(typeName)){
            console.log(pokemon.toString());
        }
    });
}

function getPokemonsByAttack(attackName){
    Object.values(Pokemon.all_pokemons).forEach(pokemon => {
        if(pokemon.fastMoves && pokemon.fastMoves.includes(attackName) || pokemon.chargedMoves && pokemon.chargedMoves.includes(attackName)){
            console.log(pokemon.toString());
        }
    });
}

function getAttackByType(typeName){
    Object.values(Attack.all_attacks).forEach(pokemon => {
        if(pokemon.type == typeName){
            console.log(pokemon.toString());
        }
    });
}

function sortPokemonByTypeThenName() {
    Object.values(Pokemon.all_pokemons).sort((a, b) => {
        // Tri sur le type principal
        const type0Cmp = a.types[0].name.localeCompare(b.types[0].name);
        if (type0Cmp !== 0) return type0Cmp;

        // Tri sur le type secondaire s'il existe
        const aType1 = a.types[1] ?? '';
        const bType1 = b.types[1] ?? '';
        const type1Cmp = aType1.localeCompare(bType1);
        if (type1Cmp !== 0) return type1Cmp;

        // Tri sur le nom
        return a.name.localeCompare(b.name);
    }).forEach(pokemon => {
        console.log(`- ${pokemon}`);
    })
}
sortPokemonByTypeThenName();

// function getWeakestEnemies(attackName){
//     let attackType = attackName.type;
//     Object.values(Type.all_types).forEach(type => {
//         if 
// }

function getBestFastAttacksForEnemy(print, pokemonName){
    
}

function fastFight(pokemonNameA, pokemonNameB){

}

// getPokemonsByType("Fire");
// getPokemonsByAttack("Flame Burst");
// getAttackByType("Fire");

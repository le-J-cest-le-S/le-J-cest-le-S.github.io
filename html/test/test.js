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

function sortPokemonByTypeThenName(){
    
}

function getWeakestEnemies(attackName){
    let attackType = attackName.type;
    Object.values(Type.all_types).forEach(type => {
        if 
}

function getBestFastAttacksForEnemy(print, pokemonName){
    
}

function fastFight(pokemonNameA, pokemonNameB){

}

// getPokemonsByType("Fire");
// getPokemonsByAttack("Flame Burst");
// getAttackByType("Fire");

function getPokemonsByType(typeName){
    Object.values(Pokemon.all_pokemons).forEach(element => {
        if(element.types && element.types.includes(typeName)){
            console.log(element.toString());
        }
    });
}

function getPokemonsByAttack(attackName){
    Object.values(Pokemon.all_pokemons).forEach(element => {
        if(element.fastMoves && element.fastMoves.includes(attackName) || element.chargedMoves && element.chargedMoves.includes(attackName)){
            console.log(element.toString());
        }
    });
}

function getAttackByType(typeName){
    Object.values(Attack.all_attacks).forEach(element => {
        if(element.type == typeName){
            console.log(element.toString());
        }
    });
}

function sortPokemonByTypeThenName(){
    
}

function getWeakestEnemies(attackName){
    
}

function getBestFastAttacksForEnemy(print, pokemonName){
    
}

function fastFight(pokemonNameA, pokemonNameB){

}

getPokemonsByType("Fire");
getPokemonsByAttack("Flame Burst");
getAttackByType("Fire");

function getPokemonsByType(typeName){
    Object.values(Pokemon.all_pokemons).forEach(element => {
        if(element.type == typeName){
            console.log(element);
        }
    });
}

function getPokemonsByAttack(attackName){
    Object.values(Pokemon.all_pokemons).forEach(element => {
        if(element.fast_attacks === attackName || element.charged_attacks === attackName){
            console.log(element);
        }
    });
}

function getAttackByType(typeName){
    Object.values(Attack.all_attacks).forEach(element => {
        if(element.type == typeName){
            console.log(element);
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
getPokemonsByAttack("Fire Blast");
getAttackByType("Fire");
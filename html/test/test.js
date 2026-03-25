function getPokemonsByType(typeName){
    Object.values(Pokemon.all_pokemons).forEach(pokemon => {
        if(pokemon.types){
            for (const type of pokemon.types) {
                if (type.name === typeName) {
                    console.log(pokemon.toString());
                }
            }
        }
    });
}

function getPokemonsByAttack(attackName){
    Object.values(Pokemon.all_pokemons).forEach(pokemon => {
        if (pokemon.fastMoves || pokemon.chargedMoves){
            for (const attack of [...pokemon.fastMoves, ...pokemon.chargedMoves]) {
                if (attack.name === attackName) {
                    console.log(pokemon.toString());
                }        
            }
        }
    });
}

function getAttackByType(typeName){
    Object.values(Attack.all_attacks).forEach(attack => {
        if(attack.type == typeName){
            console.log(attack.toString());
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

function getWeakestEnemies(attackName){
    Object.values(Attack.all_attacks).forEach(attack => {
        if(attack.name === attackName){
            Object.values(Type.all_types).forEach(type => {
                if (type.name === attack.type){
                    console.log(type.toString().split(" = ")[1].split(" , ")[0]);
                }
            });
        }
    });
    
}

// function getBestFastAttacksForEnemy(print, pokemonName){
    
// }

// function fastFight(pokemonNameA, pokemonNameB){

// }

getPokemonsByType("Fire");
getPokemonsByAttack("Flamethrower");
getAttackByType("Fire");
getWeakestEnemies("Flamethrower");
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
    const sorted = Object.values(Pokemon.all_pokemons).sort((a, b) => {
        const typeA1 = a.types[0].name ?? '';
        const typeA2 = a.types[1]?.name ?? '';

        const typeB1 = b.types[0].name ?? '';
        const typeB2 = b.types[1]?.name ?? '';

        // Tri sur le type principal
        const type1Cmp = typeA1.localeCompare(typeB1);
        if (type1Cmp !== 0) return type1Cmp;

        // Tri sur le type secondaire s'il existe
        const type2Cmp = typeA2.localeCompare(typeB2);
        if (type2Cmp !== 0) return type2Cmp;

        // Tri sur le nom
        return a.name.localeCompare(b.name);
    })

    console.log(`Liste des ${Object.values(Pokemon.all_pokemons).length} Pokémons triés par type et nom :`);

    sorted.forEach(pokemon => {
        console.log(`- ${pokemon.toString()}`);
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

const pok = Pokemon.all_pokemons[6];
pok.getBestFastAttacksForEnemy(true, 'Charmander');

function fastFight(pokemonNameA, pokemonNameB){
    
}

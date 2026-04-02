function getPokemonsByType(typeName){
    console.log("Liste des " + Object.values(Pokemon.all_pokemons).filter(p => p.types.some(t => t.name === typeName)).length + " Pokemons de type " + typeName + " :");
    Object.values(Pokemon.all_pokemons).forEach(pokemon => {
        if(pokemon.types){
            for (const type of pokemon.types) {
                if (type.name === typeName) {
                    console.log("- " + pokemon.toString());
                }
            }
        }
    });
}

function getPokemonsByAttack(attackName){
    console.log("Liste des " + Object.values(Pokemon.all_pokemons).filter(p => [...p.fastMoves, ...p.chargedMoves].some(a => a.name === attackName)).length + " Pokemons ayant l'attaque " + attackName + " :");
    Object.values(Pokemon.all_pokemons).forEach(pokemon => {
        if (pokemon.fastMoves || pokemon.chargedMoves){
            for (const attack of [...pokemon.fastMoves, ...pokemon.chargedMoves]) {
                if (attack.name === attackName) {
                    console.log("- " + pokemon.toString());
                }        
            }
        }
    });
}

function getAttackByType(typeName){
    console.log("Liste des " + Object.values(Attack.all_attacks).filter(a => a.type === typeName).length + " attaques de type " + typeName + " :");
    Object.values(Attack.all_attacks).forEach(attack => {
        if(attack.type == typeName){
            console.log("- " + attack.toString());
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

function getBestFastAttacksForEnemy(print, pokemonName){
    const pokemon = Object.values(Pokemon.all_pokemons).find(pokemon => pokemon.name === pokemonName);
    if (!pokemon) throw new Error(`${pokemonName} doesn't exists`);

    const type1 = pokemon.types[0].name;
    const type2 = pokemon.types[1]?.name;

    const attacks = [];

    for (const attack of Object.values(Attack.all_attacks).filter(attack => attack.fast)) {
        if (type_effectiveness[attack.type][type1] === 1.6) {
            attacks.push(attack);
        }

        if (type2) {
            if (type_effectiveness[attack.type][type2] === 1.6) {
                attacks.push(attack);
            }
        }
    }

    if (print) {
        console.log(`Liste des ${attacks.length} attaques efficaces sur ${pokemonName} :`);

        for (const attack of attacks) {
            console.log(`- ${attack.toString()}`);
        }
    }
}
<<<<<<< HEAD
=======

const pok = Pokemon.all_pokemons[6];
pok.getBestFastAttacksForEnemy(true, 'Charmander');

function fastFight(pokemonNameA, pokemonNameB){
    const pokA = Object.values(Pokemon.all_pokemons).find(pokemon => pokemon.name == pokemonNameA);
    const pokB = Object.values(Pokemon.all_pokemons).find(pokemon => pokemon.name == pokemonNameB);
    
    const atkA = pokA.getBestFastAttacksForEnemy(false, pokemonNameB);
    const atkB = pokB.getBestFastAttacksForEnemy(false, pokemonNameA);
    
    let aLife = pokA.stamina;
    let bLife = pokB.stamina;
    
    let first = atkA.duration >= atkB.duration ? pokA : pokB;
    let last = first == pokA ? pokB : pokA;
    
    function transpos() {
        first = first == pokA ? pokB : pokA;
        last = first == pokA ? pokB : pokA;
    }
    
    transpos();

    let fight = [];
    
    do {
        console.log(fight.length);

        const damages = first == pokA ? Math.round(atkA.damages): Math.round(atkB.damages);
        last == pokA ? aLife -= damages : bLife -= damages;

        const tour = {
            'Tour': fight.length + 1,
            'Attaquant': first.name,
            'ATK': first.baseAttack,
            'Défenseur': last.name,
            'DEF': first.baseDefense,
            'Nom Attaque': first == pokA ? atkA.attack.name : atkB.attack.name,
            'Éfficacité': first == pokA ? atkA.effectiveness : atkB.effectiveness,
            'Dégâts': damages,
            'Reste': last == pokA ? aLife : bLife
        }

        fight.push(tour);

        transpos();
    } while (aLife > 0 && bLife > 0);
    
    console.table(fight);
}

fastFight('Charmander', 'Bulbasaur');
>>>>>>> b1ccce409b6564f9ee2dd5b2ad261ef3464bcfdc

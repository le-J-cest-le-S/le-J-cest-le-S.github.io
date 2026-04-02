class Pokemon {
    static all_pokemons = {};
    
    id;
    name;
    stamina;
    baseAttack;
    baseDefense;
    types = [];
    fastMoves = [];
    chargedMoves = [];
    
    constructor(id, name, stamina, baseAttack, baseDefense, types, fastMoves, chargedMoves) {
        this.id = id;
        this.name = name;
        this.stamina = stamina;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        this.types = types;
        this.fastMoves = fastMoves;
        this.chargedMoves = chargedMoves;
    }
    
    static fill_pokemons(pokemons) {
        for (const pokemon of pokemons) {
            if (
                pokemon.pokemon_id === undefined ||
                pokemon.pokemon_name === undefined ||
                pokemon.base_stamina === undefined ||
                pokemon.base_attack === undefined ||
                pokemon.base_defense === undefined
            ) throw new Error(`Couldn't resolve Pokémon : [${pokemon.pokemon_id}] ${pokemon.pokemon_name}`);
            
            const types = pokemon_types.find(typ => typ.pokemon_id == pokemon.pokemon_id).type.map(typeName => Type.all_types[typeName]);
            
            const moves = pokemon_moves.find(move => move.pokemon_id == pokemon.pokemon_id);
            
            const fastMoves = moves.fast_moves.map(moveName => Object.values(Attack.all_attacks).find(atk => atk.name === moveName));
            
            const chargedMoves = moves.charged_moves.map(moveName => Object.values(Attack.all_attacks).find(atk => atk.name === moveName));
            
            if (pokemon.form === 'Normal') {
                Pokemon.all_pokemons[pokemon.pokemon_id] = new Pokemon(
                    pokemon.pokemon_id,
                    pokemon.pokemon_name,
                    pokemon.base_stamina,
                    pokemon.base_attack,
                    pokemon.base_defense,
                    types,
                    fastMoves,
                    chargedMoves
                );
            }
        }
    }
    
    getTypes() {
        return this.types;
    }
    
    getAttacks() {
        return [...this.fastMoves, ...this.chargedMoves];
    }

    static getById(id) {
        return Object.values(Pokemon.all_pokemons).find(pokemon => pokemon.id == id);
    }
    
    getBestFastAttacksForEnemy(print, pokemonName){
        const pokemon = Object.values(Pokemon.all_pokemons).find(pokemon => pokemon.name === pokemonName);
        if (!pokemon) throw new Error(`${pokemonName} doesn't exists`);
        
        const type1 = pokemon.types[0].name;
        const type2 = pokemon.types[1]?.name;
        
        // Dégats = Puissance x Efficacité x (Base Attack A / Base Defense B)
        
        const attacks = {};
        
        const insert = (attack) => {
            attacks[attack.id] = {
                attack: attack,
                damages:
                    attack.power *
                    (type2 ?
                        Math.max(type_effectiveness[attack.type][type1], type_effectiveness[attack.type][type2]) :
                        type_effectiveness[attack.type][type1]) *
                    (this.baseAttack / pokemon.baseDefense),
                effectiveness: type2 ? Math.max(type_effectiveness[attack.type][type1], type_effectiveness[attack.type][type2]) : type_effectiveness[attack.type][type1]
            }
        }
        
        for (const attack of this.fastMoves) {
            insert(attack);
            if (type2) insert(attack);
        }
        
        if (print) {
            console.log(`Liste des ${Object.values(attacks).length} attaques efficaces sur ${pokemonName} :`);
            
            Object.values(attacks).sort((a, b) => b.damages - a.damages).forEach(attack => {
                console.log(`- ${attack.attack.toString()} | Dégâts : ${attack.damages}`);
            })
        }

        return Object.values(attacks)[0];
    }
    
    toString() {
        return `${this.name} : #${this.id}, [${this.types.join(', ')}], [STA: ${this.stamina}, ATK: ${this.baseAttack}, DEF: ${this.baseDefense}], Rapides = [${this.fastMoves.map(atk => atk.name).join(', ')}], Chargées = [${this.chargedMoves.map(atk => atk.name).join(', ')}]`;
    }

    static getWeakestEnemies(attackName){
        console.log(`Liste des pokémons faibles contre l'attaque ${attackName} :`);
        // Trouver l'attaque
        Object.values(Attack.all_attacks).forEach(attack => {
            // Si l'attaque correspond à celle recherchée
            if(attack.name === attackName){
                // Trouver le type de l'attaque
                Object.values(Type.all_types).forEach(type => {
                    // Si le type correspond à celui de l'attaque
                    if (type.name === attack.type){
                        // Récupérer les types faibles contre ce type
                        let types = type.toString().split(" = ")[1].split(" , ")[0].replace("[", "").replace("]", "").split(", ");;
                        types.forEach(type => {
                            // Récupérer les pokémons de ces types
                            Object.values(Pokemon.all_pokemons).forEach(pokemon => {
                                if(pokemon.types){
                                    // Si le pokémon a plusieurs types, vérifier que tous les types sont faibles contre l'attaque
                                    if (pokemon.types.length > 1) {
                                        const pokemonTypeNames = pokemon.types.map(pokemonType => pokemonType.name);
                                        if (pokemonTypeNames.every(pokemonTypeName => types.includes(pokemonTypeName))) {
                                            console.log(pokemon.toString());
                                        }
                                    } else {
                                        // Si le pokémon n'a qu'un type, vérifier que ce type est faible contre l'attaque
                                        for (const pokemonType of pokemon.types) {
                                            if (pokemonType.name === type) {
                                                console.log(pokemon.toString());
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
            }
        });
    }
}


try {
    Pokemon.fill_pokemons(pokemons, Type.all_types, Attack.all_attack);
} catch (error) {
    console.error(error);
}


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
                typeof pokemon.pokemon_id === undefined ||
                typeof pokemon.pokemon_name === undefined ||
                typeof pokemon.base_stamina === undefined ||
                typeof pokemon.base_attack === undefined ||
                typeof pokemon.base_defense === undefined
            ) throw new Error(`Couldn't resolve Pokémon : [${pokemon.pokemon_id}] ${pokemon.pokemon_name}`);

            const types = pokemon_types.find(typ => typ.pokemon_id == pokemon.pokemon_id).type;

            const fastMoves = pokemon_moves.find(move => move.pokemon_id == pokemon.pokemon_id).fast_moves;
            const chargedMoves = pokemon_moves.find(move => move.pokemon_id == pokemon.pokemon_id).charged_moves;

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

    get types() {
        return this.types;
    }

    get attacks() {
        return this.fastMoves + this.chargedMoves;
    }

    toString() {
        return `${this.name} : #${this.id}, [${this.types.join(', ')}], [STA: ${this.stamina}, ATK: ${this.baseAttack}, DEF: ${this.baseDefense}], Rapides = [${this.fastMoves.map(atk => atk.name).join(', ')}], Chargées = [${this.chargedMoves.map(atk => atk.name).join(', ')}]`;
    }
}

try {
    Pokemon.fill_pokemons(pokemons, Type.all_types, Attack.all_attack);
} catch (error) {
    console.error(error);
}
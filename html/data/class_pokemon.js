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

    constructor(id, name, stamina, baseAttack, baseDefense, types = [], fastMoves = [], chargedMoves = []) {
        this.id = id;
        this.name = name;
        this.stamina = stamina;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        this.types = types;
        this.fastMoves = fastMoves;
        this.chargedMoves = chargedMoves;
    }

    static fill_pokemons(pokemons, types, moves) {
        for (const pokemon of pokemons) {
            if (
                typeof pokemon.pokemon_id === undefined ||
                typeof pokemon.pokemon_name === undefined ||
                typeof pokemon.base_stamina === undefined ||
                typeof pokemon.base_attack === undefined ||
                typeof pokemon.base_defense === undefined
            ) throw new Error(`Couldn't resolve Pokémon : [${pokemon.pokemon_id}] ${pokemon.pokemon_name}`);

            console.log(types);

            types = types.find(typ => typ.pokemon_id == pokemon.pokemon_id);

            moves = moves.find(typ => typ.pokemon_id == pokemon.pokemon_id);

            if (pokemon.from !== 'Normal') return;

            Pokemon.all_pokemons[pokemon.pokemon_id] = new Pokemon(
                pokemon.pokemon_id,
                pokemon.pokemon_name,
                pokemon.base_stamina,
                pokemon.base_attack,
                pokemon.base_defense
            );
        }
    }

    get types() {
        return this.types;
    }

    get attacks() {
        return this.fastMoves + this.chargedMoves;
    }

    toSgring() {
        return `${this.name} : #${this.id}, [${this.types.join(', ')}], [STA: ${this.stamina}, ATK: ${this.baseAttack}, DEF: ${this.baseDefense}], Rapides = [${this.fastMoves.map(atk => atk.name).join(', ')}], Chargées = [${this.chargedMoves.map(atk => atk.name).join(', ')}]`;
    }
}
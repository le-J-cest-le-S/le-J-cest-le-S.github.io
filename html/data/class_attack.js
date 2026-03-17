class Attack {
    static all_attacks = {}

    id;
    name;
    type;
    power;
    duration;

    constructor(id, name, type, power, duration) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.power = power;
        this.duration = duration;
    }

    static fill_attacks(source) {
        for (const attack of source) {
            if (
                typeof attack.move_id === undefined ||
                typeof attack.name === undefined ||
                typeof attack.type === undefined ||
                typeof attack.power === undefined ||
                typeof attack.duration === undefined
            ) throw new Error(`Couldn't resolve attack : [${attack.move_id}] ${attack.name}`);

            Attack.all_attacks[attack.move_id] = new Attack(
                attack.move_id,
                attack.name,
                attack.type,
                attack.power,
                attack.duration
            );
        }
    }

    toString() {
        return `${this.name} : #${this.id}, ${this.type}, ${this.power}, ${this.duration}ms`;
    }
}
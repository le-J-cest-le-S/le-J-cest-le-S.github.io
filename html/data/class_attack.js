class Attack {
    static all_attacks = {};

    id;
    name;
    type;
    power;
    duration;
    fast;

    constructor(id, name, type, power, duration, fast) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.power = power;
        this.duration = duration;
        this.fast = fast;
    }

    static fill_attacks(attacks, fast) {
        for (const attack of attacks) {
            if (
                attack.move_id === undefined ||
                attack.name === undefined ||
                attack.type === undefined ||
                attack.power === undefined ||
                attack.duration === undefined
            ) throw new Error(`Couldn't resolve attack : [${attack.move_id}] ${attack.name}`);

            Attack.all_attacks[attack.move_id] = new Attack(
                attack.move_id,
                attack.name,
                attack.type,
                attack.power,
                attack.duration,
                fast
            );
        }
    }

    toString() {
        return `${this.name} : #${this.id}, ${this.type}, ${this.power}, ${this.duration}ms`;
    }
}

try {
    Attack.fill_attacks(charged_moves, false);
    Attack.fill_attacks(fast_moves, true);
} catch (error) {
    console.error(error);
}
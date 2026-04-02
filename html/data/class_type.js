class Type {
    static colors = Object.freeze({
        Normal: 'rgb(168, 167, 122)',
        Fire: 'rgb(238, 129, 48)',
        Water: 'rgb(99, 144, 240)',
        Electric: 'rgb(247, 208, 44)',
        Grass: 'rgb(122, 199, 76)',
        Ice: 'rgb(150, 217, 214)',
        Fighting: 'rgb(194, 46, 40)',
        Poison: 'rgb(163, 62, 161)',
        Ground: 'rgb(226, 191, 101)',
        Flying: 'rgb(169, 143, 243)',
        Psychic: 'rgb(249, 85, 135)',
        Bug: 'rgb(166, 185, 26)',
        Rock: 'rgb(182, 161, 54)',
        Ghost: 'rgb(115, 87, 151)',
        Dragon: 'rgb(111, 53, 252)',
        Dark: 'rgb(112, 87, 70)',
        Steel: 'rgb(183, 183, 206)',
        Fairy: 'rgb(214, 133, 173)'
    });

    static all_types = {};
    constructor(name){
        this.name = name;
        this.color = Type.colors[name];
    }
    toString() {
        const tabOfType = type_effectiveness[this.name];

        // Grouper les types par leur valeur d'efficacité
        const grouped = Object.entries(tabOfType).reduce((acc, [type, value]) => {
            if (!acc[value]) acc[value] = [];
            acc[value].push(type);
            return acc;
        }, {});

        // Trier les valeurs de manière décroissante et construire la chaîne
        return this.name + ": " + Object.keys(grouped)
            .map(Number)
            .sort((a, b) => b - a)
            .map(value => `${value} = [${grouped[value].join(", ")}]`)
            .join(" , ");
        }
    static fill_types(){
        Object.keys(type_effectiveness).forEach(element => {
            Type.all_types[element] = new Type(element);
        });
    }
}

try {
    Type.fill_types();
} catch (error) {
    console.error(error);
}
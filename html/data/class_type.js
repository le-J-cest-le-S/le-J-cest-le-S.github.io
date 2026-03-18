class Type {
    static all_types = {};
    constructor(name){
        this.name = name;
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
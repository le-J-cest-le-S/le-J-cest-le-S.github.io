class Type {
    static all_types = {};
    constructor(name){
        this.name = name;
    }
    toString(){
        let tabWeekness = [];
        let tabVeryWeekness = [];
        let tabStrongness = [];
        let tabNormalness = [];

        let tabOfType = type_effectiveness[this.name];
        Object.keys(tabOfType).forEach(element => {
           if (type_effectiveness[this.name][element] == 1){ 
                tabNormalness.push(element);
           }
            else if (type_effectiveness[this.name][element] > 1){
                tabStrongness.push(element);
            }
            else if (type_effectiveness[this.name][element] > 0.5){
                tabWeekness.push(element);
            } else {
                tabVeryWeekness.push(element);
            }
        });
        return this.name + ": 1.6 = [" + tabStrongness + "] , 1.0 = [" + tabNormalness + "] , 0.625 = [" + tabWeekness + "]" + ", 0.390625 = [" + tabVeryWeekness + "]";
    }
    static fill_types(){
        Object.keys(type_effectiveness).forEach(element => {
            Type.all_types[element] = new Type(element);
        });
    }
}


let test = new Type("Bug");

Type.fill_types();

console.log(Type.all_types);

Type.all_types.forEach(element => {
    console.log(element.toString());
});
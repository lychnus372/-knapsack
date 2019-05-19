//  缶コーヒー      120 10
//  ペットボトル    130 12
//  バナナ          80  7
//  りんご          100 9
//  おにぎり        250 21
//  パン            185 16


const cost = dna =>{
    let sum = 0;
    if(dna&1){
        sum += 120;
    }

    if(dna&2){
        sum += 130;
    }

    if(dna&4){
        sum += 80;
    }

    if(dna&8){
        sum += 100;
    }

    if(dna&16){
        sum += 250;
    }

    if(dna&32){
        sum += 185;
    }

    return sum;
};

const size = dna =>{
    let sum = 0;
    if(dna&1){
        sum += 10;
    }

    if(dna&2){
        sum += 12;
    }

    if(dna&4){
        sum += 7;
    }

    if(dna&8){
        sum += 9;
    }

    if(dna&16){
        sum += 21;
    }

    if(dna&32){
        sum += 16;
    }

    return sum;
};

const mate = (dna1, dna2) =>{

    if(dna1>63 || dna2>63){
        throw "okasii";
    }

    if(Math.random()<0.5){
        const dna = dna1;
        dna1 = dna2;
        dna2 = dna;
    }
    
    for(let i=0;i<3;i++){
        const bit1 = 1<<Math.floor(Math.random()*6);

        if(dna1&bit1){
            dna2 = dna2|bit1;
        }else{
            if(dna2&bit1){
                dna2 = dna2^bit1;
            }
        }
    }

    
    return dna2;
};

const mutate = dna =>{
    if(dna>63){
        throw "mazui";
    }

    const bit = 1<<Math.floor(Math.random()*6);

    dna = dna^bit;

    return dna;
};

const parent = [0b000000, 0b000000];
const dnas = new Array(10);
const main = ()=>{
    
    dnas[0] = parent[0];
    dnas[1] = parent[1];

    for(let i=2;i<dnas.length;i++){
        dnas[i] = mate(parent[0], parent[1]);

        if(Math.random()<0.3){
            dnas[i] = mutate(dnas[i]);
        }

        if(size(dnas[i])>65){
            dnas[i] = 0;
        }
    }

    for(let i=0;i<dnas.length-1;i++){
        for(let j=i+1;j<dnas.length;j++){
            if(dnas[i]===dnas[j]){
                dnas[j] = 0;
            }

            if(size(dnas[i])<size(dnas[j])){
                const dna = dnas[i];
                dnas[i] = dnas[j];
                dnas[j] = dna;
            }
        }
    }

    parent[0] = dnas[0];
    parent[1] = dnas[1];

    console.log(`parent0: ${parent[0].toString(2)} cost: ${cost(parent[0])} size: ${size(parent[0])}`);
    console.log(`parent1: ${parent[1].toString(2)} cost: ${cost(parent[1])} size: ${size(parent[1])}`);

};
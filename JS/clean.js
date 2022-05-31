export const clean = (arrayToClean) => {//retire les eventuelles erreurs du array
    for (let i =  0 ; i < arrayToClean.length ; i++ ){
        if (arrayToClean[i] === ""){
            arrayToClean.splice(i,1)
            i -= 1
        } 
    }
}
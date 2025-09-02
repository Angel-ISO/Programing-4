
function invertir(numero, invertido) {
    if (numero === 0) {
        return invertido;
    }
    return invertir(
        Math.floor(numero / 10), 
        invertido * 10 + (numero % 10) 
    );
}


console.log(invertir(345, 0));

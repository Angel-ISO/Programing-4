const arreglo = [1, 5, 7, 8, 9, 0, 0, 6];


function contains(arr, val, index) {
    if (index < 0) {
        return false;
    }
    
    if (arr[index] === val) {
        return true;
    }
    
    return contains(arr, val, index - 1);
}


function removeDuplicates(arreglo) {
    if (arreglo.length === 0) {
        return [];
    }
    
    if (arreglo.length === 1) {
        return [arreglo[0]];
    }
    
    const firstElement = arreglo[0];
    const restArray = arreglo.slice(1);
    
    const processedRest = removeDuplicates(restArray);
    
    if (contains(processedRest, firstElement, processedRest.length - 1)) {
        return processedRest;
    } else {
        return [firstElement].concat(processedRest);
    }
}


function bubblePass(arr, n, index = 0) {
    if (index >= n - 1) {
        return arr;
    }
    
    if (arr[index] > arr[index + 1]) {
        const temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
    }
    
    return bubblePass(arr, n, index + 1);
}


function recursiveBubbleSort(arr, n) {
    if (n <= 1) {
        return arr;
    }
    
    const arrCopy = arr.slice();
    
    bubblePass(arrCopy, n);
    
  
    return recursiveBubbleSort(arrCopy, n - 1);
}

console.log("Array original:", arreglo);

const withoutDuplicates = removeDuplicates(arreglo);
console.log("Array sin duplicados:", withoutDuplicates);

const sorted = recursiveBubbleSort(withoutDuplicates, withoutDuplicates.length);
console.log("Array ordenado:", sorted);

module.exports = {
    removeDuplicates,
    recursiveBubbleSort,
    contains,
    bubblePass
};
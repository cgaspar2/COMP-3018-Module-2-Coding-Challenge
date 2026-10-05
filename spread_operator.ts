const fruits = ['apple', 'banana'];

// Creates a shallow copy: ['apple', 'banana', 'orange']
const moreFruits = [...fruits, 'orange']; 

console.log(moreFruits);

// ------------------------------------------------------

const user = { name: 'Alex' };

// Combines properties: { name: 'Alex', age: 25 }
const detailedUser = { ...user, age: 25 }; 

console.log(detailedUser);
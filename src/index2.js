const IA = require('../model/ai1.js');
const IAdeBase = require('./ai.js');

const IaPlayer = new IA();

board = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
]

console.log("Test 1");
console.log(IaPlayer.play(board));

console.log("Test 1 de base :");
console.log(IAdeBase.computeMove(board));
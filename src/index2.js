const IA = require('../model/ai1.js');
const IA2 = require('../model/ai1V2.js');
const IA3 = require('../model/ai2.js');
const IAdeBase = require('./ai.js');

const IaPlayer = new IA();
const IaPlayer2 = new IA2();
const IaPlayer3 = new IA3();

board = [
    [-1, -1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, -1, 0, 0, 0, 0],
    [1, -1, 1, 1, 0, 0],
    [-1, 1, 0, 0, 0, 0],
    [1, -1, -1, 0, 0, 0],
    [-1, 1, 1, 0, 0, 0]
]

var start = performance.now();
for (let i = 0; i < 1; i++)
    IaPlayer3.play(board);
var end = performance.now();
console.log(`Execution time: ${(end - start) / 1} ms`);

//console.log("Test 1");
var start = performance.now();
for (let i = 0; i < 1; i++)
    IaPlayer.play(board);
var end = performance.now();
console.log(`Execution time: ${(end - start) / 1} ms`);

//console.log("Test 1 de base :");
var start = performance.now();
for (let i = 0; i < 1; i++)
    IAdeBase.computeMove(board);
var end = performance.now();
console.log(`Execution time: ${(end - start) / 1} ms`);

//console.log("Test 2");
var start = performance.now();
for (let i = 0; i < 1; i++)
    IaPlayer2.play(board);
var end = performance.now();
console.log(`Execution time: ${(end - start) / 1} ms`);


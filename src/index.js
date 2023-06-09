const IA2 = require('../model/ai1V2.js');

const express = require('express')
const app = express()
const port=8000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log("Server is listening on port 8000");
});

app.get('/move', (req, res) => {
    const { b } = req.query;

    if (typeof b !== 'string' || b.length !== 42) {
        return res.status(400).send({ detail : "chaine de caractere doit etre de taille 42"});
    }

    let nbM = 0;
    let nbH = 0;
    let isGameFinish = true;
    for (let i = 0; i < b.length; i++) {
        switch (b[i]){
            case 'm' : nbM++; break;
            case 'h' : nbH++; break;
            case '0' : isGameFinish = false; break;
            default : return res.status(400).send({ detail : "le String ne doit contenir que des m, h ou 0"});
        }
    }
    if(isGameFinish) return res.status(422).send({detail :" la partie est fini dans ce cas de figure "});
    if(Math.abs(nbM-nbH) >=2 ) return res.status(400).send({ detail :" un des joueurs a plus de 2 coup d'avance, c'est impossible "});

    // verification etat de victoire deja aquis et hors d'un cas de pion flottant

    for (let i = 0; i < b.length; i += 6) {
        const sousB = b.slice(i,i+6);
        if (sousB.includes("hhhh") || sousB.includes("mmmm"))
            return res.status(422).send({ detail : "la partie compte deja un gagnant"});

        if (sousB.includes("0h") || sousB.includes("0m"))
            return res.status(400).send({detail : "les pions ne peuvent pas voler, verifier le format envoyer"});
    }

    let board = [[],[],[],[],[],[],[]];
    let indiceBase = 0;
    for(let i = 0; i < b.length; i+= 6){ // faire le formatage et renvoyer la matrice
        const chaineCoupe = b.slice(i,i+6);
        console.log("toute le chaine"+b)
        console.log(i);
        console.log(i+6);
        console.log(chaineCoupe);
        for(let j = 0; j<chaineCoupe.length; j++){
            switch (chaineCoupe[j]){
                case 'm' : board[indiceBase][j] = -1; break;
                case 'h' : board[indiceBase][j] = 1; break;
                case '0' : board[indiceBase][j] = 0; break;
            }
        }
        indiceBase++;
    }

    function toString(board) {
        let output = '';
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                output += board[i][j] + ' ';
            }
            output += '\n'; // ajouter un retour à la ligne après chaque ligne
        }
        return output;
    }

    const IaPlayer2 = new IA2();

    let rep = IaPlayer2.play(board);

    // Retourner la réponse
    res.send({"colonne": rep[0]});
});

/*
* Si la cause de l’impossibilité est liée à la configuration du plateau fournie, le status code de la réponse est 422 et le message précise la cause (ex: “board full”, “game over”,... )
* */

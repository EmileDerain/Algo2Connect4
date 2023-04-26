const http = require('http');
const express = require('express')
const app = express()
const port=8000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/emile/',(req,res)=>{
    res.send("emile ca marche")
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

    let bonneColonne =
    // Retourner la réponse
    res.send({colonne : " "});
});

/*
* Si la cause de l’impossibilité est liée à la configuration du plateau fournie, le status code de la réponse est 422 et le message précise la cause (ex: “board full”, “game over”,... )
* */

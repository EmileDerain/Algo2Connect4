## Installation

<div align="justify">
Pour faire fonctionner notre projet, il vous faudra tout d'abord build l'image docker fournit :
<ul>
<li> Pour cela, vous pouvez utiliser le build.sh/.bat en fonction de votre environnement ou alors taper la commande build 
    vous même.</li>
<li> De même, il vous faudra run l'image précédemment build, pour cela utilisez le run.sh/.bat en fonction de votre  
    environement. 
    Si vous avez utilisé les même commandes docker que celle appliquer dans le build et le run, rendez vous sur :
        http://localhost:8000/</li>
 </ul>
</div>

## L'API

<div align="justify">
Pour utiliser notre api rien de plus simple: Il vous faut mettre l'état de votre partie sous forme de chaîne de caractere avec comme règle, une case vide vaut 0, une case tenu par humain vaut h et une case tenu par une ia vaut m, c.a.d: Si la colonne 1 (celle tout à gauche) a tout en bas 1 pion humain et ensuite un pion ia, la chaîne de caractere associé est:hm0000 Il suffit de répéter l'opération sur chaque colonne et de concatener les chaine de carractere de la colonne tout à gauche jusqu'à la colonne tout à droite, voici un exemple: m00000h00000mm0000hmh000h00000h00000000000. Une fois cette chaîne obtenu, il n'y a plus qu'a l'envoyer à http://localhost:8000/move?b=m00000h00000mm0000hmh000h00000h00000000000. Celle-ci renverra le coup jouer par notre algorithme. 
</div>

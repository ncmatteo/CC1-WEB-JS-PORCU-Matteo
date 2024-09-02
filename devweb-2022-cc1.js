"use strict";

//On recupère tout les éléments dont on aura besoin, boutons et valeur des nombres
const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;//Génération du nombre secret
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
  nbGuesses=0;
  $output.textContent = `Partie lancée, trouvé le nombre secret en au plus ${maxGuesses} coups.`;
  $guessBtn.disabled = false;//rend bouton "valider" cliquable après le lancement du jeu
}

function guess_btn(){
  const nb = parseInt($numUsr.value);
  nbGuesses++;//le nombre de tentative qui va augmenter jusqu'a atteindre sa limite (si le joueur ne trouve pas)

  //Si le nombre secret est trouvé
  if (nb===secretNumber){
    $output.textContent = `Bravo vous avez trouvé en ${nbGuesses} coups.`;
    $guessBtn.disabled = true;//rend bouton "valider" non cliquable pour annoncer la fin de la partie
  }

  //Si le nombre est inférieur au nombre secret
  else if (nb < secretNumber){
    $output.textContent = `${nb} est trop bas `;

  }

  //Si le nombre est supérieur au nombre secret
  else if (nb > secretNumber){
    $output.textContent = `${nb} est trop haut`;
  }

  //Si le nombre max de tentative est attient
  if (nbGuesses == maxGuesses){
    $output.textContent = `Perdu... le nombre etait ${secretNumber}`;
    $guessBtn.disabled = true;
  }

}

$startBtn.addEventListener("click", launchGame);
$guessBtn.addEventListener("click", guess_btn);
$numUsr.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {//Dès que le bouton "Entrer" est pressé on exécute le code guess_btn()
    guess_btn(); 
  }
})



function addCow(evt) {
  console.debug(evt.x, evt.y);
  const img = document.createElement('img');
  img.src="https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg"
  img.classList.add('cow');//ajoute la classe CSS cow à l'élément <img>

  img.style.transform = `rotate(${Math.random() * 360}deg)`; //Tourne l'image d'un degres aleatoire 

  img.style.left = `${evt.clientX}px`;//Utilisation des propriété left et top en CSS 
  img.style.top = `${evt.clientY}px`;//et recupération des corrdonées du click pour faire apparaître la vache

  document.body.appendChild(img);//ajoute l'image sur la page 
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);


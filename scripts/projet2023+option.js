/******************************************
           === variables globales === 
********************************************/
const EFFECTIF_MAX = 11; //effectif max pour une équipe
const POSTES = ["gardien","defenseur","milieu","attaquant"]; // noms des différents postes
const FORMATION_INITIALE="433"; // formation choisie par défaut au lancement

let joueurChoisi; // joueur choisi lors d'un click dans la zone joueurs
var playersData=playersDataWomen; // base de donnée des joueurs hommes/femmes

/**
 * initialisation
 */
const init = function(){
    capitaine(); 
    raz();
    remplirPostes(FORMATION_INITIALE);
    const ok = document.getElementById("ok");
    ok.addEventListener("click", changeFormation);
    ajoute_bouton();
    
    
}


/*****************************************************
           === Réinitialisation de la page=== 
******************************************************/

/**
 * Mise à l'état initial (feuille de match, effectifs et joueurs)
 * lors d'un changement de formation
 */
const raz = function(){
    razZoneJoueurs();
    abonneClickJoueurs();
    viderFeuilleDeMatch();
    effectifsA0();
    enleve_liste_raz(); // vide la liste des capitaines
}

/**
 * vide la feuille de match
 */
const viderFeuilleDeMatch = function(){
    //TODO
    feuille = document.getElementById("feuilleDeMatch");
    liste = feuille.childNodes[5] //[ #text, h1, #text, img#check, #text, ul, #text ] ul à l'indice 5
    fils = liste.childNodes
    nbr_fils = fils.length
    for (let i = 0; i < nbr_fils; i++){
        liste.removeChild(fils[0])
    }
}

/**
 * Réinitialise tous les effectifs du tableau HTML à 0
 */
const effectifsA0=function(){
    //TODO
    document.querySelector("td.gardien").textContent = 0
    document.querySelector("td.defenseur").textContent = 0
    document.querySelector("td.milieu").textContent = 0
    document.querySelector("td.attaquant").textContent = 0
}

/** 
 * Vide la <div> d'id "joueurs" puis la remplit à partir des données
 * présentes dans le script utilisé : "men.js" ou "women.js"
 */
const razZoneJoueurs = function(){
    //TODO décommenter le code suivant à la question Q6
    const joueurs = document.getElementById("joueurs");
    joueurs.innerHTML = "";
	for(let i = 0; i < playersData.length; i++) {
		joueurs.appendChild(creerJoueur(playersData[i]));
	}
    
}


/*****************************************************
           ===Changement de formation=== 
****************************div.appendChild(img)**************************/

/**
 *  change la formation présente sur le terrain
 *  puis remet la page dans on état initial.
 */
const changeFormation = function(){
    const input = document.getElementById('formation');
    if(verifFormation(input.value)){
        remplirPostes(input.value)
        raz();
    }
}

/**
 * Détermine si la formation de l'équipe est valide
 * 3 caractères correspondants à des nombres entiers 
 * de défenseurs, milieu et attaquants sont attendus :
 * - Les défenseurs sont 3 au moins, 5 au plus
 * - Les milieux : 3 au moins, 5 au plus
 * - Les attaquants : 1 au moins, 3 au plus
 * (Le gardien est toujours unique il n'est pas représenté dans la chaine de caractères).
 * @param {String} formation - la formation à tester provenant de l'input correspondant
 * @return {Boolean} - true si la formation est valide, false sinon
 */
const verifFormation = function(formation){
    //TODO
    var verif=true;
    if ((parseInt(formation[0])+parseInt(formation[1])+parseInt(formation[2]))!=10){ // on additionne les chiffres donnéés dans l'input
        verif=false;
    }
    else if((parseInt(formation[0])<3 || parseInt(formation[0])>5)){
        verif=false;
    }
    else if((parseInt(formation[1])<3 || parseInt(formation[1])>5)){
        verif=false;
    }
    else if((parseInt(formation[2])<1 || parseInt(formation[2])>3)){
        verif=false;
    }
    return verif
}


/**
 * Remplit les lignes de joueur en fonction de la formation choisie
 * @param {String} formation - formation d'équipe
 */
const remplirPostes = function(formation){
    const effectifs = [1]; // ajout du gardien
    for (c of formation)
        effectifs.push(parseInt(c))
    const lignes = document.getElementById("terrain").children
    for (let i=0; i<lignes.length ; i ++){
        lignes[i].innerHTML = ""
        for (let j = 0; j<effectifs[i]; j++){
            lignes[i].innerHTML +="<div class='positions "+POSTES[i]+"'></div>";
        }
    }
}

/*****************************************************
           === création des joueurs=== 
******************************************************/

/** Crée une <div> représentant un joueur avec un id de la forme "j-xxxxxx"
 * @param {Object} data - données d'un joueur
 * @return {HTMLElement} - div représentant un joueur
 */
const creerJoueur = function(data){

    //TODO créer une div joueur (attention aux attributs nécessaires)
	div = document.createElement("div")
    div.className = "joueur " + data["poste"]
    div.id = "j-" + data["id"]
    img = document.createElement("img")
    img.src = data["src"]
    img.alt = data["nom"]
    div2 = document.createElement("div")
    div2.className = "nom"
    div2.innerHTML = data["nom"]
    div3 = document.createElement("div")
    div3.className = "poste"
    div3.innerHTML = data["poste"]
    div.appendChild(img)
    div.appendChild(div2)
    div.appendChild(div3)
    return div
	// TODO créer l'image et l'ajouter  à la div joueur
    
    // TODO créer les <div> correspondants au nom et au poste et les ajouter  à la div joueur
    
    // TODO : relisez bien la documentation
}


/*****************************************************
           ===Sélection des joueurs=== 
******************************************************/

/** 
 * Abonne les <div> de class "joueur" à la fonction selectionneJoueur pour un click
 */
const abonneClickJoueurs = function(){
    const joueur =  document.querySelectorAll("div.joueur")
    for (let i = 0; i < joueur.length; i++){
        joueur[i].addEventListener("click",selectionneJoueur);
    }
}

/** 
 * Selectionne un joueur, change son opacité puis le place sur le terrain
 */
const selectionneJoueur = function(){
    joueurChoisi = this;
    this.style.opacity="0.3";
    placeJoueur();
}


/*************************************************************
           ===Modifications des joueurs sur le terrain=== 
************************************************************/

/**
 * Renvoie le noeud DOM correspondant à la position disponible pour placer un
 *  joueur sur le terrain ou null si aucune n'est disponible
 * @param {HTMLElement} ligne - une div ligne de joueurs sur le terrain
 * @returns {HTMLElement || null} - une div de class "positions" disponible dans cette ligne
 */
const trouveEmplacement = function(ligne){
    //TODO
    var places = ligne.childNodes
    taille = places.length
    for (let i =0; i < taille; i++){
        if (places[i].id == ""){
            return places[i]
        }
    }
}

/**
 * Renvoie le noeud DOM correspondant à la 
 * ligne où placer un joueur qur le terrain en fonction de son poste
 * @param {String} poste - poste du joueur
 * @returns {HTMLElement} - une div parmi les id #ligne...
 */
const trouveLigne = function(poste){
    return document.getElementById("ligne" + poste.substring(0,1).toUpperCase() +poste.substring(1));
}


/** 
 * Place un joueur sélectionné par un click sur la bonne ligne
 * dans une <div> de class "positions" avec un id de la forme "p-xxxxx"
 */
const placeJoueur = function(){
    const poste = joueurChoisi.classList[1] // le poste correspond à la 2ème classe;
    const ligne = trouveLigne(poste);
    const emplacementLibre = trouveEmplacement(ligne)
    if (emplacementLibre){
        // ajoute le nom du joueur et appelle la fonction permettant de mettre à jour la 
        // feuille de match
        const nom = joueurChoisi.querySelector(".nom").textContent;
        emplacementLibre.title = nom;
        const id = 'p' + joueurChoisi.id.substring(1)  
        ajouteJoueurListe(nom, id);
        
        // TODO modifier l'image de l'emplacement Libre
        const imageJ = joueurChoisi.children[0].src;
        emplacementLibre.style.backgroundImage = 'url(' + imageJ + ')';
        // TODO modifier l'id 
        emplacementLibre.id = id
        // TODO Empecher le click dans la zone joueur, et autorise celui dans la zone terrain
        // pour le joueur choisi 
        joueurChoisi.removeEventListener("click",selectionneJoueur)/*ajoutée (joueurChoisi ou this?) */ 
        emplacementLibre.addEventListener("click", deselectionneCompo)/*ajoutée*/
        // mise à jour des effectifs de la table )
        miseAJourNeffectifs(poste, true);
    }
    else {
        joueurChoisi.style.opacity="5";
    }
}  


/** 
 * Enléve du terrain le joueur sélectionné par un click
*/
const deselectionneCompo = function(){
    const option = document.querySelectorAll("select option");
    taille = option.length;
    if (this.classList.contains("capitaine")){
        for (let i = 0; i < taille; i++){
            if(option[i].id.substring(1)==this.id.substring(1)){
                option[i].click()
            }
        }
    }

    const poste = this.classList[1];
    const idJoueur = "j-" + this.id.substring(2);
    const joueur = document.getElementById(idJoueur);
    joueur.style.opacity="";
    joueur.addEventListener('click', selectionneJoueur);
    enleve_liste(this.id);//rajouter
    enleveJoueurFeuilleMatch(this.title);
    this.removeEventListener("click", deselectionneCompo);
    this.title="";
    this.style="";
    this.id="";
    enleveJoueurFeuilleMatch()
    miseAJourNeffectifs(poste, false);
    
}

/*************************************************************
           ===Mise à jour des effectifs=== 
************************************************************/

/**
 * Met à jour les effectifs dans le tableau lorsqu'un joueur est ajouté 
 * ou retiré du terrain.
 * Après chaque modification, une vérification de la composition compléte
 * doit être effectuée et le changement d'image de la feuille de match
 * doit être éventuellement réalisé.
 * @param {String} poste - poste du joueur
 * @param {Boolean} plus - true si le joueur est ajouté, false s'il est retiré
 */
const miseAJourNeffectifs = function(poste, plus){
    //TODO
    const valeur=document.querySelector("td."+poste); // on recupere la case du poste
    if (plus ==true){
        valeur.textContent=parseInt(valeur.textContent)+1 //rajoute 1 si on ajoute un joueur
    }
    else{
        valeur.textContent=parseInt(valeur.textContent)-1 //enleve 1 si on retire un joueur
    }
    verifCompoComplete()
}


/**
 * Verifie si l'effectif est complet.
 * L'image de la feuille de match est changée en conséquence.
 * @returns {Boolean} - true si l'effectif est au complet, false sinon
 */
const verifCompoComplete = function(){
    //TODO
    const nombre_joueur=document.querySelectorAll("td"); // on recupere toute les cases
    var res=0;
    for (var i=0;i<nombre_joueur.length;i++){
        res+=parseInt(nombre_joueur[i].textContent) //compte le nombre de joueurs dans le tableaux
    }
    if (res==11){
        changeImageComplete(true); // l'effectif est au complet ,on change l'image
    }
    else{
        changeImageComplete(false); // il manque des joueurs 
    }
}

/*************************************************************
           ===Mise à jour de la feuille de match=== 
************************************************************/

/**
 * Modifie l'image de la feuille de match
 * en fonction de la taille de l'effectif
 * @param {Boolean} complet - true si l'effectif est complet, false sinon
 */
const changeImageComplete = function(complet){
    //TODO
    image_check=document.getElementById("check"); //recupere l'element image correspondant
    if (complet==true){
        image_check.src="./images/check.png"; //change l'image
    }
    else if (complet==false){
        image_check.src="./images/notok.png"; //change l'image
    }


}


/**
 * Enleve un joueur de la feuille de match
 * @param {String} nom - nom du joueur à retirer
 */
const enleveJoueurFeuilleMatch = function(nom){
    //TODO
    const feuille = document.getElementById("feuilleDeMatch").childNodes[5].childNodes //[ #text, h1, #text, img#check, #text, ul, #text ] ul à l'indice 5
    const taille = feuille.length;
    
    for (let i = 0; i < taille; i++){
        if (feuille[i].childNodes[0].textContent == nom){
            var bouton=document.getElementById(feuille[i].id).childNodes[1];
            if (bouton.checked){
                bouton.click();
            }
            document.getElementById("feuilleDeMatch").childNodes[5].removeChild(feuille[i])
            i = taille;
        }
    }
}


/**
 * ajoute un joueur à la feuille de match dans un élément
 * <li> avec un id de la forme "f-xxxxx"
 * @param {String} nom - nom du joueur
 * @param {String} id - id du joueur ajouté au terrain de la forme "p-xxxxx"
 */
const ajouteJoueurListe = function(nom, id){
    const liste = document.getElementById('feuilleDeMatch').querySelector('ul');
    const li = document.createElement('li');
    const bouton=document.createElement("input");
    li.textContent = nom;

    bouton.type="checkbox";
    bouton.addEventListener('change',ajoute_cartonJaune);

    li.id =  "f-"+id.substring(2);
    li.appendChild(bouton);
    liste.appendChild(li);

    ajoute_capitaine(nom,id);
}

/*************************************************************
           ===OPTION: Carton === 
************************************************************/


/** 
 * met un carton jaune au joueur donc le nom est cocher et l'enleve dans le cas contraire
*/
const ajoute_cartonJaune=function(){
    cartonJaune=document.createElement('img'); //creer un element img
    const joueur=document.querySelectorAll("div#terrain div div"); //on recupere toutes les div du terrain (cercle)
    cartonJaune.id="cartonJaune"; 
    cartonJaune.src="./images/carton_jaune.jpg"; 

    const bouton2=document.createElement("input");
    bouton2.type="checkbox";
    bouton2.id="cartonRouge"
    bouton2.addEventListener('change',ajoute_cartonRouge); //ajoute un evenement change sur le 2eme bouton qui met un carton rouge
    

    for (var i = 0; i < joueur.length; i++){ 
        if (this.checked){  //ajoute un carton jaune, ainsi qu'une case au joueur cocher
            if ((this.parentNode.id.substring(2))==(joueur[i].id.substring(2))){
            joueur[i].appendChild(cartonJaune); //ajouter le carton jaune
            this.parentNode.appendChild(bouton2); //ajoute la deuxieme case

        }
        }
        else if(this.checked==false){ //enleve le carton jaune, ainsi que la case au joueur décocher
            if ((this.parentNode.id.substring(2))==(joueur[i].id.substring(2))){
                joueur[i].removeChild(joueur[i].childNodes[0]);//enleve le carton jaune
                joueur[i].style.opacity="1"; // remet l'opacite de base 
                this.parentNode.removeChild(document.querySelector("#"+this.parentNode.id+" input#cartonRouge"));//enleve la deuxieme case
        }
        }
    
    }
}
/** 
 * met un carton rouge au joueur donc le nom est cocher et l'enleve dans le cas contraire
*/
const ajoute_cartonRouge=function(){
    cartonRouge=document.createElement('img');
    const joueur=document.querySelectorAll("div#terrain div div"); //on recupere toutes les div du terrain (cercle)
    cartonRouge.id="carton_Rouge";
    cartonRouge.src="./images/carton_rouge.jpg";

    cartonJaune=document.createElement('img');
    cartonJaune.id="cartonJaune";
    cartonJaune.src="./images/carton_jaune.jpg";

    for (var i = 0; i < joueur.length; i++){
        if (this.checked){
            if ((this.parentNode.id.substring(2))==(joueur[i].id.substring(2))){
            joueur[i].appendChild(cartonRouge);//ajouter le carton rouge
            joueur[i].removeChild(joueur[i].childNodes[0]);//enleve le carton jaune
            joueur[i].style.opacity="0.4"
            cartonRouge.style.opacity="1"

        }
        }
        else if(this.checked==false){
            if ((this.parentNode.id.substring(2))==(joueur[i].id.substring(2))){
                joueur[i].removeChild(joueur[i].childNodes[0]);//enleve le carton rouge
                joueur[i].appendChild(cartonJaune);//ajouter le carton jaune
                joueur[i].style.opacity="1"
        }
        }
    
    }
}


/*************************************************************
           ===OPTION: Capitaine=== 
************************************************************/
/** 
 * ajoute le menu deroulant
*/
const capitaine=function(){
    const menu=document.createElement('select');
    const emplacement=document.getElementById("strategie");
    emplacement.appendChild(menu);
    const option=document.createElement('option');
    option.textContent="choisir un capitaine";
    option.value=0;
    option.id="f-aucun";
    option.addEventListener("click",aucun_capitaine)
    emplacement.lastChild.appendChild(option); 
}


const aucun_capitaine=function(){
    const liste = document.querySelectorAll("#feuilleDeMatch ul li");
    const options = document.querySelectorAll("option");
    taille = liste.length;
    for (let i=0; i < taille; i++){
        if (liste[i].value == 1){
            options[i+1].click()
        }
    }

}




/** 
 * ajoute les options dans le menu deroulant
 * @param {String} nom - nom du joueur
 * @param {String} id - l'id du joueur
*/
const ajoute_capitaine=function(nom,id){
    const option=document.createElement('option');
    const emplacement=document.getElementById("strategie");

    option.id=id;
    option.textContent=nom;
    option.value=0;
    option.addEventListener("click",choix_capitaine);

    emplacement.lastChild.appendChild(option);
}

/** 
 * si le joueur n'est plus dans la liste ,on l'enleve aussi des options
  * @param {String} id - l'id du joueur
*/
const enleve_liste=function(id){
    const nom=document.querySelector("option#"+id);
    nom.parentNode.removeChild(nom);

}

// vide la liste des capitaines lors du raz
const enleve_liste_raz =function(){
    select = document.querySelector("div#strategie select") // prend la liste des capitaines
    taille =  select.childNodes.length 
    for (let i =0; i < taille-1; i++){// supprime tout les capitaines possibles
    select.removeChild(select.childNodes[1]) 
    } 
} 

/** 
 * quand le capitaine est choisi change la couleur de son nom et le souligne
*/
var capitaine_libre=0; 
const choix_capitaine=function(){
    const nom=document.getElementById("f-" + this.id.substring(2))
    const joueur=document.getElementById(this.id);
    const option=document.querySelectorAll("option")
    const liste = document.querySelectorAll("#feuilleDeMatch ul li");
    if(nom.value==1){
        nom.style.textDecoration="";
        nom.style.color="";
        nom.value=0;
        capitaine_libre=0;
        joueur.className=joueur.className.substring(0,19)
        option[0].textContent="choisir le capitaine"
    }
    else if (capitaine_libre==0){
    nom.style.textDecoration="underline";
    nom.style.color="gold";
    nom.value=1;
    capitaine_libre=nom.value;
    joueur.className=joueur.className+" capitaine"
    option[0].textContent="enleve le capitaine"
    }
    else{
        taille = liste.length
        for(let i=0; i < taille; i++){
            if(liste[i].value == 1){
                option[i+1].click()
            }
        }
        nom.style.textDecoration="underline";
        nom.style.color="gold";
        nom.value=1;
        capitaine_libre=nom.value;
        joueur.className=joueur.className+" capitaine"
        option[0].textContent="enleve le capitaine"
    }
        
}

/*************************************************************
           ===OPTION: equipe feminine/masculine=== 
************************************************************/
/** 
 * ajoute deux bouton qui a l'activation change l'equipe
*/
const ajoute_bouton=function(){
    const bouton=document.createElement("button");
    bouton.id='men';
    bouton.textContent="men";
    bouton.addEventListener("click",changement_script)
    const bouton2=document.createElement("button");
    bouton2.id='women';
    bouton2.textContent="women";
    bouton2.addEventListener("click",changement_script2)
    const emplacement=document.getElementById("selection");
    emplacement.appendChild(bouton);
    emplacement.appendChild(bouton2);

}

/** 
 * Prend la variable avec les données des hommes
*/
const changement_script=function(){
    const joueur=document.querySelectorAll("div#terrain div div");
    playersData=playersDataMen;
    for (var i = 0; i < joueur.length; i++){ // boucle qui sert a enleve tout les joueurs du terrain
        joueur[i].click()
    }
    capitaine_libre=0
    raz(); 
}
/** 
 * Prend la variable avec les données des femmes
*/
const changement_script2=function(){
    const joueur=document.querySelectorAll("div#terrain div div");
    playersData=playersDataWomen;
    for (var i = 0; i < joueur.length; i++){ // boucle qui sert a enleve tout les joueurs du terrain
        joueur[i].click()
    }
    capitaine_libre=0
    raz();
}
    

/*************************************************************
           ===Initialisation de la page=== 
************************************************************/
init();

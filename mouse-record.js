var fps = 10;
var state = 0; //0 = stop, 1 = play, 2 = record

//coordonnées enregistrées
var coordinates = new Array(); 

// coordonnées courantes
var posx = 0; 
var posy = 0;

//simule le fichier
var positions = '';

//timers
var timer;
var timerReplay;

var moveDate=null;
/* Enregistrer la souris 
*******************************************************************************/
/**
 * Sauvegarde l'ensemble de coordonnées (pour le moment dans une chaîne)
 */
function isSaved(){
    appendLog('Fichier enregistré');
}
 
function saveCoordonnees(){
    positions = coordinates.join('|');
    var params = "coord="+positions;
    //console.log(params)
    moveDate = params;
    /*var myAjax = new Ajax.Request(
    "fwrite.php", 
    {
        method: 'post', 
        parameters: params, 
        onComplete: isSaved
    });*/
}

/**
 * Récupère la position courante de la souris
 */
function grabCoordinates(e){
    if (!e) var e = window.event;
    if (e.pageX || e.pageY)
    {
        this.posx = e.pageX;
        this.posy = e.pageY;
    }
    else if (e.clientX || e.clientY)
    {
        this.posx = e.clientX + document.body.scrollLeft;
        this.posy = e.clientY + document.body.scrollTop;
    }
}

/**
 * Sauvegarde la coordonnées
 */
function pushCoordinates(){
    coordinates.push(posx+','+posy+',m');
    //appendLog('move:'+posx+','+posy);
}

function pushClick(){
    if (state == 2){
        //boo, that's ugly
        coordinates.push(posx+','+posy+',c');
        coordinates.push(posx+','+posy+',c');//?
        //appendLog('clic:'+posx+','+posy);
        //appendLog('clic:'+posx+','+posy);
    }
}

/**
 * Démarre l'enregistrement
 */
function startRecord(){
    setFPS();
    state = 2;
    disableAction();
    timer = window.setInterval('pushCoordinates()', Math.floor(1000/fps));
    document.getElementById('console').value = '';
    window.onmousemove = grabCoordinates;
}

/**
 * Arrête l'enregistrement
 */
function stopRecord(){
    window.clearInterval(timer);
    saveCoordonnees();
    state = 0;
    enableAction();
    document.getElementById('which').selectedIndex = 0;
}

/* Lecture
*******************************************************************************/
/**
 * Démarre la lecture
 */
function startPlay(obj){
    //console.log(obj)
    //appendLog('Fichier chargé');
    coordinates = obj.split('|');
    state = 1;
    setFPS();
    //chargeCoordonnees();
    disableAction();
    timerReplay = window.setInterval('setMousePosition()',Math.floor(1000/fps));
}

/**
 * Charge l'ensemble des coordonnées (pour le moment depuis une chaîne)
 */
function chargeCoordonnees(){
    //charge depuis xmlhttprequest
    var fichier = document.getElementById('which').options[document.getElementById('which').selectedIndex].value;
    var params = '';
    if (fichier != -1){
        params = 'file='+fichier;
    }
    startPlay(moveDate);
   /* var myAjax = new Ajax.Request(
    "fread.php", 
    {
        method: 'get', 
        parameters: params, 
        onComplete: startPlay
    });*/
}

/**
 * Déplace le pointeur
 */
function setMousePosition(){
    if (coordinates.length > 0){
        current = coordinates.shift();
        coord = current.split(',');
        x = coord[0];
        y = coord[1];
        action = coord[2];
        document.getElementById('pointer').style.left = x+'px';
        document.getElementById('pointer').style.top = y+'px';
        if (action == 'm'){
            document.getElementById('pointer').src = "pointer.png";
        }
        else if (action == 'c'){
            document.getElementById('pointer').src = "pointer-clic.png";
        }
    }
    else{
        stopPlay();
    }
}

/**
 * Arrête la lecture
 */
function stopPlay(){
    window.clearInterval(timerReplay);
    state = 0;
    enableAction();
    //appendLog('Fin de la lecture');
}

/* Misc
*******************************************************************************/
/**
 * Désactive les boutons Play/Record
 */
function disableAction(){
    document.getElementById('play').onclick = null;
    document.getElementById('record').onclick = null;
    document.getElementsByTagName('html')[0].onclick = pushClick;
}

/**
 * Active les boutons Play/Record
 */
function enableAction(){
    document.getElementById('play').onclick = chargeCoordonnees;
    document.getElementById('record').onclick = startRecord;
    document.getElementsByTagName('html')[0].onclick = null;
}

/**
 * Set la valeur du framerate à partir de la valeur du champs
 */
function setFPS(){
    if (!isNaN(document.getElementById('fps').value)){
        fps = document.getElementById('fps').value;
    }
    else{
        fps = 10;
    }
}

/**
 * Arrête les actions
 */
function stop(){
    if (state == 1){
        stopPlay();
    }
    else if (state == 2){
        stopRecord();
    }
}

function appendLog(string){
    document.getElementById('console').value = string+"\n"+document.getElementById('console').value;
}

function clearLog(){
    document.getElementById('console').value = '';
}

/* Initialisation
*******************************************************************************/
function init(){
    document.getElementById('stop').onclick = stop;
    document.getElementById('play').onclick = chargeCoordonnees;
    document.getElementById('record').onclick = startRecord;
}

window.onload = init;

let numDejaPasse=[];
const regex = new RegExp('^[0-9]+$');

let nextId = 1;
let timers = [];

document.getElementById("Ajouter").addEventListener("click", () => {
    let table=document.getElementById("tableau");
    for(let i =1;i<4;i++){
        let name=document.getElementById("numSuivant"+i).value;
        document.getElementById("numSuivant"+i).value="";
        if(name==="" || numDejaPasse.includes(name) || !(regex.test(name))){

        }
        else{
            numDejaPasse.push(name);
            let startTime = Date.now();
            
            let row=table.insertRow(0+1);
            row.className = "row";


            let nameCell=row.insertCell(0);
            nameCell.className="col";
            nameCell.textContent = name;
            row.appendChild(nameCell);
    
            let timeCell = document.createElement("td");
            timeCell.className="col";
            row.appendChild(timeCell);
    
            let actionsCell=row.insertCell(2);
            actionsCell.innerHTML='<button id="Annule'+name+'"class="btn btn-warning" ">Annulé</button> <button id="Arrive'+name+'" class="btn btn-success">arrivé</button>';
            actionsCell.className="col";
            row.appendChild(actionsCell);
            
            let timerId = setInterval(() => {
                let elapsedTime = Date.now() - startTime;
                timeCell.textContent = formatTime(elapsedTime);
            }, 10);
                
    
            let stopButton = document.getElementById("Arrive"+name);
            stopButton.addEventListener("click", () => {
                clearInterval(timerId);
                timers = timers.filter(t => t.id !== timerId);

                actionsCell.innerHTML="Arrivé";

            });

            let annuleButton = document.getElementById("Annule"+name);
            annuleButton.addEventListener("click", () => {
                clearInterval(timerId);
                timers = timers.filter(t => t.id !== timerId);

                actionsCell.innerHTML="Annulé";
                timeCell.innerHTML="Non comptabilisé";
                
            });
    
            timers.push({ id: timerId });
    
            let tbody = document.querySelector("#tableau tbody");
            tbody.prepend(row);
        }
    }
        
});

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 100);

    return `${pad(minutes)}:${pad(seconds)},${milliseconds}`;
}

function pad(num) {
    return num.toString().padStart(2, "0");
}


/*_________________________________________________________creer csv*/ //probleme de traitement des valeurs par excel car format mm:ss:ccc et non hh:mm:ss
function createExcel(){
    let valeurs="";


    var table = document.getElementById("tableau");
    for (var i = 1, row; row = table.rows[i]; i++) {
        valeurs+=(row.cells[0].innerHTML+";"+row.cells[1].innerHTML+"\n");
    }

    //document.write(valeurs);
    
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:date/csv;charset=utf-8,' + encodeURI(valeurs);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Temps.csv';
    hiddenElement.click();
}
    

/*_________________________________________________________convetion pdf*/
function createPDF() {
    document.getElementById("numeros").style.display  = 'none';
    document.getElementById("boutons").style.display  = 'none';
    print();
    document.getElementById("numeros").style.display  = 'block';
    document.getElementById("boutons").style.display  = 'block';
}


/*_________________________________________________________tri par chrono*/
function triChrono(){
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tableau");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td");
            y = rows[i + 1].getElementsByTagName("td");
            if (x[1].innerHTML > y[1].innerHTML) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


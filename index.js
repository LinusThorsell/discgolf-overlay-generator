var front9 = false;

var scorecard = 
[
    [],
    [],
    [],
    [],
    []
];

var par = 
[ 
    3, 4, 4, 4, 3, 3, 3, 5, 3,
    3, 4, 3, 5, 3, 3, 3, 4, 3 
]

var amountofholesplayed = [0,0,0,0,0];

const mirrorplayercontainer = document.getElementById('playermirror');
const datatomirror = document.querySelectorAll('.container');
mirrorplayers()

const alltopcontainers = document.querySelectorAll('.top-container');

var imported_r1;

function updatePlayerList(json) {

    var select_element_1 = document.getElementById("select_player_1");
    var select_element_2 = document.getElementById("select_player_2");
    var select_element_3 = document.getElementById("select_player_3");
    var select_element_4 = document.getElementById("select_player_4");
    var select_element_5 = document.getElementById("select_player_5");
    json.forEach((player, index) => {
        select_element_1.innerHTML += "<option value='" + index + "'>" + player["First name"] + " " + player["Last name"] + "</option>"
        select_element_2.innerHTML += "<option value='" + index + "'>" + player["First name"] + " " + player["Last name"] + "</option>"
        select_element_3.innerHTML += "<option value='" + index + "'>" + player["First name"] + " " + player["Last name"] + "</option>"
        select_element_4.innerHTML += "<option value='" + index + "'>" + player["First name"] + " " + player["Last name"] + "</option>"
        select_element_5.innerHTML += "<option value='" + index + "'>" + player["First name"] + " " + player["Last name"] + "</option>"
    });
}

function confirmPlayers() {
    
    console.log(scorecard);
    
    var player1 = document.getElementById("select_player_1").value;
    var player2 = document.getElementById("select_player_2").value;
    var player3 = document.getElementById("select_player_3").value;
    var player4 = document.getElementById("select_player_4").value;
    var player5 = document.getElementById("select_player_5").value;

    scorecard[0] = [];
    scorecard[1] = [];
    scorecard[2] = [];
    scorecard[3] = [];
    scorecard[4] = [];

    for (i = 1; i <= 18; i++)
    {
        scorecard[0].push(imported_r1[player1]['H' + i])
        scorecard[1].push(imported_r1[player2]['H' + i])
        scorecard[2].push(imported_r1[player3]['H' + i])
        scorecard[3].push(imported_r1[player4]['H' + i])
        scorecard[4].push(imported_r1[player5]['H' + i])
    }

    console.log(scorecard);

    document.querySelectorAll(".name")[0].innerHTML = imported_r1[player1]["First name"] + " " + imported_r1[player1]["Last name"]
    document.querySelectorAll(".name")[1].innerHTML = imported_r1[player2]["First name"] + " " + imported_r1[player2]["Last name"]
    document.querySelectorAll(".name")[2].innerHTML = imported_r1[player3]["First name"] + " " + imported_r1[player3]["Last name"]
    document.querySelectorAll(".name")[3].innerHTML = imported_r1[player4]["First name"] + " " + imported_r1[player4]["Last name"]
    document.querySelectorAll(".name")[4].innerHTML = imported_r1[player5]["First name"] + " " + imported_r1[player5]["Last name"]
    document.querySelectorAll(".name")[5].innerHTML = imported_r1[player1]["First name"] + " " + imported_r1[player1]["Last name"]
    document.querySelectorAll(".name")[6].innerHTML = imported_r1[player2]["First name"] + " " + imported_r1[player2]["Last name"]
    document.querySelectorAll(".name")[7].innerHTML = imported_r1[player3]["First name"] + " " + imported_r1[player3]["Last name"]
    document.querySelectorAll(".name")[8].innerHTML = imported_r1[player4]["First name"] + " " + imported_r1[player4]["Last name"]
    document.querySelectorAll(".name")[9].innerHTML = imported_r1[player5]["First name"] + " " + imported_r1[player5]["Last name"]
}

function mirrorplayers() {
    datatomirror.forEach(container => {
        mirrorplayercontainer.innerHTML += container.outerHTML;
        mirrorplayercontainer.innerHTML.innerHTML += container.innerHTML;
    });
}

async function handleFileAsync(e) {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);

    /* DO SOMETHING WITH workbook HERE */
    if (e.target.id === "input_r1_sheet")
    {
        imported_r1 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], false);
        updatePlayerList(imported_r1)
    }
}
document.getElementById("input_r1_sheet").addEventListener("change", handleFileAsync, false);

function switchnine() {

    front9 = !front9;

    document.querySelectorAll('.top-container').forEach((container, index) => {
        container.outerHTML = alltopcontainers[index].outerHTML;
        container.innerHTML = alltopcontainers[index].innerHTML;
    })

    if (front9)
    {
        document.querySelectorAll('.back9').forEach(element => {
            element.remove();
        })

        document.getElementById("switch").innerText = "Switch to back 9";
    }
    else {
        document.querySelectorAll('.front9').forEach(element => {
            element.remove();
        })

        document.getElementById("switch").innerText = "Switch to front 9";
    }
}

// function openImage(base64URL){
//     var win = window.open();
//     win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen> </iframe>');
// }

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function updateHole() {
    var hole = document.getElementById("info_hole").value;
    var hardest = document.getElementById("info_hardest").value;
    var meters = document.getElementById("info_m").value;
    var feet = document.getElementById("info_ft").value;

    document.getElementById("holelabel").innerHTML = "<p>Hole " + hole + "</p>";
    document.getElementById("holeinfo").innerHTML = "<p>Par " + hole + "</p><p>" + meters + "m </p><p>" + feet + "ft</p>";
    document.getElementById("holedifficulty").innerHTML = "<p>" + hardest + "th most difficult</p>";
}

function updateTotal(player)
{
    console.log("starting")
    var score = 0;
    var temp = amountofholesplayed[player];
    // if (backnine) (temp+=9);
    console.log(temp)

    for (i = 0; i < temp; i++)
    {
        console.log(i)
        score += scorecard[player][i] - par[i];
        console.log(score)
    }
    console.log("ending")

    console.log(score);

    if (score > 0) {score = "+"+score};
    document.querySelectorAll(".total" + player)[0].innerText = score;
    document.querySelectorAll(".total" + player)[1].innerText = score;

    html2canvas(document.querySelector("#screen"), {backgroundColor:null}).then(canvas => {
        // document.body.appendChild(canvas)
        downloadURI(canvas.toDataURL("png"), "Overlay");
        // const win = window.open(canvas.toDataURL("png"), '_blank')
        // openImage(canvas.toDataURL("png"));
    });
}

function triggerShowHoleScore(player, hole)
{
    amountofholesplayed[player] = hole;

    var element = document.querySelectorAll(".s" + player + hole);
    console.log(element);

    var relative = scorecard[player][hole-1] - par[hole-1];
    console.log(relative);

    var backgroundcolor = "" // to see if something goes wrong.
    var color = ""

    if (scorecard[player][hole-1] === 1) {
        backgroundcolor = "orange";
        color = "black";
    }
    else {
        switch (relative) {
            case -2:
                color = "skyblue";
                backgroundcolor = "blue";
                break;
            case -1:
                color = "black";
                backgroundcolor = "lime";
                break;
            case 0:
                color = "black";
                backgroundcolor = "gray";
                break;
            case 1:
                color = "black";
                backgroundcolor = "red";
                break;
            case 2:
                color = "black";
                backgroundcolor = "darkred";
                break;
            
            default:
                color = "white";
                backgroundcolor = "black";
                break;
            
        }
    }

    backgroundcolor = "background-color: " + backgroundcolor + ";";
    color = "color: " + color + ";";

    element[0].style = color + backgroundcolor;
    element[1].style = color + backgroundcolor;

    updateTotal(player);
}

switchnine()
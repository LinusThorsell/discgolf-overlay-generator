var front9 = false;

var scorecard = 
[
    [
        2, 4, 4, 3, 3, 4, 4, 6, 4, 
        4, 3, 3, 5, 4, 3, 3, 3, 3
    ],
    [
        2, 4, 4, 3, 3, 4, 4, 6, 4, 
        4, 3, 3, 5, 4, 3, 3, 3, 3
    ],
    [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    [
        2, 4, 4, 3, 3, 4, 4, 6, 4, 
        4, 3, 3, 5, 4, 3, 3, 3, 3
    ],
    [
        2, 4, 4, 3, 3, 4, 4, 6, 4, 
        4, 3, 3, 5, 4, 3, 3, 3, 3
    ],
];

var par = 
[ 
    3, 4, 4, 4, 3, 3, 3, 5, 3,
    3, 4, 3, 5, 3, 3, 3, 4, 3 
]

var amountofholesplayed = [0,0,0,0,0];

const alltopcontainers = document.querySelectorAll('.top-container');

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
    document.getElementById("total" + player).innerText = score;

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

    var element = document.getElementById("s" + player + hole);
    console.log(element);

    var relative = scorecard[player][hole-1] - par[hole-1];
    console.log(relative);

    var backgroundcolor = "brown" // to see if something goes wrong.
    var color = "aqua"

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

    element.style = color + backgroundcolor;

    updateTotal(player);
}

switchnine()
// triggerShowHoleScore(1, false);
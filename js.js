function loadPage(page) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("container").style.opacity = "0";
            var y = this.responseText;
            setTimeout(function() {
                document.getElementById("container").innerHTML = y;
                document.getElementById("container").style.opacity = "1";
                if (location.hash === "#mijnportfolio" || location.hash === "#makeyourown") {
                    resSite();
                }
                if (location.hash === "#home" || location.hash === "" || location.hash === "index") {
                    cInit()
                }
            }, 400);
        }
        if (this.status == 404) {
            location.hash = "";
        }
    };
    xhr.open("GET", page + ".php", true);
    xhr.send();
}

function toPage(page) {
    location.hash = page;
}

function pageSelect() {
    var url = window.location.href;
    var urlSplit = url.split("#");
    var currentPage = urlSplit[1];
    if (location.hash === "" || location.hash === "#home" || location.hash === "#index") {
        loadPage("home");
    } else {
        loadPage(currentPage);
    }
}

var img = "default";
var siteTitle = "http://google.com";
var titleCont = "default";

function getPageTitle(page) {
    var purl = encodeURIComponent(page);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            titleCont = this.responseText;
            addNewSite()
        }
    };
    xhr.open("POST", "gettitle.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("input=" + purl);
}

function cInit() {
    var consoleInput = document.getElementById("consoleInput");
    consoleInput.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
            cExec();
        }
    });
}

function cExec() {
    var newLine = document.createElement("p");
    var rawInput = document.getElementById('consoleInput').value.replace(/ /g, '')
    var consoleInput = rawInput.split("-")
	var wholeConsole = document.getElementById("console");
    switch (consoleInput[0]) {
        case 'help':
            newLine.innerHTML = 'Available commands: <font style="color:yellow;">help</font>, <font style="color:yellow;">author</font>, <font style="color:yellow;">about</font>, <font style="color:yellow;">test</font>, <font style="color:red;">clear</font>'
            break;
        case 'author':
            newLine.innerHTML = 'Made by Hergen Dillema'
            break;
        case 'about':
            newLine.innerHTML = 'Custom console-like interface, made using javascript, by Hergen Dillema for CodeGorilla'
            break;
        case 'test':
            newLine.innerHTML = window.location
            break;
        case 'clear':
			var i = wholeConsole.childNodes.length - 3;
			var x=0;
			while (x<i) {			
			wholeConsole.removeChild(wholeConsole.childNodes[0])
			x++;
			}
            break;
        default:
            newLine.innerHTML = 'Command "' + consoleInput[0] + '" is not know, type "help" for a list of all commands. Options used: ' + consoleInput[1];
    }

    wholeConsole.insertBefore(newLine, document.getElementById('start'));
    wholeConsole.scrollTop = wholeConsole.scrollHeight;
    document.getElementById('consoleInput').value = "";
}

function addNewSite() {
    //Making divs and image
    var newDiv = document.createElement("div");
    newDiv.className = "siteBlok";
    var newTitle = document.createElement("div");
    newTitle.className = "titleBlok";
    var newImg = document.createElement("img");
    newImg.className = "imgBlok";
    newTitle.innerHTML = "<h2>" + titleCont + "</h2>"

    //Div styling
    newDiv.style.position = "relative";

    newDiv.style.float = "left";
    newDiv.style.margin = "5px";
    newDiv.style.cursor = "pointer";
    newDiv.onclick = function() {
        window.location.href = siteTitle
    };

    //Text styling
    newTitle.style.position = "absolute";
    newTitle.style.bottom = "0";
    newTitle.style.zIndex = "10";
    newTitle.style.backgroundColor = "rgba(0,0,0,0.6)";
    newTitle.style.overflow = "hidden";


    //Resize options
    var containerW = document.getElementById('portContent').offsetWidth;
    var countSites = Math.floor(containerW / 270)
    var divWidth = (containerW / countSites) - 10;
    var divHeight = (divWidth / 4) * 3;
    newDiv.style.width = divWidth + "px";
    newDiv.style.height = divHeight + "px";
    newTitle.style.height = (divHeight / 2.5) + "px";
    newTitle.style.width = divWidth + "px";
    newImg.height = divHeight;
    newImg.width = divWidth;

    //Image styling
    newImg.src = img;
    newImg.style.position = "relative";
    newImg.style.zIndex = "1";
    newImg.style.objectFit = "cover";
    newImg.style.objectPosition = "left";
    //Insert
    newDiv.appendChild(newImg);
    newDiv.appendChild(newTitle);
    document.getElementById("projects").appendChild(newDiv);
    if (window.innerWidth > document.getElementById('container').offsetWidth) {
        resSite();
    }

}

function resSite() {
    console.log("resSite");
    // variables
    var containerW = document.getElementById('portContent').offsetWidth;
    console.log(document.getElementById('portContent').offsetWidth);
    var countSites = Math.floor(containerW / 270);
    var divWidth = (containerW / countSites) - 11;
    var divHeight = (divWidth / 4) * 3;
    //Resize siteBlok
    var siteBlok = document.getElementsByClassName("siteBlok");
    for (i = 0; i < siteBlok.length; i++) {
        siteBlok[i].style.width = divWidth + "px";
        siteBlok[i].style.height = divHeight + "px";
    }
    //Resize titleBlok
    var titleBlok = document.getElementsByClassName("titleBlok");
    for (i = 0; i < titleBlok.length; i++) {
        titleBlok[i].style.height = (divHeight / 2.5) + "px";
        titleBlok[i].style.width = divWidth + "px";
    }
    //Resize imgBlok
    var imgBlok = document.getElementsByClassName("imgBlok");
    for (i = 0; i < imgBlok.length; i++) {
        imgBlok[i].height = divHeight;
        imgBlok[i].width = divWidth;
    }
}

function loadImg(a) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            img = this.responseText;
            getPageTitle(siteTitle)
        }
    };
    xhr.open("POST", "screenshot.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(a);
}

function sendIt() {
    siteTitle = document.getElementById("myForm").elements[0].value;
    var y = "input=" + siteTitle;
    loadImg(y);

}

function execInit() {
    pageSelect();
}

function execRes() {
    if (location.hash === "#mijnportfolio" || location.hash === "#makeyourown") {
        resSite();
        console.log("mijn");
    }
}

window.onhashchange = execInit;
window.onload = execInit;
window.onresize = execRes;
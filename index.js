var map = [];
var lei = [];
var boxWidth = 30;
var boxHeidht = 30;
var col = 10;
var row = 10;
var oInput = document.getElementsByTagName('input')[0];
var leiNum;
var number = document.getElementById("number");
var oButton = document.getElementById("restart");
var aa = 10;
var game = {
    init: function() {
        this.createMap();
        this.createLei();
        this.rightClick();
        this.restart();
        this.click();
    },
    createMap: function() {
        window.oDiv = [];
        for (var i = 0; i < col; i++) {
            for (var j = 0; j < row; j++) {
                map[i * col + j] = 0;
                lei[i * col + j] = 0;
            }
        }
        for (var i = 0; i < col; i++) {
            for (var j = 0; j < row; j++) {
                var oDiv = document.createElement("div");
                window.oDiv.push(oDiv);
                if (map[i * col + j] == 0) {
                    oDiv.className = "box";
                }
                oDiv.id = i * col + j;
                oDiv.style.width = boxWidth + "px";
                oDiv.style.height = boxHeidht + "px";
                oDiv.style.top = (boxHeidht * j) + "px";
                oDiv.style.left = (boxWidth * i) + "px";
                document.getElementById("background").appendChild(oDiv);
            }
        }
    },
    createLei: function() {
        for (var num = 0; num < leiNum; num++) {
            var i = Math.floor(Math.random() * col);
            var j = Math.floor(Math.random() * row);
            if (lei[i * col + j] != 'lei') {
                lei[i * col + j] = 'lei';
            } else {
                num--;
            }
        }
    },
    click: function() {
        for (var i = 0; i < window.oDiv.length; i++) {
            window.oDiv[i].onmousedown = function(event) {
                if (event.button == 0) {
                    var thisId = Number(this.id);
                    if (lei[thisId] == 'lei') {
                        alert('Game Over !!!');
                        game.over();
                    } else {
                        game.check(thisId);
                    }
                } else if (event.button == 2) {
                    if (map[thisId] == 1) {
                        return 0;
                    }
                    if (leiNum > 0) {
                        if (this.className == "flag") {
                            this.className = 'wenhao';
                            leiNum++;
                        } else {
                            this.className = "flag";
                            leiNum--;
                        }
                        number.innerHTML = leiNum;
                    }
                }
            }
        }
    },
    over: function() {
        for (var i = 0; i < col * row; i++) {
            if (lei[i] == 'lei') {
                window.oDiv[i].className = 'lei';
            } else {
                game.check(i);
                window.oDiv[i].className = 'box1';
            }
        }
    },
    check: function(thisId) {
        if (thisId >= 0 && thisId < 100) {
            var numAround = 0;
            var aroundLei = [];
            if (thisId == 0) {
                aroundLei = [1, thisId + row, thisId + row + 1];
            } else if (thisId == row - 1) {
                aroundLei = [thisId - 1, thisId + row, thisId + row - 1];
            } else if (thisId > 0 && thisId < row - 1) {
                aroundLei = [thisId - 1, thisId + 1, thisId + row, thisId + row - 1, thisId + row + 1];
            } else if (thisId == col * row - 1) {
                aroundLei = [thisId - 1, thisId - row, thisId - row - 1];
            } else if (thisId == row * (col - 1)) {
                aroundLei = [thisId + 1, thisId - row, thisId - row + 1];
            } else if (thisId < col * row - 1 && thisId > row * (col - 1)) {
                aroundLei = [thisId - 1, thisId + 1, thisId - row, thisId - row - 1, thisId - row + 1];
            } else if (thisId % row == 0) {
                aroundLei = [thisId + 1, thisId - row, thisId - row + 1, thisId + row, thisId + row + 1];
            } else if ((thisId + 1) % 10 == 0) {
                aroundLei = [thisId - 1, thisId - row - 1, thisId - row, thisId + row, thisId + row - 1];
            } else {
                aroundLei = [thisId - 1, thisId + 1, thisId - row, thisId + row, thisId - row - 1, thisId - row + 1, thisId + row - 1, thisId + row + 1];
            }
            for (var j = 0; j < aroundLei.length; j++) {
                if (lei[aroundLei[j]] == 'lei') {
                    numAround++;
                }
            }
            if (numAround == 0) {
                window.oDiv[thisId].className = 'box1';
                map[thisId] = 1;
                aroundLei.forEach(function(ele) {
                    if (map[ele] != 1)
                        game.check(ele);
                })
            } else {
                window.oDiv[thisId].className = 'box1';
                window.oDiv[thisId].innerHTML = numAround;
                map[thisId] = 1;
            }
        }
    },
    rightClick: function() {
        document.getElementById("background").addEventListener('contextmenu', function(event) {
            event.preventDefault();
        }, false)
    },
    restart: function() {
        oButton.onclick = function() {
            location.reload();
        }
    },
}
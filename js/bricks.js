function instruction() {
    Swal.fire(
        'Instructions',
        'Press SPACEBAR to start the game, for moving paddle use ← and → key. The goal is to get the most points you can.',
        'info'
    )
}
var sweat = true;
function drawIt() {
    if(sweat){
        instruction();
    }
    sweat = false;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var points = document.getElementById('points');
    var lives = document.getElementById('life');
    var konec = document.getElementById('konec');
    var restart = document.getElementById('refresh');
    var notranji = document.getElementById('notranji');
    var zunanji = document.getElementById('zunanji');
    var gumbi = document.getElementById('gumbi');
    var tocke = 0;
    var start = true;
    //ploscek
    var right = false;
    var left = false;
    var sirina = 100;
    var visina = 15;
    var x2 = width / 2 - sirina / 2;
    var dx2 = 6;
    //zoga
    var r = 10;
    var x = 450;
    var y = 870;
    var dx = 0;
    var dy = -4;
    //opeke
    var vrsta = 4;
    var stolpec = 14;
    var padding = 5;
    var brickHeight = 25;
    var brickhWidth = width / stolpec + padding;
    var bricks = new Array(vrsta);
    var i;
    var j;
    for (i = 0; i < vrsta; i++) {
        bricks[i] = new Array(stolpec);
        for (j = 0; j < stolpec; j++) {
            if (i == 0) {
                bricks[i][j] = 4;
            }
            else if (i == 1) {
                bricks[i][j] = 3;
            }
            else if (i == 2) {
                bricks[i][j] = 2;
            }
            else if (i == 3) {
                bricks[i][j] = 1;
            }
        }
    }
    var rowheight = brickHeight + padding * 2;
    var colwidth = brickhWidth + padding;
    //reset
    this.reset = function () {
        tocke = 0;
        life = 3;
        konec.style.display = 'none';
        restart.style.display = 'none';
        notranji.style.display = 'block';
        for (i = 0; i < vrsta; i++) {
            bricks[i] = new Array(stolpec);
            for (j = 0; j < stolpec; j++) {
                if (i == 0) {
                    bricks[i][j] = 4;
                }
                else if (i == 1) {
                    bricks[i][j] = 3;
                }
                else if (i == 2) {
                    bricks[i][j] = 2;
                }
                else if (i == 3) {
                    bricks[i][j] = 1;
                }
            }
        }
    }

    //zivljenja
    var life = 3;
    //cas
    var sekundeI;
    var minuteI;
    var sekunde = 0;
    var izpisTimer = "00:00";
    var intervalTimer;
    var time = false;
    function timer() {
        if (time) {
            sekunde++;
            sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
            minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
            izpisTimer = minuteI + ":" + sekundeI;
        }
        
    }

    localStorage.setItem("time", izpisTimer);
    localStorage.setItem("score", 0);

    function draw() {
        if (life == 0) {
            time = false;
            clearInterval(intervalTimer);
            clearInterval(refreshInterval);
            konec.style.display = 'block';
            restart.style.display = 'block';
            notranji.style.display = 'none';
            //local storage
            if (localStorage.getItem("tocke") < tocke) {
                localStorage.setItem("tocke", tocke);
                localStorage.setItem("time", izpisTimer);
                Swal.fire(
                    'Good job!',
                    'You set your new best score of: ' +localStorage.getItem("tocke")+' points in '+localStorage.getItem("time"),
                    'success'
                  )
            }
            else{
                Swal.fire(
                    'Better luck next time!',
                    'You didnt beat your best score.',
                    'error'
                  )
            }
        }
        else {
            //zoga
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            //ploscek
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.beginPath();
            ctx.rect(x2, height - visina, sirina, visina);
            ctx.closePath();
            ctx.fill();
            //opeke
            for (i = 0; i < bricks.length; i++) {
                for (j = 0; j < bricks[i].length - 2; j++) {
                    if (bricks[i][j] == 1) {
                        ctx.fillStyle = "rgb(0,0,0,.3)";
                        ctx.beginPath();
                        ctx.rect(j * (brickhWidth + padding) + padding, i * (brickHeight + padding) + padding, brickhWidth, brickHeight);
                        ctx.closePath();
                        ctx.fill();
                    }
                    else if(bricks[i][j] == 2){
                        ctx.fillStyle = "rgb(0,0,0,.5)";
                        ctx.beginPath();
                        ctx.rect(j * (brickhWidth + padding) + padding, i * (brickHeight + padding) + padding, brickhWidth, brickHeight);
                        ctx.closePath();
                        ctx.fill();
                    }
                    else if(bricks[i][j] == 3){
                        ctx.fillStyle = "rgb(0,0,0,.7)";
                        ctx.beginPath();
                        ctx.rect(j * (brickhWidth + padding) + padding, i * (brickHeight + padding) + padding, brickhWidth, brickHeight);
                        ctx.closePath();
                        ctx.fill();
                    }
                    else if(bricks[i][j] == 4){
                        ctx.fillStyle = "rgb(0,0,0,1)";
                        ctx.beginPath();
                        ctx.rect(j * (brickhWidth + padding) + padding, i * (brickHeight + padding) + padding, brickhWidth, brickHeight);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
            //odboj-roba
            if (y <= 0 + r)
                dy = dy * (-1);
            else if (x >= width - r || x <= 0 + r)
                dx = dx * (-1);
            else if (y > height - r) {
                life--;
                dy = dy * (-1);
            }

            lives.innerHTML = "LIFE: " + life;
            points.innerHTML = "POINTS: " + tocke;
            //tipkovnica
            document.addEventListener('keydown', function (event) {
                if (event.keyCode == 37) {
                    left = true;
                }
                else if (event.keyCode == 39) {
                    right = true;
                }
                else if (event.keyCode == 32 && start) {
                    start = false;
                }
            });
            document.addEventListener('keyup', function (event) {
                if (event.keyCode == 37)
                    left = false;
                else if (event.keyCode == 39)
                    right = false;
            });
            if (right && x2 < width - sirina)
                x2 = x2 + dx2;
            else if (left && x2 > 0)
                x2 = x2 - dx2;
            //odboj-ploščka
            if (x >= x2 && x <= x2 + sirina && y >= height - visina - r && y < height) {
                dx = 8 * ((x - (x2 + sirina / 2)) / sirina);
                dy = dy * -1;
            }
            //odboj-opeke
            i = Math.floor(y / rowheight);
            j = Math.floor(x / colwidth);
            if (y <= vrsta * rowheight && i >= 0 && j >= 0 && bricks[i][j] > 0) {
                dy = -dy;
                if(bricks[i][j] == 1){
                    tocke = tocke + 20;
                }
                else if(bricks[i][j] == 2){
                    tocke = tocke + 50;
                }
                else if(bricks[i][j] == 3){
                    tocke = tocke + 100;
                }
                else if(bricks[i][j] == 4){
                    tocke = tocke + 200;
                }
                bricks[i][j] = bricks[i][j] - 1;
            }
        }
        if (start) {

        }
        else {
            time = true;
            x += dx;
            y += dy;
        }
    }
    intervalTimer = setInterval(timer, 1000);
    refreshInterval = setInterval(draw, 10);
}



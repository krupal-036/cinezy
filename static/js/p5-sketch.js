let stars = [];
let speed = 0;
let targetSpeed = 3.5;
let bgColor, starColor, lineColor;

function setColors(theme) {
    if (theme === 'light-mode') {
        bgColor = color(246, 248, 250);
        starColor = color(36, 41, 47);
        lineColor = color(36, 41, 47, 50);
    } else {
        bgColor = color(13, 17, 23);
        starColor = color(201, 209, 217);
        lineColor = color(201, 209, 217, 50);
    }
}

function setup() {
    let canvasContainer = document.getElementById('p5-canvas-container');
    let canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    canvas.parent('p5-canvas-container');

    const initialTheme = document.body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
    setColors(initialTheme);
    document.addEventListener('themeChanged', (e) => setColors(e.detail.theme));

    for (let i = 0; i < 800; i++) {
        stars.push(new Star());
    }
}

function draw() {
    targetSpeed = map(mouseX, 0, width, 0.5, 15);
    speed = lerp(speed, targetSpeed, 0.05);

    background(bgColor);
    translate(width / 2, height / 2);

    for (let star of stars) {
        star.update(speed);
        star.show();
    }
}

function windowResized() {
    let container = document.getElementById('p5-canvas-container');
    resizeCanvas(container.offsetWidth, container.offsetHeight);

    stars = [];
    for (let i = 0; i < 800; i++) {
        stars.push(new Star());
    }
}

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);
        this.pz = this.z;
        this.alpha = random(150, 255);
    }

    update(speed) {
        this.z -= speed;
        if (this.z < 1) {
            this.reset();
            this.z = width;
            this.pz = this.z;
        }
    }

    show() {
        const sx = map(this.x / this.z, 0, 1, 0, width);
        const sy = map(this.y / this.z, 0, 1, 0, height);
        const r = map(this.z, 0, width, 6, 0.5);

        let twinkle = sin(frameCount * 0.1 + this.z) * 50 + 205;
        fill(red(starColor), green(starColor), blue(starColor), twinkle);
        noStroke();
        ellipse(sx, sy, r, r);

        const px = map(this.x / this.pz, 0, 1, 0, width);
        const py = map(this.y / this.pz, 0, 1, 0, height);
        this.pz = this.z;

        stroke(lineColor);
        line(px, py, sx, sy);
    }
}
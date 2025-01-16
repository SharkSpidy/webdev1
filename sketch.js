let particles = [];
let speedSlider, sizeSlider, colorPicker;
let bgColor = '#111';

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    // Get UI elements
    speedSlider = select('#speed');
    sizeSlider = select('#size');
    colorPicker = select('#color');
    
    // Set button actions
    select('#saveBtn').mousePressed(saveCanvas);
    select('#clearBtn').mousePressed(clearCanvas);
}

function draw() {
    background(bgColor);
    let speed = speedSlider.value();
    let size = sizeSlider.value();
    let particleColor = colorPicker.value();
    
    // Create new particle at mouse position
    if (mouseIsPressed) {
        particles.push(new Particle(mouseX, mouseY, speed, size, particleColor));
    }
    
    // Update and display particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].isOffScreen()) {
            particles.splice(i, 1);
        }
    }
}

// Particle class
class Particle {
    constructor(x, y, speed, size, color) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(speed);
        this.size = size;
        this.color = color;
    }
    
    update() {
        this.pos.add(this.vel);
    }
    
    display() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
    
    isOffScreen() {
        return this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height;
    }
}

function saveCanvas() {
    save('particles.png');
}

function clearCanvas() {
    particles = [];
}

"use strict";
class DrawingApp {
    constructor(canvas) {
        this.isDrawing = false;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d'); // Change here
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.canvas.addEventListener('mousedown', (event) => this.startDrawing(event));
        this.canvas.addEventListener('mousemove', (event) => this.draw(event));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
    }
    startDrawing(event) {
        try {
            if (!this.ctx) {
                throw new Error('Canvas context is not available');
            }
            this.isDrawing = true;
            this.draw(event);
        }
        catch (error) { 
            console.error('Error:', error.message); 
            
        }
    }
    draw(event) {
        if (!this.isDrawing)
            return;
        const x = event.offsetX;
        const y = event.offsetY;
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#000';
        if (event.buttons === 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
    stopDrawing() {
        this.isDrawing = false;
    }
}
window.onload = () => {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    new DrawingApp(canvas);
};

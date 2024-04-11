class DrawingApp {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D; // Change here
    isDrawing: boolean = false;
  
    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D; 
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      this.canvas.addEventListener('mousedown', (event) => this.startDrawing(event));
      this.canvas.addEventListener('mousemove', (event) => this.draw(event));
      this.canvas.addEventListener('mouseup', () => this.stopDrawing());
      this.canvas.addEventListener('mouseout', () => this.stopDrawing());
    }
  
    startDrawing(event: MouseEvent) {
        try {
            if (!this.ctx) {
                throw new Error('Canvas context is not available');
            }
            this.isDrawing = true;
            this.draw(event);
        } catch (error: any) { // Specify type of error as 'any' or 'unknown'
            console.error('Error:', (error as Error).message); // Type assertion to Error
            //handle error here, shows a message to the user
        }
    }
  
    draw(event: MouseEvent) {
      if (!this.isDrawing) return;
  
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
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    new DrawingApp(canvas);
  };
  
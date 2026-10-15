import Konva from 'konva';

// first we need to create a stage
const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

// then create layer
const layer = new Konva.Layer();
stage.add(layer);

// create our shape
const lemon = new Konva.Shape({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true,
  sceneFunc: (context, shape) => {
    // Relative coordinates centered at (0, 0)
    const halfWidth = 90;
    const halfHeight = 60;

    context.beginPath();

    // Start at the left pointed tip
    context.moveTo(-halfWidth, 0);

    // Top curve to the right tip
    context.bezierCurveTo(
      -halfWidth * 0.45, -halfHeight, 
       halfWidth * 0.45, -halfHeight, 
       halfWidth, 0
    );

    // Bottom curve back to the left tip
    context.bezierCurveTo(
       halfWidth * 0.45,  halfHeight, 
      -halfWidth * 0.45,  halfHeight, 
      -halfWidth, 0
    );

    context.closePath();

    // Konva-specific method to apply fill and stroke
    context.fillStrokeShape(shape);
  }
});

lemon.rotation(-20); // Tilts the lemon 20 degrees counterclockwise

lemon.on('mouseover', () => {
  stage.container().style.cursor = 'pointer';
});

lemon.on('mouseout', () => {
  stage.container().style.cursor = 'default';
});

lemon.on('pointerdown', () => {
  lemon.to({
    scaleX: 1.2,
    scaleY: 1.2,
    duration: 0.1,
  });
});

const shrink = () => {
  lemon.to({
    scaleX: 1,
    scaleY: 1,
    duration: 0.1,
  });
};

lemon.on('pointerup', shrink);
lemon.on('dragend', shrink);
window.addEventListener('pointerup', shrink);
// add the shape to the layer
layer.add(lemon);

// add the layer to the stage
stage.add(layer);

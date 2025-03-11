<template>
  <canvas ref="canvasRef" class="w-full h-full border-none block"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  direction: {
    type: String,
    default: 'right'
  },
  speed: {
    type: Number,
    default: 1
  },
  borderColor: {
    type: String,
    default: '#999'
  },
  squareSize: {
    type: Number,
    default: 40
  },
  hoverFillColor: {
    type: String,
    default: '#222'
  }
});

const canvasRef = ref(null);
let requestId = null;
let numSquaresX = 0;
let numSquaresY = 0;
let gridOffset = { x: 0, y: 0 };
let hoveredSquare = null;

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  numSquaresX = Math.ceil(canvas.width / props.squareSize) + 1;
  numSquaresY = Math.ceil(canvas.height / props.squareSize) + 1;
};

const drawGrid = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const startX = Math.floor(gridOffset.x / props.squareSize) * props.squareSize;
  const startY = Math.floor(gridOffset.y / props.squareSize) * props.squareSize;

  for (let x = startX; x < canvas.width + props.squareSize; x += props.squareSize) {
    for (let y = startY; y < canvas.height + props.squareSize; y += props.squareSize) {
      const squareX = x - (gridOffset.x % props.squareSize);
      const squareY = y - (gridOffset.y % props.squareSize);

      if (
        hoveredSquare &&
        Math.floor((x - startX) / props.squareSize) === hoveredSquare.x &&
        Math.floor((y - startY) / props.squareSize) === hoveredSquare.y
      ) {
        ctx.fillStyle = props.hoverFillColor;
        ctx.fillRect(squareX, squareY, props.squareSize, props.squareSize);
      }

      ctx.strokeStyle = props.borderColor;
      ctx.strokeRect(squareX, squareY, props.squareSize, props.squareSize);
    }
  }

  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
  );
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, '#060606');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const updateAnimation = () => {
  const effectiveSpeed = Math.max(props.speed, 0.1);
  
  switch (props.direction) {
    case 'right':
      gridOffset.x = (gridOffset.x - effectiveSpeed + props.squareSize) % props.squareSize;
      break;
    case 'left':
      gridOffset.x = (gridOffset.x + effectiveSpeed + props.squareSize) % props.squareSize;
      break;
    case 'up':
      gridOffset.y = (gridOffset.y + effectiveSpeed + props.squareSize) % props.squareSize;
      break;
    case 'down':
      gridOffset.y = (gridOffset.y - effectiveSpeed + props.squareSize) % props.squareSize;
      break;
    case 'diagonal':
      gridOffset.x = (gridOffset.x - effectiveSpeed + props.squareSize) % props.squareSize;
      gridOffset.y = (gridOffset.y - effectiveSpeed + props.squareSize) % props.squareSize;
      break;
  }

  drawGrid();
  requestId = requestAnimationFrame(updateAnimation);
};

const handleMouseMove = (event) => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const startX = Math.floor(gridOffset.x / props.squareSize) * props.squareSize;
  const startY = Math.floor(gridOffset.y / props.squareSize) * props.squareSize;

  const hoveredSquareX = Math.floor((mouseX + gridOffset.x - startX) / props.squareSize);
  const hoveredSquareY = Math.floor((mouseY + gridOffset.y - startY) / props.squareSize);

  if (
    !hoveredSquare ||
    hoveredSquare.x !== hoveredSquareX ||
    hoveredSquare.y !== hoveredSquareY
  ) {
    hoveredSquare = { x: hoveredSquareX, y: hoveredSquareY };
  }
};

const handleMouseLeave = () => {
  hoveredSquare = null;
};

// 监听属性变化
watch(() => props.direction, drawGrid);
watch(() => props.speed, drawGrid);
watch(() => props.borderColor, drawGrid);
watch(() => props.hoverFillColor, drawGrid);
watch(() => props.squareSize, () => {
  resizeCanvas();
  drawGrid();
});

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  window.addEventListener('resize', resizeCanvas);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);

  resizeCanvas();
  requestId = requestAnimationFrame(updateAnimation);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas);
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
  }
  if (requestId) {
    cancelAnimationFrame(requestId);
  }
});
</script>

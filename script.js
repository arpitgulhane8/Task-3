function drawWalls() {
  const numWalls = parseInt(document.getElementById('numWalls').value);
  const heightsInput = document.getElementById('wallHeights').value;
  const wallsContainer = document.getElementById('wallsContainer');
  const visibleLeft = document.getElementById('visibleLeft');
  const visibleRight = document.getElementById('visibleRight');

  if (isNaN(numWalls) || numWalls <= 0) {
    alert('Please enter a valid number of walls.');
    return;
  }

  const heights = heightsInput.split('#').map(Number);

  if (heights.length !== numWalls || heights.some(h => isNaN(h) || h < 0)) {
    alert('Please enter correct number of heights separated by #.');
    return;
  }

  wallsContainer.innerHTML = '';

  const maxHeight = Math.max(...heights);

  heights.forEach(height => {
    const wallContainer = document.createElement('div');
    wallContainer.className = 'wall-container';

    const wall = document.createElement('div');
    wall.className = 'wall';
    wall.style.height = (height / maxHeight) * 200 + 'px'; // scale height
    wall.innerText = height;

    const label = document.createElement('div');
    label.className = 'height-label';
    label.innerText = height;

    wallContainer.appendChild(wall);
    wallContainer.appendChild(label);
    wallsContainer.appendChild(wallContainer);
  });

  // Visibility calculation
  let visibleFromLeft = 0;
  let maxLeft = -1;
  for (let h of heights) {
    if (h > maxLeft) {
      visibleFromLeft++;
      maxLeft = h;
    }
  }

  let visibleFromRight = 0;
  let maxRight = -1;
  for (let i = heights.length - 1; i >= 0; i--) {
    if (heights[i] > maxRight) {
      visibleFromRight++;
      maxRight = heights[i];
    }
  }

  visibleLeft.innerText = visibleFromLeft;
  visibleRight.innerText = visibleFromRight;
}

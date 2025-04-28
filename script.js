function drawWalls() {

  const numWalls = parseInt(document.getElementById('numWalls').value);

  const heightsInput = document.getElementById('wallHeights').value;

  const wallsContainer = document.getElementById('wallsContainer');

  const visibleLeftText = document.getElementById('visibleLeft');

  const visibleRightText = document.getElementById('visibleRight');

  if (isNaN(numWalls) || numWalls <= 0) {

    alert('Please enter a valid number of walls.');

    return;

  }

  const heights = heightsInput.split('#').map(Number);

  if (heights.length !== numWalls || heights.some(h => isNaN(h) || h < 0)) {

    alert('Please enter correct number of heights (positive integers) separated by #.');

    return;

  }

  // Clear previous walls

  wallsContainer.innerHTML = '';

  // Find maximum height for scaling

  const maxHeight = Math.max(...heights);

  // Draw the walls

  heights.forEach(height => {

    const wall = document.createElement('div');

    wall.className = 'wall';

    wall.style.height = (height / maxHeight) * 100 + '%';

    wall.innerText = height;

    wallsContainer.appendChild(wall);

  });

  // Calculate visibility

  let visibleFromLeft = 0;

  let highestLeft = -1;

  for (let h of heights) {

    if (h > highestLeft) {

      visibleFromLeft++;

      highestLeft = h;

    }

  }

  let visibleFromRight = 0;

  let highestRight = -1;

  for (let i = heights.length - 1; i >= 0; i--) {

    if (heights[i] > highestRight) {

      visibleFromRight++;

      highestRight = heights[i];

    }

  }

  visibleLeftText.innerText = `Walls visible from Left: ${visibleFromLeft}`;

  visibleRightText.innerText = `Walls visible from Right: ${visibleFromRight}`;

}

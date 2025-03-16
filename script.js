// Get the container element (where the cubes are) and all cubes
const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

// Variables to track which cube is being dragged and its offset
let selectedCube = null; // The cube the user is dragging
let offsetX = 0; // How far from the left edge of the cube the user clicked
let offsetY = 0; // How far from the top edge of the cube the user clicked

// Add event listeners to each cube
cubes.forEach(cube => {
    // When the user presses the mouse down on a cube
    cube.addEventListener("mousedown", (event) => {
        selectedCube = event.target; // Mark this cube as the one being dragged
        offsetX = event.offsetX; // Get where the user clicked inside the cube (X)
        offsetY = event.offsetY; // Get where the user clicked inside the cube (Y)

        // Change the cursor to show the cube is being dragged
        selectedCube.style.cursor = "grabbing";

        // Start listening for movement and releasing the mouse
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
    });
});

// This function moves the cube as the mouse moves
function onDrag(event) {
    if (!selectedCube) return; // If no cube is being dragged, do nothing

    // Calculate the new position of the cube based on the mouse's position
    let newX = event.clientX - container.offsetLeft - offsetX;
    let newY = event.clientY - container.offsetTop - offsetY;

    // Keep the cube inside the container boundaries
    const containerRect = container.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();

    if (newX < 0) newX = 0; // Prevent moving too far left
    if (newY < 0) newY = 0; // Prevent moving too far up
    if (newX + cubeRect.width > containerRect.width) {
        newX = containerRect.width - cubeRect.width; // Prevent moving too far right
    }
    if (newY + cubeRect.height > containerRect.height) {
        newY = containerRect.height - cubeRect.height; // Prevent moving too far down
    }

    // Apply the new position to the cube
    selectedCube.style.left = `${newX}px`;
    selectedCube.style.top = `${newY}px`;
}

// This function stops the dragging when the mouse is released
function stopDrag() {
    if (selectedCube) {
        selectedCube.style.cursor = "grab"; // Change the cursor back to default
    }
    selectedCube = null; // Clear the selected cube (no longer dragging)

    // Stop listening for mouse movements and releasing
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
}

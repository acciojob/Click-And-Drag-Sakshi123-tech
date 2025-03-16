// Your code here.const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");
let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
    cube.addEventListener("mousedown", (event) => {
        selectedCube = event.target;
        offsetX = event.offsetX;
        offsetY = event.offsetY;
        selectedCube.style.cursor = "grabbing";

        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
    });
});

function onDrag(event) {
    if (!selectedCube) return;

    // Calculate new position
    let newX = event.clientX - container.offsetLeft - offsetX;
    let newY = event.clientY - container.offsetTop - offsetY;

    // Constrain within container boundaries
    const containerRect = container.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + cubeRect.width > containerRect.width) {
        newX = containerRect.width - cubeRect.width;
    }
    if (newY + cubeRect.height > containerRect.height) {
        newY = containerRect.height - cubeRect.height;
    }

    // Apply new position
    selectedCube.style.left = `${newX}px`;
    selectedCube.style.top = `${newY}px`;
}

function stopDrag() {
    if (selectedCube) {
        selectedCube.style.cursor = "grab";
    }
    selectedCube = null;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
}


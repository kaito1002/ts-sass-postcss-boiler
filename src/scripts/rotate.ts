const targetClassName = "js-rotate";
const targetElements = document.getElementsByClassName(targetClassName);
let degree = 0

function rotate() {
    degree = degree + 6;
    degree = degree % 360;

    Array.from(targetElements).forEach(element => {
        if ((0 <= degree && degree < 90) || (270 <= degree && degree < 360)) {
            element.classList.add(`${targetClassName}--face`);
            element.classList.remove(`${targetClassName}--back`);
        } else {
            element.classList.add(`${targetClassName}--back`);
            element.classList.remove(`${targetClassName}--face`);
        }
        element.setAttribute("style", `transform:rotateX(${degree}deg)`);
    });
}

setInterval(rotate, 20);

function random(min, max) {
    return String(Math.floor(Math.random() * (max - min + 1)) + min)
}
function scale() {
    return String(Math.random()).slice(0,4)
}

function scale_y_random(min, max) {
    return String(Math.random() * (max - min + 1) + min).slice(0, 6)
}


function automove(count) {
    var text = "@keyframes move1 {"
    var scale_y = 0
    var index = 1
    while (index <= count) {
        if (index == 1) {
            text += `0% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
        } else {
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
            scale_y = scale_y + Number(scale_y_random(0, 5))
            text += `${scale_y}% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }}\n\n`
            scale_y = 0
            text += `.top:nth-child(${index}) {animation-name: move${index}; }.top:nth-child(${index})::before {animation-duration: ${index + 2}s; }.top:nth-child(${index})::after {animation-duration: ${index + 2}s, ${random(1000, 9000)}ms;animation-delay: 0ms, ${random(1000, 4000)}ms; }\n\n`
            text += `@keyframes move${index + 1} { 0% {transform: translateX(${random(-40, 40)}vw) translateY(${random(-40, 40)}vh) scale(${scale()}); }\n`
        }
        index++
    }
    require("fs").writeFileSync("./style.txt", text)
}

automove(9)
const express = require("express")
const point = express.Router();
const fs = require('fs');

point.get('/', async (req, res) => {
    return res.sendFile(__dirname + '/main/index.html')
})
point.get('/img', async (req, res) => {
    return res.sendFile(__dirname + "/main/src/" + req.query.img)
})
point.get('/allimgs', async (req, res) => {
    return res.send(JSON.stringify(fs.readdirSync(__dirname + "/main/src/").filter((name) => name.includes("Thena"))))
})
point.get('/prompts', async (req, res) => {
    return res.send(JSON.stringify({
        Thena4228: {p: ["Interstellar", "Europa Report", "Colony", "Our Home, Starts..", "Dark Age of Space", "On the Verge of Disintegration"], bg: "/img?img=/backgrounds/QuACtv.webp"},
        Thena13237: {p: ["Hyperloop", "Time Warp", "Back to Future", "Hyperspace", "Time Machine", "Ad Astra", "Limit of Physics"], bg: "/img?img=/backgrounds/4ht7092.jpg" },
        Thena28174: {p: ["Humanoid", "Teslabot", "New Era: AI", "De-Primitiveization", "Interhuman", "Algorithmic Adversarialism Fallacy"], bg: "/img?img=/backgrounds/Quf3yQ.png"},
        Thena31339: {p: ["Last Mutation", "Chronotoxicology", "The Infectious Plague", "Bloody Fear", "Annihilation", "Downfall of Many Man"], bg: "/img?img=/backgrounds/QufG8A.webp" },
        Thena115836: {p : ["Heavenly Descent", "The Skyfall", "Beverage of Immortality", "Ancient Life Core", "Chronomorph"], bg: "/img?img=/backgrounds/QuMPwU.webp" },
        Thena119581: {p: ["Roses", "Goddes of Beautiy", "Pure Feelings", "Aesthella", "Luminique", "Numinelle the Serene"], bg: "/img?img=/backgrounds/QuMXK0.webp"},
        Thena210890: {p: ["Bellatrix", "Militara", "Aurora the Divine Beauty", "Bellissa the Goddess", "The Fallen"], bg: "/img?img=/backgrounds/QuZcRf.webp"},
        Thena249094: {p: ["Melancholify", "Fallenlore", "Starstrek", "War is Coming", "Last War", "Crumbled"], bg: "/img?img=/backgrounds/QuZ3vv.webp"},
        Thena421921: {p: ["Dust", "De-Oldify", "Back to Past", "Charpon", "A peaceful Beginning", "Crumble"], bg: "/img?img=/backgrounds/QubsXM.webp"},
        Thena430384: {p: ["Microworlds", "Tinify", "The Pocket", "Isometrical Harmonia", "The Home, Ours.."], bg: "/img?img=/backgrounds/Qubeef.webp"},
        Thena280419: {p: ["Nature", "Hush", "The Armonia of Green", "Revival", "Recovery of Fallen Kingdom"], bg: "/img?img=/backgrounds/QxoJkx.webp"},
        Thena159797: {p: ["Alone", "Puretiy", "Liberty", "Lost Feelings", "Peaceful Confusion"], bg: "/img?img=/backgrounds/QudiJ0.webp"},
        Thena286925: {p: ["Hopes", "Life, Thoughts, Happiness", "Serotonin", "The Key"], bg: "/img?img=backgrounds/QxkOsq.webp"},
        Thena463824: {p: ["A Cup of Annihilation", "The Fear", "Incarcerated Fear", "Extinction", "End of Existence"], bg: "/img?img=/backgrounds/Qub4Zc.webp"}
    }))
})
module.exports = point

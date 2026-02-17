const qualityTags = [
    "masterpiece", "best quality", "ultra detailed", "high quality", "8k", "4k", "UHD", "16k",
    "high resolution", "absurdres", "sharp focus", "hyper-detailed", "insane details",
    "highly detailed", "intricate details", "top quality", "professional", "award winning",
    "detailed background", "perfect composition", "extremely detailed", "crisp quality",
    "RAW photo", "grain", "hyper-realistic", "photorealistic", "super-resolution",
    "perfect lighting", "perfect shading", "vivid", "sharp details", "finely detailed"
];

const lightingTags = [
    "cinematic lighting", "studio lighting", "volumetric lighting", "soft lighting",
    "hard lighting", "rim lighting", "backlighting", "bioluminescence", "god rays",
    "sun rays", "ray tracing", "global illumination", "ambient occlusion", "neon lights",
    "glow", "shimmering", "lens flare", "natural light", "golden hour", "blue hour",
    "dark lighting", "moody lighting", "soft glow", "firelight", "candlelight", "rembrandt lighting",
    "chiaroscuro", "dynamic lighting", "dramatic lighting", "cinematic atmosphere",
    "foggy", "misty", "haze", "atmospheric perspective", "bloom", "light leaks",
    "godrays", "tyndall effect", "caustics", "subsurface scattering", "iridescence",
    "diffuse lighting", "specular lighting", "bounce light", "fill light", "key light",
    "neon glow", "cyberpunk lighting", "ethereal lighting", "mystical glow", "twilight"
];

const cameraTags = [
    "wide angle", "ultra wide angle", "telephoto", "macro lens", "fisheye lens",
    "bokeh", "depth of field", "shallow depth of field", "motion blur", "long exposure",
    "tilt-shift", "drone view", "aerial view", "top down view", "satellite view",
    "pov", "close up", "portrait", "full body", "medium shot", "establishing shot",
    "cinematic shot", "f/1.8", "f/2.8", "f/8", "f/16", "35mm", "50mm", "85mm", "100mm", "200mm",
    "IMAX", "GoPro", "CCTV", "thermal imaging", "night vision", "dutch angle",
    "low angle", "high angle", "worm's eye view", "bird's eye view", "isometric",
    "shot on cine lens", "shot on 70mm", "anamorphic lens", "film grain", "vintage film",
    "Kodak Portra 400", "Fujifilm Velvia", "Polaroid", "Instax", "vignette",
    "chromatic aberration", "double exposure", "long shutter", "fast shutter",
    "action shot", "dynamic pose", "looking at viewer", "looking away", "profile shot"
];

const styleTags = [
    "cyberpunk", "steampunk", "vaporwave", "synthwave", "retrowave", "biopunk",
    "dieselpunk", "atompunk", "solarpunk", "lunarpunk", "clockpunk", "stonepunk",
    "gothic", "noir", "neo-noir", "fantasy", "dark fantasy", "high fantasy",
    "sci-fi", "futuristic", "retro", "vintage", "pixel art", "low poly", "voxel art",
    "minimalist", "abstract", "surrealism", "impressionism", "expressionism", "realism",
    "pop art", "oil painting", "watercolor", "ink sketch", "pencil sketch", "charcoal drawing",
    "digital art", "concept art", "matte painting", "vector art", "comic style",
    "manga style", "anime style", "ukiyo-e", "art nouveau", "art deco", "baroque",
    "rococo", "bauhaus", "brutalism", "psychedelic", "cubism", "fauvism", "pointillism",
    "dadaism", "constructivism", "de Stijl", "glitch art", "datamosh", "halftone",
    "collage", "mosaic", "stained glass", "graffiti", "street art", "sticker art",
    "papercraft", "origami", "claymation", "stop motion", "blueprint", "diagram",
    "schematic", "technical drawing", "architectural rendering", "fashion illustration"
];

const engineTags = [
    "unreal engine 5", "unreal engine", "octane render", "redshift render", "v-ray",
    "corona render", "arnold render", "blender", "cycles render", "zbrush", "maya",
    "unity engine", "cryengine", "substance painter", "cgsociety", "artstation",
    "deviantart", "behance", "pixiv", "midjourney style", "stable diffusion style",
    "3d render", "physically based rendering", "PBR", "raytraced", "path traced"
];

const colorTags = [
    "vivid colors", "vibrant", "pastel colors", "muted colors", "monochrome",
    "black and white", "sepia", "neon palette", "warm tones", "cool tones",
    "high contrast", "low contrast", "saturation", "desaturated", "colorful",
    "rainbow", "gradient", "technicolor", "iridescent", "gold and black",
    "teal and orange", "cyan and magenta", "red and black", "complementary colors",
    "split complementary", "analogous colors", "triadic colors", "tetradic colors",
    "polychromatic", "achromatic", "earth tones", "jewel tones", "metallic colors"
];

const materialTags = [
    "metallic", "chrome", "gold", "silver", "bronze", "copper", "rusty", "wooden",
    "marble", "glass", "transparent", "translucent", "liquid", "water", "ice",
    "fire", "smoke", "clouds", "fabric", "silk", "leather", "denim", "latex",
    "plastic", "ceramic", "porcelain", "organic", "flesh", "fur", "feathers",
    "scales", "glossy", "matte", "rough", "smooth", "gritty", "carbon fiber",
    "velvet", "satin", "linen", "wool", "nylon", "rubber", "concrete", "brick",
    "stone", "sand", "dirt", "mud", "moss", "slime", "goo", "crystal", "gemstone",
    "diamond", "ruby", "emerald", "sapphire", "pearl", "obsidian", "ivory"
];

const environmentTags = [
    "dystopian", "post-apocalyptic", "utopian", "cyber city", "space", "galaxy",
    "nebula", "planet", "stars", "forest", "jungle", "desert", "ocean", "sea",
    "underwater", "mountain", "snowy", "rainy", "stormy", "cloudy", "sunny",
    "foggy", "misty", "ruins", "castle", "temple", "skyscraper", "laboratory",
    "factory", "library", "bedroom", "living room", "street", "alleyway", "abandoned",
    "overgrown", "ancient city", "futuristic city", "space station", "spaceship interior",
    "cockpit", "dungeon", "cave", "volcano", "waterfall", "canyon", "cliff",
    "beach", "island", "swamp", "marsh", "meadow", "field", "garden", "park",
    "stadium", "arena", "theater", "cinema", "bar", "pub", "cafe", "restaurant"
];

const characterTags = [
    "robot", "cyborg", "mecha", "android", "monster", "dragon", "demon",
    "angel", "fairy", "elf", "alien", "samurai", "ninja", "knight", "wizard",
    "witch", "vampire", "zombie", "astronaut", "pilot", "detective", "assassin",
    "goddess", "warrior", "princess", "ghost", "skeleton", "mermaid", "centaur",
    "minotaur", "golem", "spirit", "soul", "necromancer", "paladin", "rogue",
    "bard", "druid", "cleric", "monk", "barbarian", "sorcerer", "warlock"
];

const anatomyTags = [
    "detailed eyes", "beautiful eyes", "glowing eyes", "red eyes", "blue eyes",
    "green eyes", "heterochromia", "purple eyes", "golden eyes", "detailed face",
    "beautiful face", "perfect face", "symmetrical face", "makeup", "lipstick",
    "eyeshadow", "eyeliner", "mascara", "blush", "tattoos", "scars", "freckles",
    "mole", "long hair", "short hair", "messy hair", "straight hair", "curly hair",
    "wavy hair", "ponytail", "twintails", "braids", "bun", "bald", "blonde hair",
    "black hair", "brown hair", "red hair", "white hair", "silver hair", "blue hair",
    "pink hair", "multicolored hair", "gradient hair", "ahoge", "muscular", "skinny",
    "chubby", "curvy", "tall", "short", "pale skin", "tan skin", "dark skin"
];

const fashionTags = [
    "hoodie", "t-shirt", "suit", "tuxedo", "dress", "gown", "skirt", "jeans",
    "shorts", "bikini", "swimsuit", "lingerie", "armor", "power armor", "helmet",
    "mask", "cloak", "cape", "robe", "uniform", "school uniform", "military uniform",
    "cybernetic implants", "glasses", "sunglasses", "jewelry", "necklace", "earrings",
    "sneakers", "boots", "high heels", "stockings", "gloves", "streetwear", "techwear",
    "cyberwear", "steampunk attire", "gothic lolita", "victorian fashion", "kimono",
    "yukata", "hanfu", "cheongsam", "sari", "hijab", "turban", "scarf", "tie",
    "bowtie", "belt", "corset", "leggings", "tights", "socks", "bracelet", "ring"
];

const emotionTags = [
    "happy", "smiling", "laughing", "sad", "crying", "tears", "angry", "furious",
    "shouting", "screaming", "fearful", "scared", "surprised", "shocked",
    "expressionless", "stoic", "seductive", "blushing", "nervous", "confident",
    "smirk", "closed eyes", "winking", "pout", "yawning", "sleeping", "tired",
    "bored", "excited", "energetic", "peaceful", "calm", "meditating", "praying",
    "thinking", "confused", "doubtful", "embarrassed", "ashamed", "proud"
];

const artistTags = [
    "greg rutkowski", "artgerm", "alphonse mucha", "zdzislaw beksinski", "h.r. giger",
    "shinkai makoto", "studio ghibli", "rossdraws", "wlop", "ilya kuvshinov",
    "krenz cushart", "james jean", "junji ito", "yoji shinkawa", "frank frazetta",
    "boris vallejo", "julie bell", "michael whelan", "keith parkinson", "larry elmore",
    "clyde caldwell", "jeff easley", "tony diterlizzi", "brom", "todd lockwood",
    "donato giancola", "john avon", "magic the gathering artist", "league of legends artist",
    "blizzard concept art", "riot games concept art", "makoto shinkai", "hayao miyazaki",
    "akira toriyama", "katsuhiro otomo", "masamune shirow", "kentaro miura", "yusuke murata",
    "tite kubo", "eiichiro oda", "masashi kishimoto", "hirohiko araki", "takehiko inoue",
    "naoko takeuchi", "clamp", "yoshitaka amano", "tetsuya nomura", "akihiko yoshida",
    "shigenori soejima", "kazuma kaneko",
    "vincent van gogh", "leonardo da vinci", "pablo picasso", "salvador dali",
    "claude monet", "rembrandt", "michelangelo", "caravaggio", "johannes vermeer",
    "gustav klimt", "edvard munch", "frida kahlo", "georgia o'keeffe", "andy warhol",
    "jackson pollock", "piet mondrian", "wassily kandinsky", "henri matisse",
    "marc chagall", "paul cezanne", "pierre-auguste renoir", "edgar degas",
    "edouard manet", "sandor botticelli", "raphael", "titian", "peter paul rubens",
    "diego velazquez", "francisco goya", "william blake", "caspar david friedrich",
    "j.m.w. turner", "john constable", "dante gabriel rossetti", "john everett millais",
    "william morris", "aubrey beardsley", "egon schiele", "oskar kokoschka",
    "max ernst", "rene magritte", "joan miro", "marcel duchamp", "francis bacon",
    "lucian freud", "david hockney", "banksy", "basquiat", "keith haring"
];

const movieTags = [
    "wes anderson style", "quentin tarantino style", "christopher nolan style",
    "stanley kubrick style", "tim burton style", "guillermo del toro style",
    "zack snyder style", "ridley scott style", "james cameron style", "steven spielberg style",
    "george lucas style", "peter jackson style", "denis villeneuve style", "david fincher style",
    "alfred hitchcock style", "martin scorsese style", "francis ford coppola style",
    "akira kurosawa style", "hayao miyazaki style", "makoto shinkai style",
    "marvel style", "dc style", "disney style", "pixar style", "dreamworks style",
    "ghibli style", "star wars style", "cyberpunk 2077 style", "blade runner style",
    "matrix style", "lord of the rings style", "game of thrones style", "harry potter style",
    "dune style", "tron style", "mad max style", "alien style", "predator style"
];

const architectureTags = [
    "modern architecture", "brutalist architecture", "gothic architecture",
    "victorian architecture", "chinese architecture", "japanese architecture",
    "islamic architecture", "roman architecture", "greek architecture",
    "medieval architecture", "futuristic architecture", "organic architecture",
    "interior design", "exterior design", "ruined building", "skyscraper", "bridge",
    "tower", "gate", "fountain", "statue", "monument", "pyramid", "ziggurat",
    "pagoda", "torii gate", "cathedral", "church", "mosque", "synagogue", "temple",
    "palace", "mansion", "villa", "cottage", "cabin", "hut", "tent", "bunker"
];

const additionalQualityTags = [
    "HDR", "UHD", "retina display", "super detail", "hyper maximalist", 
    "unreal engine 5 render", "spatial aliasing", "anti-aliasing", "high fidelity", 
    "photorealistic texture", "visionary art", "scenic", "breathtaking", 
    "wallpaper", "poster", "cover art", "official art", "unity 8k wallpaper"
];

const additionalLightingTags = [
    "butterfly lighting", "loop lighting", "split lighting", "broad lighting", 
    "short lighting", "flat lighting", "paramount lighting", "strobe lights", 
    "crepuscular rays", "bioluminescent glow", "noir lighting", "hard shadows", 
    "soft shadows", "volumetric fog", "quantum lighting", "ethereal glow", 
    "fluorescent light", "incandescent light", "moonlight", "starlight"
];

const additionalCameraTags = [
    "Leica M6", "Hasselblad", "Phase One", "Sony A7R IV", "Canon EOS R5", 
    "Nikon Z7", "GoPro Hero", "fisheye effect", "panoramic", "telescopic lens", 
    "macro photography", "microscopic", "electron microscope", "thermal camera", 
    "polarizer filter", "ND filter", "long shot", "extreme close-up", 
    "cowboy shot", "over-the-shoulder shot", "low poly render"
];

const additionalStyleTags = [
    "cottagecore", "goblincore", "weirdcore", "dreamcore", "liminal space", 
    "dark academia", "light academia", "cyber-gothic", "tech-noir", "space western", 
    "suburban gothic", "mythpunk", "silkpunk", "mannerism", "suprematism", 
    "orphism", "rayonism", "social realism", "magical realism", "afrofuturism", 
    "retro-futurism", "cassette futurism", "transhumanism"
];

const additionalMaterialTags = [
    "chiffon", "corduroy", "flannel", "tweed", "cashmere", "lace", "mesh", 
    "spandex", "viscose", "polyester", "titanium", "platinum", "tungsten", 
    "obsidian", "emerald", "topaz", "amethyst", "quartz", "amber", "jade", 
    "coral", "seashell", "wax", "honey", "oil", "tar", "holographic"
];

const additionalEnvironmentTags = [
    "cyber slums", "floating island", "coral reef", "observatory", "lighthouse", 
    "greenhouse", "asylum", "bunker", "trench", "subway station", "train interior", 
    "bus stop", "gas station", "convenience store", "supermarket", "mall", 
    "arcade", "casino", "museum", "gallery", "crypt", "catacombs", "sewer", 
    "rooftop", "balcony", "terrace", "veranda", "treehouse", "igloo"
];

const poseTags = [
    "standing", "sitting", "kneeling", "squatting", "lying down", "jumping", 
    "running", "walking", "flying", "floating", "falling", "climbing", 
    "swimming", "fighting stance", "action pose", "t-pose", "crossed arms", 
    "hands in pockets", "looking back", "reaching out", "holding object", 
    "pointing", "dancing", "meditating", "praying", "bowing", "saluting"
];

const compositionTags = [
    "rule of thirds", "golden ratio", "centered composition", "symmetry", 
    "asymmetry", "diagonal composition", "triangular composition", "framing", 
    "leading lines", "negative space", "minimalistic composition", "cluttered", 
    "chaotic", "dynamic composition", "static composition"
];

const sfxTags = [
    "explosion", "splashing", "shattering", "disintegrating", "melting", 
    "dripping", "smoke trail", "sparkles", "glitter", "dust particles", 
    "rain drops", "snowflakes", "petals falling", "feathers floating", 
    "chromatic aberration", "scanlines", "vhs glitch", "double vision"
];

const promptDictionary = [];
const addTags = (tags, type) => {
    for (let i = 0; i < tags.length; i++) {
        promptDictionary.push({
            text: tags[i],
            lowerText: tags[i].toLowerCase(),
            type: type
        });
    }
};

addTags(qualityTags, "QUALITY");
addTags(lightingTags, "LIGHT");
addTags(cameraTags, "CAMERA");
addTags(styleTags, "STYLE");
addTags(engineTags, "ENGINE");
addTags(colorTags, "COLOR");
addTags(materialTags, "MATERIAL");
addTags(environmentTags, "ENVIRONMENT");
addTags(characterTags, "CHAR");
addTags(anatomyTags, "FACE");
addTags(fashionTags, "CLOTH");
addTags(emotionTags, "MOOD");
addTags(artistTags, "ARTIST");
addTags(movieTags, "MOVIE");
addTags(architectureTags, "ARCH");
addTags(additionalQualityTags, "QUALITY");
addTags(additionalLightingTags, "LIGHT");
addTags(additionalCameraTags, "CAMERA");
addTags(additionalStyleTags, "STYLE");
addTags(additionalMaterialTags, "MATRL");
addTags(additionalEnvironmentTags, "ENV");
addTags(poseTags, "POSE");
addTags(compositionTags, "COMPOSITION");
addTags(sfxTags, "SFX");

promptDictionary.sort((a, b) => a.text.localeCompare(b.text));

const promptInputArea = document.getElementById('prompt');
const autocompleteList = document.getElementById('autocomplete-list');
let currentFocus = -1;
let isAutocompleteEnabled = localStorage.getItem('thena-autocomplete') !== 'false';
const TAG_REGEX = /([a-zA-Z0-9_]+)$/;

autocompleteList.addEventListener('click', function(e) {
    const item = e.target.closest('.suggestion-item');
    if (item) {
        const tagText = item.dataset.tag; 
        if(tagText) insertTag(tagText);
    }
});

promptInputArea.addEventListener('input', function(e) {
    if (!isAutocompleteEnabled) {
        closeAllLists();
        return;
    }

    const val = this.value;
    const lastWordMatch = val.match(TAG_REGEX);
        
    closeAllLists();
    
    if (!lastWordMatch) return;

    const query = lastWordMatch[0].toLowerCase();
    const queryLen = query.length;

    const matches = [];
    for (let i = 0; i < promptDictionary.length; i++) {
        const item = promptDictionary[i];
        if (item.lowerText.startsWith(query)) {
            matches.push(item);
            if (matches.length >= 10) break;
        }
    }

    if (matches.length === 0) return;

    autocompleteList.classList.add('active');
    
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const itemDiv = document.createElement('div');
        itemDiv.className = 'suggestion-item';
        itemDiv.dataset.tag = match.text;

        const matchText = `<strong>${match.text.substr(0, queryLen)}</strong><i>${match.text.substr(queryLen)}</i>`;
        
        itemDiv.innerHTML = `
            <div class="suggestion-text">${matchText}</div>
            <span class="tag-badge type-${match.type.toLowerCase()}">${match.type}</span>
        `;
        
        fragment.appendChild(itemDiv);
    }
    autocompleteList.appendChild(fragment);
});

promptInputArea.addEventListener('keydown', function(e) {
    const items = autocompleteList.getElementsByClassName('suggestion-item');
    if (!autocompleteList.classList.contains('active')) return;
    
    if (e.key === 'ArrowDown') {
        currentFocus++;
        addActive(items);
        e.preventDefault();
    } else if (e.key === 'ArrowUp') {
        currentFocus--;
        addActive(items);
        e.preventDefault();
    } else if (e.key === 'Enter') {
        if (currentFocus > -1 && items.length > 0) {
            e.preventDefault(); 
            items[currentFocus].click();
        }
    } else if (e.key === 'Escape') {
        closeAllLists();
    }
});

function addActive(items) {
    if (!items || items.length === 0) return false;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (items.length - 1);
    items[currentFocus].classList.add('selected');
    
    items[currentFocus].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function removeActive(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('selected');
    }
}

function closeAllLists() {
    autocompleteList.innerHTML = '';
    autocompleteList.classList.remove('active');
    currentFocus = -1;
}

function insertTag(selectedTag) {
    const val = promptInputArea.value;
    const match = val.match(TAG_REGEX);
    if (!match) return;

    const lastIndex = val.lastIndexOf(match[0]);
    const newText = val.substring(0, lastIndex) + selectedTag;
    
    promptInputArea.value = newText;
    promptInputArea.focus();
    closeAllLists();
    
    if(localStorage) localStorage.setItem('thena-last-prompt', newText);
    if(typeof checkFormReady === 'function') checkFormReady();
}

document.addEventListener('click', function(e) {
    if (e.target !== promptInputArea && !autocompleteList.contains(e.target) && e.target !== autocompleteList) {
        closeAllLists();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const autocompleteToggle = document.getElementById('autocomplete-toggle');
    
    if (autocompleteToggle) {
        autocompleteToggle.checked = isAutocompleteEnabled;

        autocompleteToggle.addEventListener('change', (e) => {
            isAutocompleteEnabled = e.target.checked;
            localStorage.setItem('thena-autocomplete', isAutocompleteEnabled);
            
            playInformationSound();
            if (!isAutocompleteEnabled) {
                closeAllLists();
                showNotification(typeof currentLang !== 'undefined' && currentLang == "tr" ? "Autocomplete Deaktif Edildi" : "Autocomplete Disabled", "info");
            } else {
                showNotification(typeof currentLang !== 'undefined' && currentLang == "tr" ? "Autocomplete Aktif Edildi" : "Autocomplete Enabled", "info");
            }
        });
    }
});
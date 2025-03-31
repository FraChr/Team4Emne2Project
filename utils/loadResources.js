loadFromJson().then(() => {
    console.log("Finished loading Resources");
}).catch(() => {
    console.log("Error loading Resources");
});

async function loadFromJson() {
    try {
        const res = await fetch('utils/filenames.json');

        if (!res.ok) {
            console.error('Failed to load from json');
            return;
        }

        const data = await res.json();
        for (const key in data) {
            await load(key, data[key]);
        }

    } catch (err) {
        console.error(err);
    }
}

async function load(directory, files) {
    if (!isNonEmptyList(files, directory)) return;
    for (const file of files) {
        const filePath = directory === 'root'
            ? `/${file.filename}${file.ext}`
            : `/${directory}/${file.filename}${file.ext}`
        // const filePath = `${directory}/${file.filename}${file.ext}`
        await addToHead(filePath, file.type);

        console.log(`Loading from: /${directory}/${file.filename}${file.ext}`);

    }
}

async function addToHead(filePath, type) {
    let element = makeLinkOrScriptElem(filePath, type);
    document.head.appendChild(element);

    return new Promise((resolve, reject) => {
        element.onload = () => resolve(element);
        element.onerror = () => reject(new Error(`Failed to load ${type} from ${filePath}`));

    });
}

function makeLinkOrScriptElem(filePath, type) {
    if (!type) throw new Error("Type must be defined.");
    const elementAttrs = {
        script: { src: filePath, async: true },
        link: { rel: "stylesheet", href: filePath }
    };

    const attr = elementAttrs[type];
    if (!attr) throw new Error(`Unknown type ${type}`);

    const element = document.createElement(type);
    Object.assign(element, attr);
    return element;
}

function isNonEmptyList(data, dir) {
    if (Array.isArray(data) && data.length > 0) {
        return true
    } else {
        console.warn(`Warning: ${dir} exist but is not a valid array or empty.`);
        return false;
    }
}
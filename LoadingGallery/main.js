const URL = 'https://cataas.com/cat?height=300&json=true';
const COUNT_IMAGE = 3;
const galleryElem = document.getElementById("gallery");

async function getImageURL() {
    let responce = await fetch(URL);
    if (responce.ok) {
        let data = await responce.json();
        return data.url;
    } else {
        throw new Error("Ошибка при загрузке");
    }
}

async function loadImage(url) {
    return new Promise(resolve => {
        let img = document.createElement('img');
        img.classList.add('picture', 'hidden');
        img.src = url;
        galleryElem.append(img);
        img.addEventListener("load", () => resolve());
    });
}

async function main() {
    try {
        let urls = await Promise.all([getImageURL(), getImageURL(), getImageURL()]);
    
        await Promise.all( urls.map(url => loadImage(url)) );

        document.querySelector(".spinner").classList.remove("loading");
        document.querySelectorAll(".picture").forEach(img => img.classList.remove("hidden"));

    } catch (error) {
        console.log(error);
    }
}


main();



/* //|---|\\.// Gallery \\.//|---|\\ */



    /* Gallery Images */

// Gallery Elements
const galleryElem = document.querySelector(".gallery");
const galleryModal = document.querySelector(".gallery-modal");
const gmImg = document.querySelector(".gm-img");
const gmPrev = document.querySelector(".gm-prev");
const gmNext = document.querySelector(".gm-next");

// Random number generator (min and max)
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Open Gallery Modal
function openGalleryModal(galleryItem, galleryImg){
    galleryItem.addEventListener("click", function(){

        const srcAttr = galleryImg.getAttribute("src");
        const giAttr = galleryImg.getAttribute("galleryIndex");

        gmImg.setAttribute("src", srcAttr);
        gmImg.setAttribute("galleryIndex", giAttr);

    });
}

// Set a random image source for the gallery
for (let item = 0; item < 69; item++){

    // Image parent div
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");
    galleryElem.appendChild(galleryItem);

    // Image
    const galleryImg = document.createElement("img");
    galleryImg.classList.add("gallery-img");
    galleryImg.setAttribute("alt", "Gallery Image");

    // Set the image source (random size, random image)
    const randValH = getRandomInt(3, 5);
    const randValW = getRandomInt(2, 6);
    const srcPath = `https://picsum.photos/${randValH}00/${randValW}00?random=${item}.webp`;
    galleryImg.setAttribute("src", srcPath);
    galleryImg.setAttribute("galleryIndex", item);
    galleryItem.appendChild(galleryImg);

    // Open modal on click
    openGalleryModal(galleryItem, galleryImg)
}

// Macy.js settings
const msnry = new Macy({
    container: '.gallery',
    trueOrder: false,
    columns: 3,
    breakAt: {
        1200: 2,
        768: 2,
        400: 1
    },
    margin: {
      x: 20,
      y: 20,
    }
  })



    /* Gallery Modal */

const galleryImages = document.querySelectorAll(".gallery-img");

// Get the desired image data (prev/next image)
function galleryModalNav(changeGi){
    let srcAttrNew = "";
    let giAttrNew = "";
    
    // Loop through the images and find the right one
    galleryImages.forEach((galleryImg) => {
        const galleryImgIndex = parseInt(galleryImg.getAttribute("galleryIndex"));

        if (galleryImgIndex === changeGi){
            srcAttrNew = galleryImg.getAttribute("src");
            giAttrNew = galleryImgIndex;
        }
    });

    // Set the modal image attributes
    gmImg.setAttribute("src", srcAttrNew);
    gmImg.setAttribute("galleryIndex", giAttrNew);
}

// Previous image
gmPrev.addEventListener("click", function(){
    const giAttr = parseInt(gmImg.getAttribute("galleryIndex"));
    let changeGi = giAttr - 1;

    if (giAttr === 0){
        changeGi = galleryImages.length - 1;
    }
    galleryModalNav(changeGi);
});

// Next image
gmNext.addEventListener("click", function(){
    const giAttr = parseInt(gmImg.getAttribute("galleryIndex"));
    let changeGi = giAttr + 1;

    if (giAttr === galleryImages.length - 1){
        changeGi = 0;
    }
    galleryModalNav(changeGi);
});
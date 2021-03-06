import { ipcRenderer } from 'electron';

function clearImages() {
    const oldImages = document.querySelectorAll('li.list-group-item');

    for (let i = 0; i < oldImages.length; i++) {
        oldImages[i].parentNode.removeChild(oldImages[i]);

    }
}

function loadImages(images) {
    const imagesList = document.querySelector('ul.list-group');
    for (let i = 0; i < images.length; i++) {
        const node = `<li class="list-group-item">
                        <img class="media-object pull-left" src="${images[i].src}" height="32">
                        <div class="media-body">
                            <strong>${images[i].filename}</strong>
                            <p>${images[i].size}</p>
                        </div>
                    </li>`;
        imagesList.insertAdjacentHTML('beforeend', node);
    }
}

function changeImage(node) {
    if (node) {
        const selected = document.querySelector('li.selected');
        if (selected) { 
            selected.classList.remove('selected');
        }
        node.classList.add('selected');
        document.getElementById('image-displayed').src = node.querySelector('img').src;
    }
    else {
        document.getElementById('image-displayed').src = '';
    }
}

function addImagesEvent() {
    const thumbs = document.querySelectorAll('li.list-group-item');
    
    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('click', () => {
            changeImage(thumbs[i]);
        });
    }
}

function selectFirstImage() {
    const image = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(image);
}

// Se cera el canal y se queda esuchando (Cliente)
function setIpc() {
    ipcRenderer.on('load-images', (event, images) => {
        clearImages(),
        loadImages(images),
        addImagesEvent(),
        selectFirstImage()
    });
}

// Se responde al canal del Servidor
function openDirectory() {
    ipcRenderer.send('open-directory');
}

module.exports = {
    setIpc,
    openDirectory,
    clearImages,
    loadImages,
    addImagesEvent,
    changeImage
}
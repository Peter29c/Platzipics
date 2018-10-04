import url from 'url';
import path from 'path';

window.addEventListener('load', () => {
    addImagesEvent();
    searchImagesEvent();
});

function addImagesEvent() {
    const thumbs = document.querySelectorAll('li.list-group-item');

    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('click', () => {
            changeImage(thumbs[i]);
        });
    }
}

function changeImage(node) {
    document.querySelector('li.selected').classList.remove('selected');
    node.classList.add('selected');
    document.getElementById('image-displayed').src = node.querySelector('img').src;
}

function searchImagesEvent() {
    const searchBox = document.getElementById('search-box');

    searchBox.addEventListener('keyup', () => {
        const regex = new RegExp(searchBox.value.toLowerCase(), 'gi');
        if (searchBox.value.length > 0) {
            const thumbs = document.querySelectorAll('li.list-group-item img');      
            for (let i = 0; i < thumbs.length; i++) {
                const fileUrl = url.parse(thumbs[i].src);
                const fileName = path.basename(fileUrl.pathname);
                // console.log(fileName);
                if (fileName.match(regex)) {
                    thumbs[i].parentNode.classList.remove('hidden');
                }
                else {
                    thumbs[i].parentNode.classList.add('hidden');
                }  
            }
            selectFirstImage();
        }
        
    });
}

function selectFirstImage() {
    const image = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(image);
}
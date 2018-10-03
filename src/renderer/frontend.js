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
        if (searchBox.value.length > 0) {
            const thumbs = document.querySelectorAll('li.list-group-item img');      
            for (let i = 0; i < thumbs.length; i++) {
                const fileUrl = url.parse(thumbs[i].src);
                const fileName = path.basename(fileUrl.pathname);
                console.log(fileName);
                
            }
        }
        
    })
}
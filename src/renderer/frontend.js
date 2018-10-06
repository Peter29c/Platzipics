import url from 'url';
import path from 'path';
import applyfilter from './filters'
import { setIpc, openDirectory } from './ipcRendererEvents';

window.addEventListener('load', () => {
    setIpc();
    // addImagesEvent();
    searchImagesEvent();
    selectEvent();
    buttonOpenDirectory('open-directory', openDirectory);
});

function buttonOpenDirectory(id, func) {
    const buttonOpenDirectory = document.getElementById(id);
    buttonOpenDirectory.addEventListener('click', func);
}

function selectEvent() {
    const select = document.getElementById('filters');

    select.addEventListener('change', () => {
        // console.log(select.value);
        applyfilter(select.value, document.getElementById('image-displayed'))
        
    });
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
        else {
            const hidden = document.querySelectorAll('li.hidden');
            for (let i = 0; i < hidden.length; i++) {
                hidden[i].classList.remove('hidden');
                
            }
        }
    });
}
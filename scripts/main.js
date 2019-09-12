var x = 0;

function surprise() {
    x++;    
    var button = document.getElementById('surprise-button');
    switch (x) {
        case 7:
            button.innerHTML = 'Hmmm....';
            break;
        case 10:
            button.innerHTML = 'You won\'t get anything out of this';
            break;
        case 15:
            button.innerHTML = 'Sorry';
            break;
        case 20:
            button.innerHTML = 'Sorry?';
            break;
        case 24:
            button.innerHTML = 'I was just kiddin\', here\'s a smiley face for your effort';
            button.removeAttribute('onclick');
            photo = document.getElementById('surprise-photo');
            photo.style.visibility = 'visible';
            photo.style.width = '20%';
            photo.style.height = '20%';
            break;
    }
}

function timeShow() {
    document.getElementById('time').innerHTML = 'Today is ' + Date();
    var t = setTimeout(timeShow, 500);
}
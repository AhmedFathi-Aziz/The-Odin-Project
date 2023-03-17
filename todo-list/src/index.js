
function playWithDom(title) {
    let header = document.createElement('div');
    header.classList.add('header');
    let headername = document.createElement('h1');
    headername.textContent = title;
    header.appendChild(headername);
    content.appendChild(header);
}

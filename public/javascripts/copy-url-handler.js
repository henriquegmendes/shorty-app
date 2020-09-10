const clipboard = new ClipboardJS('.copy-icon');

const tBody = document.querySelector('#table-body');

tBody.onclick = event => {
  const clickedTag = event.target;
  if (clickedTag.getAttribute('class') === 'copy-icon') {
    $(`.toast-${clickedTag.getAttribute('id')}`).toast('show');
  }
}

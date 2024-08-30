// This code is rather ugly, but it does the job
document.addEventListener('DOMContentLoaded', function() {
    var text = document.body.textContent.trim();
    var words = text.split(' ');
    var htmlChunks = [];
    var chunkSize = 100;    // number of words to process in each chunk

    // create HTML chunks
    for (var i = 0; i < words.length; i += chunkSize) {
        let chunk = words.slice(i, i + chunkSize).map(word => '<span>' + word + ' </span>').join('');
        htmlChunks.push(chunk);
    }

    // function to update the DOM in chunks
    function updateDOMChunk(index) {
        if (index < htmlChunks.length) {
            document.body.insertAdjacentHTML('beforeend', htmlChunks[index]);
            updateDOMChunk(index + 1);
        }
    }
    document.body.innerHTML = '';
    updateDOMChunk(0);
    
    var deepCopy = document.body.cloneNode(true);

    var spans = document.body.querySelectorAll('span');
    var spansC = deepCopy.querySelectorAll('span');

    // get the top position of the first span
    var topPos = spans[0].offsetTop;
    var topIndex = 0;

    spansC.forEach(function(span, i) {
        var currentPos = spans[i].offsetTop;
        // if the top position changes, wrap the previous words in a div with class line
        if (topPos !== currentPos) {
            topPos = currentPos;

            // create a div and wrap the words inside it
            var div = document.createElement('div');
            div.className = 'line';

            for (var j = topIndex; j < i; j++) {
                div.appendChild(spansC[j]);
            }

            deepCopy.insertBefore(div, spansC[i]);
            topIndex = i;
        }
    });
    document.body.innerHTML = deepCopy.innerHTML
});

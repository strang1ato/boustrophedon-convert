// This code is rather ugly, but it does the job
document.addEventListener('DOMContentLoaded', function() {
    // Remove <a> elements, because usually they are small/differently styled text inside line that refers to footnotes
    var links = document.querySelectorAll('a');
    // Loop through each link and remove it from the DOM
    links.forEach(function(link) {
        link.remove();  // Removes the <a> element along with its content
    });

    // Function to wrap words in spans without altering the original HTML structure
    function wrapWordsInSpans(node) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            var words = node.textContent.trim().split(/\s+/);
            var fragment = document.createDocumentFragment();

            words.forEach(function(word) {
                var span = document.createElement('span');
                span.textContent = word + ' ';
                fragment.appendChild(span);
            });

            node.replaceWith(fragment);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            Array.from(node.childNodes).forEach(wrapWordsInSpans);
        }
    }

    // Wrap words in spans while preserving the original structure
    wrapWordsInSpans(document.body);

    var spans = Array.from(document.body.querySelectorAll('span'));

    // Clone the body to work on it
    var deepCopy = document.body.cloneNode(true);
    var spansC = Array.from(deepCopy.querySelectorAll('span'));

    var topPos = spans[0].offsetTop;
    var topIndex = 0;

    var tol = 2;
    var transformswitch = false;

    spansC.forEach(function(span, i) {
        var currentPos = spans[i].offsetTop;
        // If the top position changes, wrap the previous words in a div with class 'line'
        if (currentPos < topPos - tol || currentPos > topPos + tol) {
            topPos = currentPos;

            var div = document.createElement('div');
            if (transformswitch == true) {
                div.style.transform = 'rotateY(180deg)';
                transformswitch = false;
            } else {
                transformswitch = true;
            }
            div.className = 'line';

            var test = spansC[topIndex].parentNode;
            for (var j = topIndex; j < i; j++) {
                div.appendChild(spansC[j]);
            }
            test.appendChild(div);
            topIndex = i;
        }
    });

    document.body.innerHTML = deepCopy.innerHTML
});

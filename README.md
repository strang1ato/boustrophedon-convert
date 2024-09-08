## Converting html to boustrophedon styled html
To convert `html` file to boustrophedon writting style, download `boustrophedon.js`, then add to the end of `html` file this line:

`<script src="boustrophedon.js"></script>`

## Converting epub to single html file
You can achieve that using `pandoc` and running:

`pandoc -f epub -t html -o ebook.html  ./ebook.epub --self-contained`

## Converting boustrophedon styled html to boustrophedon PDF
**Step 1**: Resize browser (firefox) window to A4 dimensions in pixels:
  1. Enable responsive design mode by pressing `Ctrl + Shift + M`
  2. Set the custom viewport size to 794 (px) by 1123 (px)

**Step 2**: Open html file in the custom viewport window and wait until everything is fully loaded in the browser

**Step 3**: Save loaded html file to PDF:
  1. Press `Ctrl + P`
  2. In the "Print..." window set paper size to A4 and select "Fit to page width" option
  3. You can here margins and unselect "Print headers and footers"
  4. Click "Save" button


**Notes:** 
  - you don't need to use A4 dimensions, it is just my suggestion
  - if the letters are too small or too big or you want to just add more styles, you can add your styles to `html` file (see: [boustrophedon.css](https://github.com/strang1ato/boustrophedon-convert/blob/main/boustrophedon.css))
  - you can treat `txt` file as `html` file simply by changing file extension to `.html`


This repo is insipired by: https://codepen.io/pouretrebelle/pen/pvOxvv
<script id="rendered-js">
document.addEventListener('DOMContentLoaded', function () {
  TableOfContents();
});



function TableOfContents(container, output) {
  var toc = "";
  var level = 0;
  var container = document.querySelector(container) || document.querySelector('#contents');
  var output = output || '#toc';

  container.innerHTML =
  container.innerHTML.replace(
  /<h([\d])>(.+)<\/h([\d])>/gi,
  function (str, openLevel, titleText, closeLevel) {
    if (openLevel != closeLevel) {
      return str;
    }

    if (openLevel > level) {
      toc += new Array(openLevel - level + 1).join('<ol>');
    } else if (openLevel < level) {
      toc += new Array(level - openLevel + 1).join('</li></ol>');
    } else {
      toc += new Array(level + 1).join('</li>');
    }

    level = parseInt(openLevel);

    var anchor = titleText.replace(/ /g, "_");
    toc += '<li><a href="#' + anchor + '-heading" id="' + anchor + '-toc">' + titleText +
    '</a>';

    return '<h' + openLevel + '><a href="#' + anchor + '-toc" id="' + anchor + '-heading" onclick="keepLocation(window.pageYOffset);">' +
    titleText + '</a></h' + closeLevel + '>';
  });


  if (level) {
    toc += new Array(level + 1).join('</ol>');
  }
  document.querySelector(output).innerHTML += toc;
};

</script>
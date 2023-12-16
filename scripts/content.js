const article = document.querySelector("article");

if (article) {
    // Existing code for calculating reading time
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;

    // Existing code for inserting the badge
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    (date ?? heading).insertAdjacentElement("afterend", badge);

    // New code for replacing "button" with an image
    const searchText = "button";
    const imageUrl = "../images/favorite_FILL0_wght400_GRAD0_opsz24.png";
    console.log("Image Url const= ",imageUrl);
    console.log("Absolute path= ","/root/starter-chrome-ext/images/favorite_FILL0_wght400_GRAD0_opsz24.png");
    replaceTextWithImage(article, searchText, imageUrl);
}

function replaceTextWithImage(element, searchText, imageUrl) {
    element.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.includes(searchText)) {
                const replacedHtml = node.nodeValue.replace(searchText, `<img src='${imageUrl}' alt='${searchText}' />`);
                const span = document.createElement('span');
                span.innerHTML = replacedHtml;
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            replaceTextWithImage(node, searchText, imageUrl); // Recursive call for child elements
        }
    });
}

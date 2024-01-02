import { xpath } from 'k6/html';

export default function () {
    const response = http.get('https://example.com');
    const doc = parseHTML(response.body);

    // Find elements using XPath
    const elements = xpath(doc, '//h1');

    // Print the text content of the found elements
    elements.forEach((element) => {
        console.log(element.textContent);
    });
}

const express = require('express');
const { createCanvas } = require('canvas'); // Install canvas: npm install canvas

const app = express();
const PORT = 3000; // Port to run the server

app.get('/getTax', (req, res) => {
    const cc = req.query.countryCode;

    if(!cc) {
        cc = "NOT"
    }

    
    cc_tax_mapping = {
        "sk": "20",
        "si": "22",
        "hr": "25"
    }

    tax = cc_tax_mapping[cc.toLowerCase()]

    console.log(cc)
    console.log(tax)


    if (!tax) {
        return "incl VAT."
        // Or someting else
    } 

    const text = `incl. ${tax}% VAT.`;

    const fontSize = 15; // Font size in pixels

    // Temporary canvas to measure text size
    const tempCanvas = createCanvas(1, 1);
    const tempContext = tempCanvas.getContext('2d');
    tempContext.font = `bold ${fontSize}px Arial`;

    // Measure text width and approximate height
    const textWidth = tempContext.measureText(text).width;
    const textHeight = fontSize; // Approximate height based on font size

    // Create a canvas exactly fitting the text
    const canvas = createCanvas(textWidth, textHeight);
    const context = canvas.getContext('2d');

    // Set text properties
    context.fillStyle = '#000000'; // Black text
    context.font = `bold ${fontSize}px Arial`;
    context.textBaseline = 'top'; // Align text at the top

    // Draw text onto the canvas
    context.fillText(text, 0, 0);

    // Set response headers to return an image
    res.setHeader('Content-Type', 'image/png');

    // Stream the image back as a response
    canvas.createPNGStream().pipe(res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Get-TAX running at http://localhost:${PORT}/getTax?countryCode=SK`);
});
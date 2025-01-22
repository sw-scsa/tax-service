import { createCanvas } from 'canvas'; // ES module import

export default function handler(req, res) {

    console.log("ASDFASD")
    const cc = req.query.countryCode;
    const fs = req.query.fontSize | 12;

    if(!cc) {
        cc = "NOT"
    }
    console.log("ASDF")
    
    let cc_tax_mapping = {
        "sk": "20",
        "si": "22",
        "hr": "25"
    }

    let tax = cc_tax_mapping[cc.toLowerCase()]

    console.log(cc)
    console.log(tax)


    if (!tax) {
        return "incl VAT."
        // Or someting else
    } 

    const text = `incl. ${tax}% VAT.`;

    const fontSize = fs; // Font size in pixels

    // Temporary canvas to measure text size
    const tempCanvas = createCanvas(1, 1);
    const tempContext = tempCanvas.getContext('2d');

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
}
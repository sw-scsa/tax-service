import { createCanvas, registerFont } from 'canvas'; // Register font
import path from 'path';

registerFont(path.resolve('fonts/Roboto-Regular.ttf'), { family: 'Roboto' });


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
    tempContext.font = `bold ${fontSize}px Roboto`;

    // Measure text width and approximate height
    const textWidth = tempContext.measureText(text).width;
    const textHeight = fontSize; // Approximate height based on font size

    // Create a canvas exactly fitting the text
    const canvas = createCanvas(textWidth, textHeight);
    const context = canvas.getContext('2d');

    // Set text properties
    context.fillStyle = '#000000'; // Black text
    context.font = `bold ${fontSize}px Roboto`;
    context.textBaseline = 'top'; // Align text at the top

    // Draw text onto the canvas
    context.fillText(text, 0, 0);

    const buffer = canvas.toBuffer('image/png');

    // Set the correct headers for image response
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', buffer.length);

    // Send the binary image data directly
    res.end(buffer);

    
}
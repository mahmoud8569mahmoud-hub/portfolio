const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateOG() {
  const width = 1200;
  const height = 630;
  
  const bwPhotoPath = path.join(__dirname, '../public/assets/personal/timo-bw.jpg');
  
  // Resize portrait to fit height
  const resizedPhoto = await sharp(bwPhotoPath)
    .resize({
      width: 520,
      height: 630,
      fit: 'cover',
      position: 'center'
    })
    .toBuffer();

  // Create an SVG overlay for branding & typography
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Green background -->
    <rect width="${width}" height="${height}" fill="#0F3D3A"/>
    
    <!-- Decorative Cream & Bordo graphic elements -->
    <rect x="0" y="0" width="16" height="${height}" fill="#6C151E"/>
    <rect x="680" y="0" width="520" height="${height}" fill="#F5DABF" opacity="0.08"/>

    <!-- Tilted Badge -->
    <g transform="translate(80, 90) rotate(-2)">
      <rect x="0" y="0" width="260" height="42" rx="21" fill="#6C151E"/>
      <text x="130" y="27" fill="#F5DABF" font-family="sans-serif" font-weight="700" font-size="16" text-anchor="middle" letter-spacing="2">
        CREATIVE GRAPHIC DESIGNER
      </text>
    </g>

    <!-- Main Name Title -->
    <text x="80" y="210" fill="#F5DABF" font-family="sans-serif" font-weight="900" font-size="56" letter-spacing="-1">
      Mahmoud Ayman
    </text>
    <text x="80" y="270" fill="#F5DABF" opacity="0.8" font-family="sans-serif" font-weight="600" font-size="36">
      تيمو — Timo
    </text>

    <!-- Divider Bar -->
    <rect x="80" y="320" width="120" height="6" fill="#6C151E" rx="3"/>

    <!-- Concept Headline -->
    <text x="80" y="390" fill="#F5DABF" font-family="sans-serif" font-weight="800" font-size="32">
      أفكار تتشاف قبل ما تتقري.
    </text>
    <text x="80" y="435" fill="#F5DABF" opacity="0.9" font-family="sans-serif" font-weight="400" font-size="22">
      Ideas you see before you read them.
    </text>

    <!-- Footer meta -->
    <text x="80" y="550" fill="#F5DABF" opacity="0.6" font-family="sans-serif" font-size="18" font-weight="500">
      Visual Identity • Social Media • Advertising • Editorial
    </text>
  </svg>
  `;

  // Composite SVG and the resized photo
  await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: resizedPhoto,
        top: 0,
        left: 680,
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(__dirname, '../public/og-image.jpg'));

  console.log('Successfully generated public/og-image.jpg (1200x630)');
}

generateOG().catch(console.error);

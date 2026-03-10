const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');

const inputDir = './img/macadamias'; 
const outputDir = './img/macadamias-otimizadas';

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir);
console.log(`Arquivos encontrados: ${files.length}`);

files.forEach(file => {
  // Converte tudo para minúsculas para evitar erro de .PNG vs .png
  const fileNameLower = file.toLowerCase();
  const ext = path.extname(file).toLowerCase();
  
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`Lendo: ${file}...`);

    let pipeline = sharp(path.join(inputDir, file));

    // Verificação robusta: aceita 'estilo5' ou o nome original do WhatsApp
    if (fileNameLower.includes('estilo5')) {
      console.log(`🎯 Aplicando zoom seguro no Estilo 5: ${file}`);
      
      pipeline = pipeline
        .resize(1200, 800, { // Primeiro aumentamos a imagem virtualmente
          fit: 'cover'
        })
        .extract({ left: 300, top: 200, width: 600, height: 400 }); // Agora cortamos o centro
        
    } else {
      // TRATAMENTO PADRÃO
      pipeline = pipeline.resize(600, 400, { 
        fit: 'cover',
        position: 'center'
      });
    }

    pipeline
      .modulate({ 
        brightness: 0.98,
        saturation: 1.08
      })
      .linear(1.08, -5)
      .sharpen({sigma:1.1})
      .webp({ quality: 92 })
      .toFile(path.join(outputDir, `${path.parse(file).name}.webp`))
      .then(() => console.log(`✅ Sucesso: ${file}`))
      .catch(err => console.error(`❌ Erro no Sharp para ${file}:`, err));
  }
});
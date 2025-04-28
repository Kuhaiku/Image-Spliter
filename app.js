
function updatePreview() {
const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');
const columns = parseInt(document.getElementById('columns').value) || 1;
const rows = parseInt(document.getElementById('rows').value) || 1;

const width = canvas.width;
const height = canvas.height;
const columnWidth = width / columns;
const rowHeight = height / rows;

// Limpa o canvas
ctx.clearRect(0, 0, width, height);

// Desenha o quadrado em branco
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, width, height);

// Define a cor da linha como vermelha
ctx.strokeStyle = 'red'; // Aqui você muda a cor para vermelha
ctx.lineWidth = 1;

// Desenha as linhas das colunas
for (let c = 1; c < columns; c++) {
ctx.beginPath();
ctx.moveTo(c * columnWidth, 0);
ctx.lineTo(c * columnWidth, height);
ctx.stroke();
}

// Desenha as linhas das fileiras
for (let r = 1; r < rows; r++) {
ctx.beginPath();
ctx.moveTo(0, r * rowHeight);
ctx.lineTo(width, r * rowHeight);
ctx.stroke();
}
}

function splitImage() {
    const fileInput = document.getElementById('upload');
    const columns = parseInt(document.getElementById('columns').value);
    const rows = parseInt(document.getElementById('rows').value);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';  // Clear previous results

    if (!fileInput.files.length) {
        alert('Please upload an image file.');
        return;
    }

    const file = fileInput.files[0];
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const imgWidth = img.width;
            const imgHeight = img.height;

            const quadrWidth = Math.floor(imgWidth / columns);
            const quadrHeight = Math.floor(imgHeight / rows);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    const x = c * quadrWidth;
                    const y = r * quadrHeight;

                    canvas.width = quadrWidth;
                    canvas.height = quadrHeight;

                    ctx.drawImage(img, x, y, quadrWidth, quadrHeight, 0, 0, quadrWidth, quadrHeight);

                    // Converte o canvas para URL da imagem
                    const imgQuadrant = canvas.toDataURL("image/png");
                    
                    // Cria um link temporário para forçar o download
                    const link = document.createElement('a');
                    link.href = imgQuadrant;
                    link.download = `quadrant_${r + 1}_${c + 1}.png`;

                    // Força o clique no link para baixar a imagem
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    };
    reader.readAsDataURL(file);
}


window.onload = updatePreview;

// No final do app.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function() {
        console.log('Service Worker registrado com sucesso.');
    }).catch(function(error) {
        console.log('Falha ao registrar Service Worker:', error);
    });
}

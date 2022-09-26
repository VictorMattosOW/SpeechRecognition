window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';
recognition.interimResults = true;
recognition.continuous = true;

let textoDownload = [];
const btnDark = document.getElementById("darkTheme");
const btnDownload = document.getElementById("btnDownload");
const bgDark = document.querySelector("body");
const bgCaderno = document.querySelector(".caderno-container");
const btnStart = document.querySelector("#btnStart");
const icon = document.querySelector("#icon");
const p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

let darkTheme = false;

btnDownload.addEventListener('click', () => {
    escreverArquivo();
});

btnDark.addEventListener('click', () => {
    if (!darkTheme) {
        bgDark.style.background = "#1B232C";
        words.style.background = "#6D7F93";
        bgCaderno.style.background = "#6D7F93";
        p.style.color = "#DF83FF";
        darkTheme = true;
    } else {
        bgDark.style.background = "#F4F8FB";
        bgCaderno.style.background = "#FFFFFFFF";
        words.style.background = "#FFFFFFFF";
        darkTheme = false;
    }
});

let btnGravar = false;
btnStart.addEventListener('click', () => {
    if (!btnGravar) {
        start();
        icon.src = "block.png";
        btnStart.style.background = "red";
        btnGravar = true;
    } else {
        stop();
        icon.src = "play.png";
        btnStart.style.background = "#D2EBFF";
        btnGravar = false;
    }
});

function escreverArquivo() {
    let blob = new Blob([textoDownload], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "arquivo" + ".txt");
}

const texto = [];

function start() {
    recognition.start();
    recognition.onresult = function(event) {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                let pTexto = '';
                texto.push(event.results[i][0].transcript.trim());
                texto.forEach(t => {
                    pTexto += aplicaPontuacao(t);
                });
                // p.textContent = pTexto;
                // var text = document.getElementById('text');
                words.value += pTexto;
                textoDownload = pTexto;
            }
        }
    }
}

function aplicaPontuacao(frase) {
    if (frase.includes('vírgula')) {
        frase = frase.replace("vírgula", ',');
    } else if (frase.includes('ponto final')) {
        frase = frase.replace("ponto final", '.');
    }
    return frase + " ";
}

function stop() {
    recognition.stop();
}
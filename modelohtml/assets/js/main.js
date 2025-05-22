
const form = document.querySelector('form');
const inputAltura = document.querySelector('#altura'); // Seleciona o input de altura
const inputPeso = document.querySelector('#peso'); // Seleciona o input de peso

inputPeso.addEventListener('input', function() {
    let peso = inputPeso.value.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    if (peso.length > 2) {
        peso = peso.slice(0,2) + '.' + peso.slice(2); // Insere o ponto após o segundo dígito
    }
    if (inputPeso.value.length > 3) {
        peso = inputPeso.value.slice(0, 4); // Limita a 3 caracteres
    }

    inputPeso.value = peso; // Atualiza o valor do campo
});

inputAltura.addEventListener('input', function() { 
    let altura = inputAltura.value.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    if (altura.length > 1) {
        altura = altura.slice(0, 1) + '.' + altura.slice(1); // Insere o ponto após o primeiro dígito
    }

    if (inputAltura.value.length > 4) {
        altura = inputAltura.value.slice(0, 4); // Limita a 5 caracteres
    }

    inputAltura.value = altura; // Atualiza o valor do campo
});

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio do formulário
    const inputPeso = e.target.querySelector('#peso'); // Seleciona o input de peso
    const inputAltura = e.target.querySelector('#altura'); // Seleciona o input de altura
    const peso = Number(inputPeso.value); 
    const altura = Number(inputAltura.value);


    if(!peso) { // Verifica se o peso é válido
        setresultado('Peso inválido', false);
        return;
    }
    
    if(!altura) { // Verifica se a altura é válida
        setresultado('Altura inválida', false);
        return;
    }

    const imc = getImc(peso, altura); // Calcula o IMC
    const nivelImc = getNivelImc(imc); // Obtém o nível do IMC
    const msg = `Seu IMC é ${imc} (${nivelImc}).`; // Cria a mensagem de resultado
    setresultado(msg, true); // Exibe o resultado
});




function getNivelImc(imc) { // Função para obter o nível do IMC
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 
        'Obesidade grau 2', 'Obesidade grau 3'];
    if(imc >= 39.9) return nivel[5];
    if(imc >= 34.9) return nivel[4];
    if(imc >= 29.9) return nivel[3];
    if(imc >= 24.9) return nivel[2];
    if(imc >= 18.5) return nivel[1];
    if(imc < 18.5) return nivel[0];
}

function getImc(peso, altura) { // Função para calcular o IMC
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

function criaP(){ // Função para criar um elemento <p>
    const p = document.createElement('p');
    return p;
}

function setresultado(msg, isValid) { // Função para exibir o resultado
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML ='';

    const p = criaP();
    
    if(isValid) {
        p.classList.add('resultado-valido');
    }else {
        p.classList.add('resultado-invalido');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
}


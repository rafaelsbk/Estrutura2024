const readline = require('readline');

class Pilha {
    constructor(tam = 10) {
        this.dados = [];
        this.topo = 0;
        this.tam = tam;
    }

    push(dado) {
        if (!this.isFull()) {
            this.dados[this.topo++] = dado;
        } else {
            throw new Error("Stackoverflow");
        }
    }

    pop() {
        if (!this.isEmpty()) {
            this.topo--;
            return this.dados[this.topo];
        } else {
            throw new Error("Stackunderflow");
        }
    }

    top() {
        return this.dados[this.topo - 1];
    }

    isEmpty() {
        return this.topo === 0;
    }

    isFull() {
        return this.topo === this.tam;
    }

    toString() {
        return this.dados.slice(0, this.topo).join(" ");
    }
}

const pilhaAcoes = new Pilha();

function salvarEstado(novoTexto) {
    if (pilhaAcoes.isEmpty() || novoTexto !== pilhaAcoes.top()) {
        pilhaAcoes.push(novoTexto);
        console.log(`Salvo: "${novoTexto}"`);
    }
}

function desfazer() {
    if (!pilhaAcoes.isEmpty()) {
        pilhaAcoes.pop();
        const estadoAnterior = pilhaAcoes.top() || "";
        console.log(`Desfazer realizado. Estado atual: "${estadoAnterior}"`);
        return estadoAnterior;
    } else {
        console.log("Nada para desfazer!");
        return "";
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    rl.question('\nDigite uma ação: 1 para adicionar texto, 2 para desfazer, ou 3 para sair: ', (acao) => {
        if (acao === '1') {
            rl.question('Digite o texto: ', (texto) => {
                salvarEstado(texto);
                menu();
            });
        } else if (acao === '2') {
            desfazer();
            menu();
        } else if (acao === '3') {
            console.log('Saindo do editor.');
            rl.close();
        } else {
            console.log('Ação inválida. Tente novamente.');
            menu();
        }
    });
}

console.log("Bem-vindo ao Editor de Texto com Desfazer");
menu();

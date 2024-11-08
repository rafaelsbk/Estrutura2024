class Pilha {
    constructor(tam = 5) {
        this.dados = [];
        this.topo = 0;
        this.tam = tam;
    }

    push(cliente) {
        if (!this.isFull()) {
            if (cliente && cliente.nome) {
                this.dados[this.topo++] = cliente;
                return;
            } else {
                throw new Error("O cliente deve ter uma propriedade 'nome'.");
            }
        }
        throw new Error("Stackoverflow");
    }

    pop() {
        if (!this.isEmpty()) {
            this.topo--;
            return;
        }
        throw new Error("Stackunderflow");
    }

    peek() {
        if (!this.isEmpty()) {
            return this.dados[this.topo - 1];
        }
        throw new Error("A pilha está vazia.");
    }

    clear() {
        this.topo = 0;
    }

    size() {
        return this.topo;
    }

    isEmpty() {
        return this.topo === 0;
    }

    isFull() {
        return this.size() === this.tam;
    }

    toString() {
        let texto = "";
        for (let i = 0; i < this.topo; i++) {
            texto += this.dados[i].nome + " ";
        }
        return texto.trim();
    }
}
const pilhaClientes = new Pilha(5);

function atualizarClientesNaPilha() {
    const clientesDiv = document.getElementById("clientesNaPilha");
    clientesDiv.textContent = pilhaClientes.toString();
    atualizarProximoCliente();
}

function atualizarProximoCliente() {
    const proximoDiv = document.getElementById("proximoCliente");
    if (!pilhaClientes.isEmpty()) {
        proximoDiv.textContent = pilhaClientes.peek().nome;
    } else {
        proximoDiv.textContent = "Nenhum cliente na pilha";
    }
}

function adicionarCliente() {
    const nome = document.getElementById("nomeCliente").value;
    if (nome) {
        try {
            pilhaClientes.push({ nome });
            atualizarClientesNaPilha();
            document.getElementById("nomeCliente").value = "";
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert("Por favor, insira o nome do cliente.");
    }
}

function removerCliente() {
    try {
        pilhaClientes.pop();
        atualizarClientesNaPilha();
    } catch (error) {
        alert(error.message);
    }
}

function limparPilha() {
    pilhaClientes.clear();
    atualizarClientesNaPilha();
}

function verificarPilhaVazia() {
    const statusDiv = document.getElementById("statusPilha");
    if (pilhaClientes.isEmpty()) {
        statusDiv.textContent = "A pilha está vazia.";
    } else {
        statusDiv.textContent = "A pilha contém clientes.";
    }
}
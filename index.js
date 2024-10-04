const express = require('express');

const app = express();
app.use(express.json());

const validarSenha = (senha) => {

    let tamanho;
    let caractereEspecial;
    let espaco;
    let maiuscula;
    let minuscula;
    let numeral;
    let boaSenha;

    const mensagens = []; // Array para armazenar mensagens de erro

    if (senha.length < 8) {
        mensagens.push("Sua senha é muito curta. Para maior segurança, considere usar no máximo 12 caracteres.");
    } 
    if (senha.length > 12) {
        mensagens.push("Sua senha é bastante longa. Use no máximo 12 caracteres. Tente algo mais compacto para melhor memorização ;)");
    } 
    if (!/[!@#$%&]/.test(senha)) {
        mensagens.push("Considere usar pelo menos um caractere especial. Ex.: ! @ # $ % & *");
    }
    if (senha.indexOf(" ") !== -1) {
        mensagens.push("A senha não pode conter espaços em branco.");
    }
    if (!/[A-Z]/.test(senha)) {
        mensagens.push("A senha não contém letras maiúsculas. Para maior segurança, considere usar pelo menos uma letra maiúscula.");
    }
    if (!/[a-z]/.test(senha)) {
        mensagens.push("A senha não contém letras minúsculas. Para maior segurança, considere usar pelo menos uma letra minúscula.");
    }
    if (!/[0-9]/.test(senha)) {
        mensagens.push("A senha não contém numerais. Para maior segurança, considere usar pelo menos um numeral.");
    }
    
    if (tamanho && caractereEspecial && espaco && maiuscula && minuscula && numeral == true){
      boaSenha = true
    } else {
      boaSenha = false
    }
    if (mensagens.length === 0) {
        return { valido: true, mensagem: "Senha válida." };
    } else {
        // Se houver mensagens, a senha não é válida
        return { valido: false, mensagens }; // Retorna todas as mensagens de erro
    }
}

app.post('/validar-senha', (req, res) => {
    const { senha } = req.body;
    const resultado = validarSenha(senha);
    return res.json(resultado);
});

app.listen (8080, () => {
    let data = new Date();
    console.log('Servidor node iniciado em: '+ data);
});
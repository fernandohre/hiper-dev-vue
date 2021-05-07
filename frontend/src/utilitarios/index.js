module.exports = {
    permitirSomenteNumeros: function (event) {
        event = event ? event : window.event;
        var charCode = event.which ? event.which : event.keyCode;
        if (
            (charCode > 31 && (charCode < 48 || charCode > 57)) ||
            charCode === 46
        ) {
            event.preventDefault();
        } else {
            return true;
        }
    },

    atribuirTamanhoDoCampo: function () {
        return "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    },

    obtenhaRegrasDoFormularioDeProduto: function () {
        return {
            descricao: [
                (v) => !!v || "Descrição do produto é obrigatória!",
                (v) =>
                    (v && v.length <= 50) ||
                    "A descrição não pode ultrapassr 50 caracteres",
            ],
            preco: [(v) => !!v || "O preço é obrigatório!"],
            quantidade: [
                (v) =>
                    (!!v && v !== 0) ||
                    "A quantidade de itens no estoque deve ser informada!",
            ]
        }
    }
};
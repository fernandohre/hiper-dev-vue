<template>
  <div class="vuetify--formulario">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="descricao"
        :counter="50"
        :rules="regraDescricao"
        label="Descrição do produto"
        required
      ></v-text-field>

      <v-text-field
        v-model="preco"
        :rules="regraPreco"
        prefix="R$"
        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
        maxLength="10"
        @keypress="permitirSomenteNumeros"
        label="Preço"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="quantidade"
        :rules="regraQuantidade"
        label="Quantidade no Estoque"
        @keypress="permitirSomenteNumeros"
        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
        maxLength="4"
        required
      >
      </v-text-field>

      <v-btn color="success" class="mr-4" @click="salvar"> Salvar </v-btn>
    </v-form>
    <v-snackbar :color="snackbar.cor" v-model="snackbar.exibir">
      {{ snackbar.mensagem }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.exibir = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<style scoped>
.vuetify--formulario {
  width: 80%;
  margin: 5% auto;
}
</style>

<script>
import { mapActions } from 'vuex';
import { uuid } from 'vue-uuid'
export default {
  data: () => ({
    snackbar: {
      exibir: false,
      mensagem: null,
      cor: null,
    },
    valid: true,
    descricao: "",
    regraDescricao: [
      (v) => !!v || "Descrição do produto é obrigatória!",
      (v) =>
        (v && v.length <= 50) ||
        "A descrição não pode ultrapassr 50 caracteres",
    ],
    preco: null,
    regraPreco: [(v) => !!v || "O preço é obrigatório!"],
    quantidade: null,
    regraQuantidade: [
      (v) =>
        (!!v && v !== 0) ||
        "A quantidade de itens no estoque deve ser informada!",
    ],
  }),
  methods: {
    salvar() {
      const formularioEstaValido = this.$refs.form.validate();

      if (formularioEstaValido) {
        let novoId = uuid.v1();
        this.adicionarProdutoAction({
          id: novoId,
          nome: this.descricao,
          preco: this.preco,
          quantidadeNoEstoque: this.quantidade
        });
        this.limpeCamposDoFormulario();
      }
    },
    altereItemSelecionado(valor) {
      this.selecionado = valor;
    },
    permitirSomenteNumeros(event) {
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
    limpeCamposDoFormulario() {
      this.$refs.form.reset();
    },
    ...mapActions(['adicionarProdutoAction'])
  },
};
</script>
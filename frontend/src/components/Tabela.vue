<template>
  <v-data-table
    :headers="headers"
    :items="this.produtos"
    sort-by="descricao"
    :items-per-page="10"
    :loading="false"
    :no-data-text="'Não existem usuários cadastrados'"
    :locale="'pt-BR'"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Produtos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <ModalTabela
          :produtoEmEdicao="produtoEmEdicao"
          :abrirModal="dialog"
          @fecharModal="fecharModal"
          @atualizeComponente="forcarAtualizacao"
        />
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editarItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deletarItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import utilitario from "../utilitarios";
import { mapState, mapActions } from "vuex";
import ModalTabela from "./ModalTabela";
export default {
  components: { ModalTabela },
  computed: {
    ...mapState(["produtos"]),
    produtoEmEdicao() {
      return this.itemEditado;
    },
  },
  data: () => ({
    regrasFormulario: utilitario.obtenhaRegrasDoFormularioDeProduto(),
    dialog: false,
    headers: [
      {
        text: "Descrição",
        align: "start",
        value: "nome",
        sortable: false,
      },
      { text: "Preço", value: "preco" },
      { text: "Quantidade", value: "quantidadeNoEstoque" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    itemEditado: {
      id: "",
      descricao: "",
      preco: 0,
      quantidade: 0,
    },
    renderizarNovamente: false,
  }),
  created() {
    console.log("Tabela criada");
    console.log(this.itemEditado);
  },
  beforeUpdate() {
    console.log("antes de atualizar");
  },
  methods: {
    editarItem(item) {
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    deletarItem(item) {
      this.removerProdutoAction(item.id);
    },
    fecharModal() {
      this.dialog = false;
    },
    forcarAtualizacao() {
      this.$forceUpdate();
    },
    ...mapActions(["removerProdutoAction"]),
  },
};
</script>
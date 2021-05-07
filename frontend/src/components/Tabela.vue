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
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState(["produtos"]),
  },
  data: () => ({
    regrasFormulario: utilitario.obtenhaRegrasDoFormularioDeProduto(),
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
  beforeCreate() {
    console.log('Componente: Tabela - beforeCreated')
  },
  created() {
    console.log('Componente: Tabela - Created');
  },
  beforeMount() {
    console.log('Componente: Tabela - beforeMount')
  },
  mounted() {
    console.log('Componente: Tabela - mouted')
  },
  beforeUpdate() {
    console.log('Componente Tabela - beforeUpdated');
  },
  updated() {
    console.log('Componente Tabela - updated');
  },
  beforeDestroy() {
    console.log('Compoente Tabela - beforeDestroy')
  },
  destroyed() {
    console.log('Componente Tabela - destroyed')
  },
  methods: {
    editarItem(item) {
      this.setProdutoEmEdicao(item);
      this.setStatusModal(true);
    },

    deletarItem(item) {
      this.removerProdutoAction(item.id);
    },
    ...mapActions(['removerProdutoAction']),
    ...mapMutations(['setProdutoEmEdicao', 'setStatusModal'])
  },
};
</script>
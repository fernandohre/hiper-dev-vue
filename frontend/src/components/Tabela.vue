<template>
  <v-data-table
    :headers="headers"
    :items="produtos"
    sort-by="descricao"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Produtos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edição</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form">
                  <v-row>
                    <v-text-field
                      :rules="regrasFormulario.descricao"
                      v-model="itemEditado.descricao"
                      label="Descrição"
                      :counter="50"
                      required
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      :rules="regrasFormulario.preco"
                      v-model="itemEditado.preco"
                      label="Preço"
                      prefix="R$"
                      @keypress="somenteNumeros"
                      @oninput="tamanhoDoCampo"
                      maxLength="10"
                      required
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      :rules="regrasFormulario.quantidade"
                      v-model="itemEditado.quantidade"
                      label="Quantidade"
                      @keypress="somenteNumeros"
                      @oninput="tamanhoDoCampo"
                      maxLength="10"
                      required
                    ></v-text-field>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="fechar">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="salvar">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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

export default {
  data: () => ({
    regrasFormulario: utilitario.obtenhaRegrasDoFormularioDeProduto(),
    dialog: false,
    headers: [
      {
        text: "Descrição",
        align: "start",
        value: "descricao",
        sortable: false
      },
      { text: "Preço", value: "preco" },
      { text: "Quantidade", value: "quantidade" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    produtos: [],
    indiceEditado: -1,
    itemEditado: {
      id: "",
      descricao: "",
      preco: 0,
      quantidade: 0,
    },
    itemPadrao: {
      id: "",
      descricao: "",
      preco: 0,
      quantidade: 0,
    },
  }),

  watch: {
    dialog(val) {
      val || this.fechar();
    },
  },

  created() {
    console.log("Tabela criada");
  },

  methods: {
    inicialize(listaDeProdutos) {
      this.produtos = listaDeProdutos;
    },

    editarItem(item) {
      this.indiceEditado = this.produtos.indexOf(item);
      this.itemEditado = Object.assign({}, item);
      this.dialog = true;
    },

    deletarItem(item) {
      const indice = this.produtos.indexOf(item);
      this.produtos.splice(indice, 1);
    },

    fechar() {
      this.dialog = false;
      this.$nextTick(() => {
        this.itemEditado = Object.assign({}, this.itemPadrao);
        this.indiceEditado = -1;
      });
    },

    salvar() {
      const formularioEstaValido = this.$refs.form.validate();

      if (formularioEstaValido) {
        if (this.indiceEditado > -1) {
          console.log("formulario ta valido carai")
        }
        this.fechar();
      }
    },

    somenteNumeros(event) {
      utilitario.permitirSomenteNumeros(event);
    },
    tamanhoDoCampo() {
      return utilitario.atribuirTamanhoDoCampo();
    },
  },
};
</script>
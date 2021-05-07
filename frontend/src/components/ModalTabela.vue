<template>
  <div>
    <v-dialog v-model="abrirModal" max-width="500px">
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
                  v-model="produtoEmEdicao.nome"
                  label="Descrição"
                  :counter="50"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  :rules="regrasFormulario.preco"
                  v-model="produtoEmEdicao.preco"
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
                  v-model="produtoEmEdicao.quantidadeNoEstoque"
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
  </div>
</template>

<script>
import utilitario from "../utilitarios";
import { mapActions } from "vuex";
export default {
  name: "ModalTabela",
  props: {
    produtoEmEdicao: {
      default: {
        nome: "Nenhum produto em edição",
        preco: 1,
        quantidadeNoEstoque: 0,
      },
    },
    abrirModal: {
      default: false,
    },
  },
  watch: {
    abrirModal(val) {
      val || this.fechar();
    },
  },
  methods: {
    salvar() {
      const formularioEstaValido = this.$refs.form.validate();

      if (formularioEstaValido) {
        this.atualizarProdutoAction(this.produtoEmEdicao);
        this.fechar();
      }
    },
    fechar() {
      this.$emit("fecharModal");
      this.$emit("atualizeComponente");
    },
    somenteNumeros(event) {
      utilitario.permitirSomenteNumeros(event);
    },
    tamanhoDoCampo() {
      return utilitario.atribuirTamanhoDoCampo();
    },
    ...mapActions(["atualizarProdutoAction"]),
  },
  data() {
    return {
      regrasFormulario: utilitario.obtenhaRegrasDoFormularioDeProduto(),
    };
  },
};
</script>
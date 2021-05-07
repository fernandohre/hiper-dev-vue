<template>
  <div>
    <v-dialog v-model="$store.state.statusModal" max-width="500px">
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
                  v-model="$store.state.produtoEmEdicao.nome"
                  label="Descrição"
                  :counter="50"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  :rules="regrasFormulario.preco"
                  v-model="$store.state.produtoEmEdicao.preco"
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
                  v-model="$store.state.produtoEmEdicao.quantidadeNoEstoque"
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
import { mapActions, mapMutations } from "vuex";
export default {
  name: "ModalTabela",
  methods: {
    salvar() {
      const formularioEstaValido = this.$refs.form.validate();

      if (formularioEstaValido) {
        this.atualizarProdutoAction(this.$store.state.produtoEmEdicao);
        this.fechar();
      }
    },
    fechar() {
      this.setStatusModal(false);
    },
    somenteNumeros(event) {
      utilitario.permitirSomenteNumeros(event);
    },
    tamanhoDoCampo() {
      return utilitario.atribuirTamanhoDoCampo();
    },
    ...mapActions(['atualizarProdutoAction']),
    ...mapMutations(['setStatusModal'])
  },
  data() {
    return {
      regrasFormulario: utilitario.obtenhaRegrasDoFormularioDeProduto(),
    };
  },
};
</script>
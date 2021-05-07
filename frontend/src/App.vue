<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-clipboard-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cadastrar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/alterar">
          <v-list-item-action>
            <v-icon>mdi-pencil-box-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Alterar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/sincronizar">
          <v-list-item-action>
            <v-icon>mdi-database-sync</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Playground</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click="cliqueMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>Gestão de Produtos</v-toolbar-title>
    </v-app-bar>

    <section>
      <v-main>
        <router-view />
      </v-main>
    </section>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    cliqueMenu() {
      this.drawer = !this.drawer;
    },
  }
}
</script>

<style>
#app {
  
}
</style>

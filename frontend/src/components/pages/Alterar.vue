<template>
  <div>
    <Tabela />
    <ModalTabela />
  </div>
</template>

<script>
import Tabela from '@/components/Tabela'
import ModalTabela from '../ModalTabela'
export default {
  name: 'Alterar',
  components: {
    Tabela,
    ModalTabela
  }
}
</script>

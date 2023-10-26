<template>
  <footer class="bg-dark text-light text-center py-3">
    <p>&copy; {{ currentYear }} IoT Control</p>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      currentYear: new Date().getFullYear
    };
  }
}
</script>

<style scoped>
/* Estilos personalizados para o rodapé, se necessário */
</style>

<template>
    <Header/>
    <main>
      <router-view/>
    </main>
    <Footer/>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import People from './pages/People'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    People
  }
}
</script>

<style lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/defaults.scss';
@import '@/assets/fonts/fonts.scss';

#app {
  font-family: HelveticaNeueCyr, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-primary;

  display: flex;
  flex-flow: column;

  font-size: 14px;
  font-weight: 400;

  min-height: 100vh;
}
a{
  color: $text-primary;
}
main{
  padding: 64px 0 112px;
}

.main-button{
  background-color: $red;
  border-radius: 6px;
  padding: 12px;
  color: white;
  transition: all .2s;

  &--large{
    padding: 12px 54px;
  }
  &:hover{
    background-color: darken($red, 5%);
  }
}

.logo{
  position: relative;

  a{
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

@media(max-width: 520px){
  .logo{
    img{
      height: 24px;
      width: 82px;
    }
  }
  main{
    padding: 27px 0 80px;
  }
}
</style>

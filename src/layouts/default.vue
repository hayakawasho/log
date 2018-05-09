<template lang="pug">
#root
  nav-component
  .l-nav
    button.c-navicon(data-module="Drawer" data-target=".g-menu")
      .c-navicon__in
        - for(var i = 1; i < 5; i++)
          .c-navicon__line.js-line(class=`_${i}`)
            span
  .l-wrapper
    .o-scroll
      header-component
      nuxt
      footer-component

</template>

<script>
import { mapGetters } from 'vuex'
import HeaderComponent from '~/components/pageHead'
import FooterComponent from '~/components/pageFoot'
import NavComponent from '~/components/nav'
import webFont from 'webfontloader'
import { AppManager } from "~/assets/scripts/index"

export default {
  mounted () {
    //window.App = new AppManager()
  },
  components: {
    HeaderComponent,
    FooterComponent,
    NavComponent,
  },
  computed: {
    isFontLoaded() {
      return this.$store.state.isFontLoaded
    }
  },
  methods: {
    loadWebfont() {
      return new Promise((resolve, reject) => {
        webFont.load({
          classes: false,
          timeout: 10000,
          custom: {
            families: [
              'YakuHanJPs:n4',
              'YakuHanJP:n4,n7',
              'Neue Frutiger:n4,n7',
            ],
          },
          fontloading: (familyName, fvd) => {
            console.log('fontloading -', familyName, fvd)
          },
          fontactive: (familyName, fvd) => {
            console.log('fontactive -', familyName, fvd)
          },
          active: () => {
            document.body.classList.add('is-webfontLoaded')
            return resolve()
          },
          inactive: () => {
            console.log('the browser does not support OR if none of the fonts could be loaded')
            return reject()
          }
        })
      })
    },
  },

  async created() {
    this.$store.commit('initClient')
    try {
      await this.loadWebfont()
    } catch (err) {
      console.log('[App - created]', err)
    } finally {
      console.log('[App - created] created done')
      this.$store.commit('changeIsFontLoaded', true)
    }
  }
}

</script>

<style lang="stylus">

#__nuxt, #__layout
  position: relative
  margin: 0
  padding: 0
  width: 100%
  height: 100%
  overflow: hidden

#root
  position: relative
  width: 100%
  height: 100%
  overflow: hidden

.l-wrapper
  position: relative
  z-index: 0
  min-height: 100vh
  overflow: hidden

.o-scroll
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  backface-visibility: hidden;
  z-index: 0;

</style>

<template lang="pug">
div
  nav-component
  .l-nav
    navicon-Component
  .o-wrapper
    #js-window.o-scroll
      header-component
      nuxt
      footer-component
  #js-clip.c-mask
  .c-shadow.c-shadow--top
  .c-shadow.c-shadow--bottom
  //-.c-pageLine
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderComponent from '~/components/PageHead'
import FooterComponent from '~/components/PageFoot'
import NavComponent from '~/components/Nav'
import NaviconComponent from '~/components/Navicon'
import { AppManager, ua } from '~/assets/scripts/index'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    NavComponent,
    NaviconComponent,
  },
  mounted () {
    window.App = new AppManager()
  },
  computed: {
    isFontLoaded() {
      return this.$store.state.isFontLoaded
    }
  },
  methods: {
    loadWebfont() {
      return new Promise((resolve, reject) => {
        const webFont = require('webfontloader')

        webFont.load({
          classes: false,
          timeout: 10000,
          google: {
            families: ['Fjalla One:n4'],
          },
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
    ua.init()
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
.c-mask
  position: fixed
  //z-index: 3
  top: 0
  left: -9999px
  width: 100%
  height: 100%
  background: rgba(#000, .8)
  overflow: hidden

  .is-menuOpened &, .is-domLoading &
    left: 0

  .is-domLoading:not(.is-menuOpened) &
    z-index: 99

.c-shadow
  position: fixed;
  z-index: 4;


</style>

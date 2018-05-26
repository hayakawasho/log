<template lang="pug">
extends ../_include/_base

block vars
  - var id = "home"

block content
  .o-singlePageScroll
    .o-singlePageScroll__items(data-module="ViewportHeight, SinglePageScroll")
      section.o-singlePageScroll__item.u-flex.u-flex--c
        .c-jumbotron__content.u-flex.u-flex--v-c
          h2(data-module="StaggerTo" data-target="._str" data-delay=".1" data-stagger='.01')
            +splitStr('GREEN SPRINGS', '_str')
      section.o-singlePageScroll__item.u-flex.u-flex--c
        .c-jumbotron__content.u-flex.u-flex--v-c
          h2(data-module="StaggerTo" data-target="._str" data-delay=".1" data-stagger='.01')
            +splitStr('EDO TOMOE', '_str')
      section.o-singlePageScroll__item.u-flex.u-flex--c
        .c-jumbotron__content.u-flex.u-flex--v-c
          h2 MITSUI & CO.<br>MACHINE TECH
      section.o-singlePageScroll__item.u-flex.u-flex--c
        .c-jumbotron__content.u-flex.u-flex--v-c
          h2 THE GUITER IS<br>FOREVER


</template>

<script>

export default {
  //props: ['post'],
	//data() {
	// },
  //computed: {
    //hasEyecatch() {
      //return this.post.featured_media > 0
    // },
    //getEyecatch() {
      //let eyecatch;
      //if (Object.keys(this.post._embedded['wp:featuredmedia'][0].media_details.sizes).length > 0) {
      //  eyecatch = this.post._embedded['wp:featuredmedia'][0].media_details.sizes.theme_eyecatch.source_url
      //} else {
      //  eyecatch = this.post._embedded['wp:featuredmedia'][0].source_url
      //}
      //return eyecatch;
    //},
  //},
}
</script>

<style lang="stylus" scoped>
.c-jumbotron
  position relative
  width 70%
  height 60%

  &__content
    width 100%
    height 100%
    color #fff

    h2
      position relative
      z-index 2
      font-family var(--font-en)
      font-size 5.4vw
      letter-spacing .26em
      margin-left 1.7em
      width 100%
      font-weight normal

  .js-slider-canvas
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;


</style>

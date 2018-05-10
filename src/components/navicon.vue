<template lang="pug">
include ../_include/mixins/_index.pug

button.c-navicon(data-target=".g-menu")
  .c-navicon__in
    - for(var i = 1; i < 6; i++)
      .c-navicon__line.js-line(class=`_${i}`)
        span

</template>

<script>

export default {
  methods: {

  }
}


</script>

<style lang="stylus" scoped>
button
  border: none
  cursor: pointer
  outline: none
  padding: 0
  -webkit-appearance: none
  -moz-appearance: none
  appearance: none

.c-navicon
  cursor: pointer
  position: relative
  width: 100%
  height: 100%
  background: #333

  &:before
    content: ""
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    transform: scaleY(0)
    transform-origin: top
    transition: transform .4s easeInOutCubic
    background: #000
    opacity: .5

  &:hover
    &:before
      transform: scaleY(1)
      transform-origin: bottom

  &__in
    width: 2.4rem
    height: 2.4rem
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    margin: auto

    @media (--sp)
      width: 1.6rem
      height: 1.6rem

  &__line
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    margin: auto
    width: 100%
    height: 2px

    > span
      display: block
      width: 100%
      height: 100%
      background: #fff

    &._1
      transform: translateY(-6px)

      @media (--sp)
        transform: translateY(-4px)

    &._3
      transform: translateY(6px)

      @media (--sp)
        transform: translateY(4px)

    &._4
      transform: rotateZ(45deg)
      > span
        transform: scaleX(0)

    &._5
      transform: rotateZ(-45deg)
      > span
        transform: scaleX(0)

</style>

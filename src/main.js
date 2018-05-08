"use strict";

import '~/assets/scripts/polyfills'
import { TweenMax } from 'gsap'
import { AppManager } from "~/assets/scripts/index"

(function () {
  window.App = new AppManager();
})();

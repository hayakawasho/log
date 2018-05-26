
/**
 * 指定したkey名のカスタムイベントを送信する
 * @method send
 * @param {string} key カスタムイベント名
 * @param {object} value データ
 * document.getElementsByTagName('button')[0].onclick = () => dispatch('app:ping', 'pong');
 */

export const dispatch = (key, value) => {
  let ev;
  try {
    ev = new CustomEvent(key, {
      detail: value
    });
  } catch (e) { // for IE
    ev = document.createEvent('CustomEvent');
    ev.initCustomEvent(key, false, false, value);
  }
  document.body.dispatchEvent(ev);
};

/**
 * カスタムイベントのリスナーを登録する
 * @method listen
 * @param {string} key カスタムイベント名
 * @param {Function} callback イベントリスナーから呼ばれる関数
 * listen('app:ping', (e) => alert(`ping - ${e.detail}`));
 */
export const listen = (key, callback) => {
  document.body.addEventListener(key, callback);
};


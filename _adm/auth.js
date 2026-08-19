/* ============================================================
   AUTH GATE — Painel interno de convites (uso do Thiago)
   Proteção client-side: redireciona p/ login.html se não autenticado.
   Trocar a senha: edite PASS_HASH abaixo com o sha256 da nova senha.
   ============================================================ */
(function () {
  var PASS_HASH = 'd011cdfe0e7be792752e33886c3854d9c65bb67bb952a8f60bb6652584753107'; // sha256("convites@2026")
  var TOKEN_KEY = 'admconvites_auth';

  // Base URL a partir do próprio script (funciona em file:// e http(s)://)
  var SCRIPT = document.currentScript && document.currentScript.src;
  var BASE = SCRIPT ? SCRIPT.slice(0, SCRIPT.lastIndexOf('/') + 1) : '';
  var LOGIN = BASE + 'login.html';

  // SHA-256 (implementação pura JS, funciona offline/file://)
  function sha256(ascii) {
    function rightRotate(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j;
    var result = '';
    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    var hash = sha256.h = sha256.h || [];
    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) { isComposite[i] = candidate; }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while (ascii[lengthProperty] % 64 - 56) { ascii += '\x00'; }
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) { return ''; }
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength);
    for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16);
      var oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var a = hash[0], e = hash[4];
        var temp1 = hash[7]
          + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
          + ((e & hash[5]) ^ ((~e) & hash[6]))
          + k[i]
          + (w[i] = (i < 16) ? w[i] : (
              w[i - 16]
              + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
              + w[i - 7]
              + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
            ) | 0);
        var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
          + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }
    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        var b = (hash[i] >> (j * 8)) & 255;
        result += ((b < 16) ? 0 : '') + b.toString(16);
      }
    }
    return result;
  }

  function currentPath() {
    return encodeURIComponent(location.pathname + location.search + location.hash);
  }

  // Expõe sha256 + constantes SEMPRE (login.html usa; não depende de auth)
  window.__auth = {
    sha256: sha256,
    PASS_HASH: PASS_HASH,
    TOKEN_KEY: TOKEN_KEY
  };

  var token = sessionStorage.getItem(TOKEN_KEY);

  // Se já estiver na página de login, não redireciona
  if (location.pathname.indexOf('login.html') !== -1) {
    return;
  }

  if (token !== PASS_HASH) {
    // Marca origem e manda pro login
    sessionStorage.setItem('admconvites_target', currentPath());
    location.replace(LOGIN + '?target=' + currentPath());
    return;
  }
})();

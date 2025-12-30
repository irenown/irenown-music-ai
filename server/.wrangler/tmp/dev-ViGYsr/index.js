var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .wrangler/tmp/bundle-oqTlZj/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-oqTlZj/checked-fetch.js"() {
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/node-wav/index.js
var require_node_wav = __commonJS({
  "node_modules/node-wav/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var data_decoders = {
      pcm8: (buffer, offset, output, channels, samples) => {
        let input = new Uint8Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let data = input[pos++] - 128;
            output[ch][i] = data < 0 ? data / 128 : data / 127;
          }
        }
      },
      pcm16: (buffer, offset, output, channels, samples) => {
        let input = new Int16Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let data = input[pos++];
            output[ch][i] = data < 0 ? data / 32768 : data / 32767;
          }
        }
      },
      pcm24: (buffer, offset, output, channels, samples) => {
        let input = new Uint8Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let x0 = input[pos++];
            let x1 = input[pos++];
            let x2 = input[pos++];
            let xx = x0 + (x1 << 8) + (x2 << 16);
            let data = xx > 8388608 ? xx - 16777216 : xx;
            output[ch][i] = data < 0 ? data / 8388608 : data / 8388607;
          }
        }
      },
      pcm32: (buffer, offset, output, channels, samples) => {
        let input = new Int32Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let data = input[pos++];
            output[ch][i] = data < 0 ? data / 2147483648 : data / 2147483647;
          }
        }
      },
      pcm32f: (buffer, offset, output, channels, samples) => {
        let input = new Float32Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch)
            output[ch][i] = input[pos++];
        }
      },
      pcm64f: (buffer, offset, output, channels, samples) => {
        let input = new Float64Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch)
            output[ch][i] = input[pos++];
        }
      }
    };
    var data_encoders = {
      pcm8: (buffer, offset, input, channels, samples) => {
        let output = new Uint8Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let v = Math.max(-1, Math.min(input[ch][i], 1));
            v = (v * 0.5 + 0.5) * 255 | 0;
            output[pos++] = v;
          }
        }
      },
      pcm16: (buffer, offset, input, channels, samples) => {
        let output = new Int16Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let v = Math.max(-1, Math.min(input[ch][i], 1));
            v = (v < 0 ? v * 32768 : v * 32767) | 0;
            output[pos++] = v;
          }
        }
      },
      pcm24: (buffer, offset, input, channels, samples) => {
        let output = new Uint8Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let v = Math.max(-1, Math.min(input[ch][i], 1));
            v = (v < 0 ? 16777216 + v * 8388608 : v * 8388607) | 0;
            output[pos++] = v >> 0 & 255;
            output[pos++] = v >> 8 & 255;
            output[pos++] = v >> 16 & 255;
          }
        }
      },
      pcm32: (buffer, offset, input, channels, samples) => {
        let output = new Int32Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let v = Math.max(-1, Math.min(input[ch][i], 1));
            v = (v < 0 ? v * 2147483648 : v * 2147483647) | 0;
            output[pos++] = v;
          }
        }
      },
      pcm32f: (buffer, offset, input, channels, samples) => {
        let output = new Float32Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let v = Math.max(-1, Math.min(input[ch][i], 1));
            output[pos++] = v;
          }
        }
      },
      pcm64f: (buffer, offset, input, channels, samples) => {
        let output = new Float64Array(buffer, offset);
        let pos = 0;
        for (let i = 0; i < samples; ++i) {
          for (let ch = 0; ch < channels; ++ch) {
            let v = Math.max(-1, Math.min(input[ch][i], 1));
            output[pos++] = v;
          }
        }
      }
    };
    function lookup(table, bitDepth, floatingPoint) {
      let name = "pcm" + bitDepth + (floatingPoint ? "f" : "");
      let fn = table[name];
      if (!fn)
        throw new TypeError("Unsupported data format: " + name);
      return fn;
    }
    __name(lookup, "lookup");
    function decode(buffer) {
      let pos = 0, end = 0;
      if (buffer.buffer) {
        pos = buffer.byteOffset;
        end = buffer.length;
        buffer = buffer.buffer;
      } else {
        pos = 0;
        end = buffer.byteLength;
      }
      let v = new DataView(buffer);
      function u8() {
        let x = v.getUint8(pos);
        pos++;
        return x;
      }
      __name(u8, "u8");
      function u16() {
        let x = v.getUint16(pos, true);
        pos += 2;
        return x;
      }
      __name(u16, "u16");
      function u32() {
        let x = v.getUint32(pos, true);
        pos += 4;
        return x;
      }
      __name(u32, "u32");
      function string(len) {
        let str = "";
        for (let i = 0; i < len; ++i)
          str += String.fromCharCode(u8());
        return str;
      }
      __name(string, "string");
      if (string(4) !== "RIFF")
        throw new TypeError("Invalid WAV file");
      u32();
      if (string(4) !== "WAVE")
        throw new TypeError("Invalid WAV file");
      let fmt;
      while (pos < end) {
        let type = string(4);
        let size = u32();
        let next = pos + size;
        switch (type) {
          case "fmt ":
            let formatId = u16();
            if (formatId !== 1 && formatId !== 3)
              throw new TypeError("Unsupported format in WAV file: " + formatId.toString(16));
            fmt = {
              format: "lpcm",
              floatingPoint: formatId === 3,
              channels: u16(),
              sampleRate: u32(),
              byteRate: u32(),
              blockSize: u16(),
              bitDepth: u16()
            };
            break;
          case "data":
            if (!fmt)
              throw new TypeError('Missing "fmt " chunk.');
            let samples = Math.floor(size / fmt.blockSize);
            let channels = fmt.channels;
            let sampleRate = fmt.sampleRate;
            let channelData = [];
            for (let ch = 0; ch < channels; ++ch)
              channelData[ch] = new Float32Array(samples);
            lookup(data_decoders, fmt.bitDepth, fmt.floatingPoint)(buffer, pos, channelData, channels, samples);
            return {
              sampleRate,
              channelData
            };
            break;
        }
        pos = next;
      }
    }
    __name(decode, "decode");
    function encode(channelData, opts) {
      let sampleRate = opts.sampleRate || 16e3;
      let floatingPoint = !!(opts.float || opts.floatingPoint);
      let bitDepth = floatingPoint ? 32 : opts.bitDepth | 0 || 16;
      let channels = channelData.length;
      let samples = channelData[0].length;
      let buffer = new ArrayBuffer(44 + samples * channels * (bitDepth >> 3));
      let v = new DataView(buffer);
      let pos = 0;
      function u8(x) {
        v.setUint8(pos++, x);
      }
      __name(u8, "u8");
      function u16(x) {
        v.setUint16(pos, x, true);
        pos += 2;
      }
      __name(u16, "u16");
      function u32(x) {
        v.setUint32(pos, x, true);
        pos += 4;
      }
      __name(u32, "u32");
      function string(s) {
        for (var i = 0; i < s.length; ++i)
          u8(s.charCodeAt(i));
      }
      __name(string, "string");
      string("RIFF");
      u32(buffer.byteLength - 8);
      string("WAVE");
      string("fmt ");
      u32(16);
      u16(floatingPoint ? 3 : 1);
      u16(channels);
      u32(sampleRate);
      u32(sampleRate * channels * (bitDepth >> 3));
      u16(channels * (bitDepth >> 3));
      u16(bitDepth);
      string("data");
      u32(buffer.byteLength - 44);
      lookup(data_encoders, bitDepth, floatingPoint)(buffer, pos, channelData, channels, samples);
      return Buffer(buffer);
    }
    __name(encode, "encode");
    module.exports = {
      decode,
      encode
    };
  }
});

// node_modules/music-tempo/dist/node/OnsetDetection.js
var require_OnsetDetection = __commonJS({
  "node_modules/music-tempo/dist/node/OnsetDetection.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    (function(global, factory) {
      if (typeof define === "function" && define.amd) {
        define(["module", "exports"], factory);
      } else if (typeof exports !== "undefined") {
        factory(module, exports);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod, mod.exports);
        global.OnsetDetection = mod.exports;
      }
    })(exports, function(module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      __name(_classCallCheck, "_classCallCheck");
      var _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        __name(defineProperties, "defineProperties");
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      var OnsetDetection = function() {
        function OnsetDetection2() {
          _classCallCheck(this, OnsetDetection2);
        }
        __name(OnsetDetection2, "OnsetDetection");
        _createClass(OnsetDetection2, null, [{
          key: "calculateSF",
          value: /* @__PURE__ */ __name(function calculateSF(audioData, fft) {
            var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
            if (typeof fft == "undefined") {
              throw new ReferenceError("fft is undefined");
            }
            if (typeof fft.getHammingWindow !== "function" || typeof fft.getSpectrum !== "function") {
              throw new ReferenceError("fft doesn't contain getHammingWindow or getSpectrum methods");
            }
            if (!Array.prototype.fill) {
              Array.prototype.fill = function(value2) {
                if (this == null) {
                  throw new TypeError("this is null or not defined");
                }
                var O = Object(this);
                var len = O.length >>> 0;
                var start = arguments[1];
                var relativeStart = start >> 0;
                var k2 = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
                var end = arguments[2];
                var relativeEnd = end === void 0 ? len : end >> 0;
                var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
                while (k2 < final) {
                  O[k2] = value2;
                  k2++;
                }
                return O;
              };
            }
            params.bufferSize = params.bufferSize || 2048;
            params.hopSize = params.hopSize || 441;
            var bufferSize = params.bufferSize, hopSize = params.hopSize;
            var k = Math.floor(Math.log(bufferSize) / Math.LN2);
            if (Math.pow(2, k) !== bufferSize) {
              throw "Invalid buffer size (" + bufferSize + "), must be power of 2";
            }
            var hammWindow = fft.getHammingWindow(bufferSize);
            var spectralFlux = [];
            var spectrumLength = bufferSize / 2 + 1;
            var previousSpectrum = new Array(spectrumLength);
            previousSpectrum.fill(0);
            var im = new Array(bufferSize);
            var length = audioData.length;
            var zerosStart = new Array(bufferSize - hopSize);
            zerosStart.fill(0);
            audioData = zerosStart.concat(audioData);
            var zerosEnd = new Array(bufferSize - audioData.length % hopSize);
            zerosEnd.fill(0);
            audioData = audioData.concat(zerosEnd);
            for (var wndStart = 0; wndStart < length; wndStart += hopSize) {
              var wndEnd = wndStart + bufferSize;
              var re = [];
              var _k = 0;
              for (var i = wndStart; i < wndEnd; i++) {
                re[_k] = hammWindow[_k] * audioData[i];
                _k++;
              }
              im.fill(0);
              fft.getSpectrum(re, im);
              var flux = 0;
              for (var j = 0; j < spectrumLength; j++) {
                var value = re[j] - previousSpectrum[j];
                flux += value < 0 ? 0 : value;
              }
              spectralFlux.push(flux);
              previousSpectrum = re;
            }
            return spectralFlux;
          }, "calculateSF")
        }, {
          key: "normalize",
          value: /* @__PURE__ */ __name(function normalize(data) {
            if (!Array.isArray(data)) {
              throw "Array expected";
            }
            if (data.length == 0) {
              throw "Array is empty";
            }
            var sum = 0;
            var squareSum = 0;
            for (var i = 0; i < data.length; i++) {
              sum += data[i];
              squareSum += data[i] * data[i];
            }
            var mean = sum / data.length;
            var standardDeviation = Math.sqrt((squareSum - sum * mean) / data.length);
            if (standardDeviation == 0)
              standardDeviation = 1;
            for (var _i = 0; _i < data.length; _i++) {
              data[_i] = (data[_i] - mean) / standardDeviation;
            }
          }, "normalize")
        }, {
          key: "findPeaks",
          value: /* @__PURE__ */ __name(function findPeaks(spectralFlux) {
            var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var length = spectralFlux.length;
            var sf = spectralFlux;
            var decayRate = params.decayRate || 0.84;
            var peakFindingWindow = params.peakFindingWindow || 6;
            var meanWndMultiplier = params.meanWndMultiplier || 3;
            var peakThreshold = params.peakThreshold || 0.35;
            var max = 0;
            var av = sf[0];
            var peaks = [];
            for (var i = 0; i < length; i++) {
              av = decayRate * av + (1 - decayRate) * sf[i];
              if (sf[i] < av)
                continue;
              var wndStart = i - peakFindingWindow;
              var wndEnd = i + peakFindingWindow + 1;
              if (wndStart < 0)
                wndStart = 0;
              if (wndEnd > length)
                wndEnd = length;
              if (av < sf[i])
                av = sf[i];
              var isMax = true;
              for (var j = wndStart; j < wndEnd; j++) {
                if (sf[j] > sf[i])
                  isMax = false;
              }
              if (isMax) {
                var meanWndStart = i - peakFindingWindow * meanWndMultiplier;
                var meanWndEnd = i + peakFindingWindow;
                if (meanWndStart < 0)
                  meanWndStart = 0;
                if (meanWndEnd > length)
                  meanWndEnd = length;
                var sum = 0;
                var count = meanWndEnd - meanWndStart;
                for (var _j = meanWndStart; _j < meanWndEnd; _j++) {
                  sum += sf[_j];
                }
                if (sf[i] > sum / count + peakThreshold) {
                  peaks.push(i);
                }
              }
            }
            if (peaks.length < 2) {
              throw "Fail to find peaks";
            }
            return peaks;
          }, "findPeaks")
        }]);
        return OnsetDetection2;
      }();
      exports2.default = OnsetDetection;
      module2.exports = exports2["default"];
    });
  }
});

// node_modules/music-tempo/dist/node/TempoInduction.js
var require_TempoInduction = __commonJS({
  "node_modules/music-tempo/dist/node/TempoInduction.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    (function(global, factory) {
      if (typeof define === "function" && define.amd) {
        define(["module", "exports"], factory);
      } else if (typeof exports !== "undefined") {
        factory(module, exports);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod, mod.exports);
        global.TempoInduction = mod.exports;
      }
    })(exports, function(module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      __name(_classCallCheck, "_classCallCheck");
      var _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        __name(defineProperties, "defineProperties");
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      var TempoInduction = function() {
        function TempoInduction2() {
          _classCallCheck(this, TempoInduction2);
        }
        __name(TempoInduction2, "TempoInduction");
        _createClass(TempoInduction2, null, [{
          key: "processRhythmicEvents",
          value: /* @__PURE__ */ __name(function processRhythmicEvents(events) {
            var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var widthTreshold = params.widthTreshold || 0.025, maxIOI = params.maxIOI || 2.5, minIOI = params.minIOI || 0.07, length = events.length;
            var clIntervals = [], clSizes = [], clCount = 0;
            for (var i = 0; i < length - 1; i++) {
              for (var j = i + 1; j < length; j++) {
                var ioi = events[j] - events[i];
                if (ioi < minIOI) {
                  continue;
                }
                if (ioi > maxIOI) {
                  break;
                }
                var k = 0;
                for (; k < clCount; k++) {
                  if (Math.abs(clIntervals[k] - ioi) < widthTreshold) {
                    if (Math.abs(clIntervals[k + 1] - ioi) < Math.abs(clIntervals[k] - ioi) && k < clCount - 1) {
                      k++;
                    }
                    clIntervals[k] = (clIntervals[k] * clSizes[k] + ioi) / (clSizes[k] + 1);
                    clSizes[k]++;
                    break;
                  }
                }
                if (k != clCount)
                  continue;
                clCount++;
                for (; k > 0 && clIntervals[k - 1] > ioi; k--) {
                  clIntervals[k] = clIntervals[k - 1];
                  clSizes[k] = clSizes[k - 1];
                }
                clIntervals[k] = ioi;
                clSizes[k] = 1;
              }
            }
            if (clCount == 0) {
              throw "Fail to find IOIs";
            }
            clIntervals.length = clCount;
            clSizes.length = clCount;
            return { clIntervals, clSizes };
          }, "processRhythmicEvents")
        }, {
          key: "mergeClusters",
          value: /* @__PURE__ */ __name(function mergeClusters(clusters) {
            var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var widthTreshold = params.widthTreshold || 0.025;
            var clIntervals = clusters.clIntervals, clSizes = clusters.clSizes;
            var clCount = clIntervals.length;
            for (var i = 0; i < clCount; i++) {
              for (var j = i + 1; j < clCount; j++) {
                if (Math.abs(clIntervals[i] - clIntervals[j]) < widthTreshold) {
                  clIntervals[i] = (clIntervals[i] * clSizes[i] + clIntervals[j] * clSizes[j]) / (clSizes[i] + clSizes[j]);
                  clSizes[i] = clSizes[i] + clSizes[j];
                  --clCount;
                  for (var k = j + 1; k <= clCount; k++) {
                    clIntervals[k - 1] = clIntervals[k];
                    clSizes[k - 1] = clSizes[k];
                  }
                }
              }
            }
            clIntervals.length = clCount;
            clSizes.length = clCount;
            return { clIntervals, clSizes };
          }, "mergeClusters")
        }, {
          key: "calculateScore",
          value: /* @__PURE__ */ __name(function calculateScore(clusters) {
            var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var widthTreshold = params.widthTreshold || 0.025;
            var maxTempos = params.maxTempos || 10;
            var clIntervals = clusters.clIntervals, clSizes = clusters.clSizes, clScores = [], clScoresIdxs = [];
            var clCount = clIntervals.length;
            for (var i = 0; i < clCount; i++) {
              clScores[i] = 10 * clSizes[i];
              clScoresIdxs[i] = { score: clScores[i], idx: i };
            }
            clScoresIdxs.sort(function(a, b) {
              return b.score - a.score;
            });
            if (clScoresIdxs.length > maxTempos) {
              for (var _i = maxTempos - 1; _i < clScoresIdxs.length - 1; _i++) {
                if (clScoresIdxs[_i].score == clScoresIdxs[_i + 1].score) {
                  maxTempos++;
                } else {
                  break;
                }
              }
              clScoresIdxs.length = maxTempos;
            }
            clScoresIdxs = clScoresIdxs.map(function(a) {
              return a.idx;
            });
            for (var _i2 = 0; _i2 < clCount; _i2++) {
              for (var j = _i2 + 1; j < clCount; j++) {
                var ratio = clIntervals[_i2] / clIntervals[j];
                var isFraction = ratio < 1;
                var d = void 0, err = void 0;
                d = isFraction ? Math.round(1 / ratio) : Math.round(ratio);
                if (d < 2 || d > 8)
                  continue;
                if (isFraction)
                  err = Math.abs(clIntervals[_i2] * d - clIntervals[j]);
                else
                  err = Math.abs(clIntervals[_i2] - clIntervals[j] * d);
                var errTreshold = isFraction ? widthTreshold : widthTreshold * d;
                if (err >= errTreshold)
                  continue;
                d = d >= 5 ? 1 : 6 - d;
                clScores[_i2] += d * clSizes[j];
                clScores[j] += d * clSizes[_i2];
              }
            }
            return { clScores, clScoresIdxs };
          }, "calculateScore")
        }, {
          key: "createTempoList",
          value: /* @__PURE__ */ __name(function createTempoList(clusters) {
            var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var widthTreshold = params.widthTreshold || 0.025, minBeatInterval = params.minBeatInterval || 0.3, maxBeatInterval = params.maxBeatInterval || 1;
            var clIntervals = clusters.clIntervals, clSizes = clusters.clSizes, clScores = clusters.clScores, clScoresIdxs = clusters.clScoresIdxs, tempoList = [];
            var clCount = clIntervals.length;
            for (var i = 0; i < clScoresIdxs.length; i++) {
              var idx = clScoresIdxs[i];
              var newSum = clIntervals[idx] * clScores[idx];
              var newWeight = clScores[idx];
              var err = void 0, errTreshold = void 0;
              for (var j = 0; j < clCount; j++) {
                if (j == idx)
                  continue;
                var ratio = clIntervals[idx] / clIntervals[j];
                var isFraction = ratio < 1;
                var sumInc = 0;
                var d = isFraction ? Math.round(1 / ratio) : Math.round(ratio);
                if (d < 2 || d > 8)
                  continue;
                if (isFraction) {
                  err = Math.abs(clIntervals[idx] * d - clIntervals[j]);
                  errTreshold = widthTreshold;
                } else {
                  err = Math.abs(clIntervals[idx] - d * clIntervals[j]);
                  errTreshold = widthTreshold * d;
                }
                if (err >= errTreshold)
                  continue;
                if (isFraction) {
                  newSum += clIntervals[j] / d * clScores[j];
                } else {
                  newSum += clIntervals[j] * d * clScores[j];
                }
                newWeight += clScores[j];
              }
              var beat = newSum / newWeight;
              while (beat < minBeatInterval) {
                beat *= 2;
              }
              while (beat > maxBeatInterval) {
                beat /= 2;
              }
              tempoList.push(beat);
            }
            return tempoList;
          }, "createTempoList")
        }]);
        return TempoInduction2;
      }();
      exports2.default = TempoInduction;
      module2.exports = exports2["default"];
    });
  }
});

// node_modules/music-tempo/dist/node/Agent.js
var require_Agent = __commonJS({
  "node_modules/music-tempo/dist/node/Agent.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    (function(global, factory) {
      if (typeof define === "function" && define.amd) {
        define(["module", "exports"], factory);
      } else if (typeof exports !== "undefined") {
        factory(module, exports);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod, mod.exports);
        global.Agent = mod.exports;
      }
    })(exports, function(module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      __name(_classCallCheck, "_classCallCheck");
      var _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        __name(defineProperties, "defineProperties");
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      var Agent = function() {
        function Agent2(tempo, firstBeatTime, firsteventScore, agentList) {
          var params = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
          _classCallCheck(this, Agent2);
          this.expiryTime = params.expiryTime || 10;
          this.toleranceWndInner = params.toleranceWndInner || 0.04;
          this.toleranceWndPre = params.toleranceWndPre || 0.15;
          this.toleranceWndPost = params.toleranceWndPost || 0.3;
          this.toleranceWndPre *= tempo;
          this.toleranceWndPost *= tempo;
          this.correctionFactor = params.correctionFactor || 50;
          this.maxChange = params.maxChange || 0.2;
          this.penaltyFactor = params.penaltyFactor || 0.5;
          this.beatInterval = tempo;
          this.initialBeatInterval = tempo;
          this.beatTime = firstBeatTime;
          this.totalBeatCount = 1;
          this.events = [firstBeatTime];
          this.score = firsteventScore;
          this.agentListRef = agentList;
        }
        __name(Agent2, "Agent");
        _createClass(Agent2, [{
          key: "considerEvent",
          value: /* @__PURE__ */ __name(function considerEvent(eventTime, eventScore) {
            if (eventTime - this.events[this.events.length - 1] > this.expiryTime) {
              this.score = -1;
              return false;
            }
            var beatCount = Math.round((eventTime - this.beatTime) / this.beatInterval);
            var err = eventTime - this.beatTime - beatCount * this.beatInterval;
            if (beatCount > 0 && err >= -this.toleranceWndPre && err <= this.toleranceWndPost) {
              if (Math.abs(err) > this.toleranceWndInner) {
                this.agentListRef.push(this.clone());
              }
              this.acceptEvent(eventTime, eventScore, err, beatCount);
              return true;
            }
            return false;
          }, "considerEvent")
        }, {
          key: "acceptEvent",
          value: /* @__PURE__ */ __name(function acceptEvent(eventTime, eventScore, err, beatCount) {
            this.beatTime = eventTime;
            this.events.push(eventTime);
            var corrErr = err / this.correctionFactor;
            if (Math.abs(this.initialBeatInterval - this.beatInterval - corrErr) < this.maxChange * this.initialBeatInterval) {
              this.beatInterval += corrErr;
            }
            this.totalBeatCount += beatCount;
            var errFactor = err > 0 ? err / this.toleranceWndPost : err / -this.toleranceWndPre;
            var scoreFactor = 1 - this.penaltyFactor * errFactor;
            this.score += eventScore * scoreFactor;
          }, "acceptEvent")
        }, {
          key: "fillBeats",
          value: /* @__PURE__ */ __name(function fillBeats() {
            var prevBeat = void 0, nextBeat = void 0, currentInterval = void 0, beats = void 0;
            prevBeat = 0;
            if (this.events.length > 2) {
              prevBeat = this.events[0];
            }
            for (var i = 0; i < this.events.length; i++) {
              nextBeat = this.events[i];
              beats = Math.round((nextBeat - prevBeat) / this.beatInterval - 0.01);
              currentInterval = (nextBeat - prevBeat) / beats;
              var k = 0;
              for (; beats > 1; beats--) {
                prevBeat += currentInterval;
                this.events.splice(i + k, 0, prevBeat);
                k++;
              }
              prevBeat = nextBeat;
            }
          }, "fillBeats")
        }, {
          key: "clone",
          value: /* @__PURE__ */ __name(function clone() {
            var newAgent = new Agent2();
            newAgent.beatInterval = this.beatInterval;
            newAgent.initialBeatInterval = this.initialBeatInterval;
            newAgent.beatTime = this.beatTime;
            newAgent.totalBeatCount = this.totalBeatCount;
            newAgent.events = this.events.slice();
            newAgent.expiryTime = this.expiryTime;
            newAgent.toleranceWndInner = this.toleranceWndInner;
            newAgent.toleranceWndPre = this.toleranceWndPre;
            newAgent.toleranceWndPost = this.toleranceWndPost;
            newAgent.correctionFactor = this.correctionFactor;
            newAgent.maxChange = this.maxChange;
            newAgent.penaltyFactor = this.penaltyFactor;
            newAgent.score = this.score;
            newAgent.agentListRef = this.agentListRef;
            return newAgent;
          }, "clone")
        }]);
        return Agent2;
      }();
      exports2.default = Agent;
      module2.exports = exports2["default"];
    });
  }
});

// node_modules/music-tempo/dist/node/BeatTracking.js
var require_BeatTracking = __commonJS({
  "node_modules/music-tempo/dist/node/BeatTracking.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    (function(global, factory) {
      if (typeof define === "function" && define.amd) {
        define(["module", "exports", "./Agent"], factory);
      } else if (typeof exports !== "undefined") {
        factory(module, exports, require_Agent());
      } else {
        var mod = {
          exports: {}
        };
        factory(mod, mod.exports, global.Agent);
        global.BeatTracking = mod.exports;
      }
    })(exports, function(module2, exports2, _Agent) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      var _Agent2 = _interopRequireDefault(_Agent);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      __name(_interopRequireDefault, "_interopRequireDefault");
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      __name(_classCallCheck, "_classCallCheck");
      var _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        __name(defineProperties, "defineProperties");
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      var BeatTracking = function() {
        function BeatTracking2() {
          _classCallCheck(this, BeatTracking2);
        }
        __name(BeatTracking2, "BeatTracking");
        _createClass(BeatTracking2, null, [{
          key: "trackBeat",
          value: /* @__PURE__ */ __name(function trackBeat(events, eventsScores, tempoList) {
            var params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
            var initPeriod = params.initPeriod || 5, thresholdBI = params.thresholdBI || 0.02, thresholdBT = params.thresholdBT || 0.04;
            function removeSimilarAgents() {
              agents.sort(function(a1, a2) {
                return a1.beatInterval - a2.beatInterval;
              });
              var length = agents.length;
              for (var i2 = 0; i2 < length; i2++) {
                if (agents[i2].score < 0)
                  continue;
                for (var _j = i2 + 1; _j < length; _j++) {
                  if (agents[_j].beatInterval - agents[i2].beatInterval > thresholdBI) {
                    break;
                  }
                  if (Math.abs(agents[_j].beatTime - agents[i2].beatTime) > thresholdBT) {
                    continue;
                  }
                  if (agents[i2].score < agents[_j].score) {
                    agents[i2].score = -1;
                  } else {
                    agents[_j].score = -1;
                  }
                }
              }
              for (var _i = length - 1; _i >= 0; _i--) {
                if (agents[_i].score < 0) {
                  agents.splice(_i, 1);
                }
              }
            }
            __name(removeSimilarAgents, "removeSimilarAgents");
            var agents = [];
            for (var i = 0; i < tempoList.length; i++) {
              agents.push(new _Agent2.default(tempoList[i], events[0], eventsScores[0], agents, params));
            }
            var j = 1;
            removeSimilarAgents();
            while (events[j] < initPeriod) {
              var agentsLength = agents.length;
              var prevBeatInterval = -1;
              var isEventAccepted = true;
              for (var k = 0; k < agentsLength; k++) {
                if (agents[k].beatInterval != prevBeatInterval) {
                  if (!isEventAccepted) {
                    agents.push(new _Agent2.default(prevBeatInterval, events[j], eventsScores[j], agents, params));
                  }
                  prevBeatInterval = agents[k].beatInterval;
                  isEventAccepted = false;
                }
                isEventAccepted = agents[k].considerEvent(events[j], eventsScores[j]) || isEventAccepted;
              }
              removeSimilarAgents();
              j++;
            }
            var eventsLength = events.length;
            for (var _i2 = j; _i2 < eventsLength; _i2++) {
              var _agentsLength = agents.length;
              for (var _j2 = 0; _j2 < _agentsLength; _j2++) {
                agents[_j2].considerEvent(events[_i2], eventsScores[_i2]);
              }
              removeSimilarAgents();
            }
            return agents;
          }, "trackBeat")
        }]);
        return BeatTracking2;
      }();
      exports2.default = BeatTracking;
      module2.exports = exports2["default"];
    });
  }
});

// node_modules/music-tempo/dist/node/FFT.js
var require_FFT = __commonJS({
  "node_modules/music-tempo/dist/node/FFT.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    (function(global, factory) {
      if (typeof define === "function" && define.amd) {
        define(["module", "exports"], factory);
      } else if (typeof exports !== "undefined") {
        factory(module, exports);
      } else {
        var mod = {
          exports: {}
        };
        factory(mod, mod.exports);
        global.FFT = mod.exports;
      }
    })(exports, function(module2, exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      __name(_classCallCheck, "_classCallCheck");
      var _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        __name(defineProperties, "defineProperties");
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();
      var FFT = function() {
        function FFT2() {
          _classCallCheck(this, FFT2);
        }
        __name(FFT2, "FFT");
        _createClass(FFT2, null, [{
          key: "getHammingWindow",
          value: /* @__PURE__ */ __name(function getHammingWindow(bufferSize) {
            var a = 25 / 46;
            var b = 21 / 46;
            var scale = 1 / bufferSize / 0.54;
            var sqrtBufferSize = Math.sqrt(bufferSize);
            var factor = Math.PI * 2 / bufferSize;
            var wnd = [];
            for (var i = 0; i < bufferSize; i++) {
              wnd[i] = sqrtBufferSize * (scale * (a - b * Math.cos(factor * i)));
            }
            return wnd;
          }, "getHammingWindow")
        }, {
          key: "getSpectrum",
          value: /* @__PURE__ */ __name(function getSpectrum(re, im) {
            var direction = -1;
            var n = re.length;
            var bits = Math.round(Math.log(n) / Math.log(2));
            var twoPI = Math.PI * 2;
            if (n != 1 << bits)
              throw new Error("FFT data must be power of 2");
            var localN = void 0;
            var j = 0;
            for (var i = 0; i < n - 1; i++) {
              if (i < j) {
                var temp = re[j];
                re[j] = re[i];
                re[i] = temp;
                temp = im[j];
                im[j] = im[i];
                im[i] = temp;
              }
              var k = n / 2;
              while (k >= 1 && k - 1 < j) {
                j = j - k;
                k = k / 2;
              }
              j = j + k;
            }
            for (var m = 1; m <= bits; m++) {
              localN = 1 << m;
              var Wjk_r = 1;
              var Wjk_i = 0;
              var theta = twoPI / localN;
              var Wj_r = Math.cos(theta);
              var Wj_i = direction * Math.sin(theta);
              var nby2 = localN / 2;
              for (j = 0; j < nby2; j++) {
                for (var _k = j; _k < n; _k += localN) {
                  var id = _k + nby2;
                  var tempr = Wjk_r * re[id] - Wjk_i * im[id];
                  var tempi = Wjk_r * im[id] + Wjk_i * re[id];
                  re[id] = re[_k] - tempr;
                  im[id] = im[_k] - tempi;
                  re[_k] += tempr;
                  im[_k] += tempi;
                }
                var wtemp = Wjk_r;
                Wjk_r = Wj_r * Wjk_r - Wj_i * Wjk_i;
                Wjk_i = Wj_r * Wjk_i + Wj_i * wtemp;
              }
            }
            for (var _i = 0; _i < re.length; _i++) {
              var pow = re[_i] * re[_i] + im[_i] * im[_i];
              re[_i] = pow;
            }
            for (var _i2 = 0; _i2 < re.length; _i2++) {
              re[_i2] = Math.sqrt(re[_i2]);
            }
          }, "getSpectrum")
        }]);
        return FFT2;
      }();
      exports2.default = FFT;
      module2.exports = exports2["default"];
    });
  }
});

// node_modules/music-tempo/dist/node/MusicTempo.js
var require_MusicTempo = __commonJS({
  "node_modules/music-tempo/dist/node/MusicTempo.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    (function(global, factory) {
      if (typeof define === "function" && define.amd) {
        define(["module", "exports", "./OnsetDetection", "./TempoInduction", "./BeatTracking", "./FFT"], factory);
      } else if (typeof exports !== "undefined") {
        factory(module, exports, require_OnsetDetection(), require_TempoInduction(), require_BeatTracking(), require_FFT());
      } else {
        var mod = {
          exports: {}
        };
        factory(mod, mod.exports, global.OnsetDetection, global.TempoInduction, global.BeatTracking, global.FFT);
        global.MusicTempo = mod.exports;
      }
    })(exports, function(module2, exports2, _OnsetDetection, _TempoInduction, _BeatTracking, _FFT) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      var _OnsetDetection2 = _interopRequireDefault(_OnsetDetection);
      var _TempoInduction2 = _interopRequireDefault(_TempoInduction);
      var _BeatTracking2 = _interopRequireDefault(_BeatTracking);
      var _FFT2 = _interopRequireDefault(_FFT);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      __name(_interopRequireDefault, "_interopRequireDefault");
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      __name(_classCallCheck, "_classCallCheck");
      var MusicTempo2 = (
        /**
         * Constructor
         * @param {Float32Array} audioData - non-interleaved IEEE 32-bit linear PCM with a nominal range of -1 -> +1 (Web Audio API - Audio Buffer)
         * @param {Object} [params={}] - parameters
         * @param {Number} [params.bufferSize=2048] - FFT windows size
         * @param {Number} [params.hopSize=441] - spacing of audio frames in samples
         * @param {Number} [params.decayRate=0.84] - how quickly previous peaks are forgotten
         * @param {Number} [params.peakFindingWindow=6] - minimum distance between peaks
         * @param {Number} [params.meanWndMultiplier=3] - multiplier for peak finding window
         * @param {Number} [params.peakThreshold=0.35] - minimum value of peaks
         * @param {Number} [params.widthTreshold=0.025] - the maximum difference in IOIs which are in the same cluster
         * @param {Number} [params.maxIOI=2.5] - the maximum IOI for inclusion in a cluster
         * @param {Number} [params.minIOI=0.07] - the minimum IOI for inclusion in a cluster
         * @param {Number} [params.maxTempos=10] - initial amount of tempo hypotheses
         * @param {Number} [params.minBeatInterval=0.3] - the minimum inter-beat interval (IBI) (0.30 seconds == 200 BPM)
         * @param {Number} [params.maxBeatInterval=1] - the maximum inter-beat interval (IBI) (1.00 seconds ==  60 BPM)
         * @param {Number} [params.initPeriod=5] - duration of the initial section
         * @param {Number} [params.thresholdBI=0.02] - for the purpose of removing duplicate agents, the default JND of IBI
         * @param {Number} [params.thresholdBT=0.04] - for the purpose of removing duplicate agents, the default JND of phase
         * @param {Number} [params.expiryTime=10] - the time after which an Agent that has not accepted any beat will be destroyed
         * @param {Number} [params.toleranceWndInner=0.04] - the maximum time that a beat can deviate from the predicted beat time without a fork occurring
         * @param {Number} [params.toleranceWndPre=0.15] - the maximum amount by which a beat can be earlier than the predicted beat time, expressed as a fraction of the beat period
         * @param {Number} [params.toleranceWndPost=0.3] - the maximum amount by which a beat can be later than the predicted beat time, expressed as a fraction of the beat period
         * @param {Number} [params.correctionFactor=50] - correction factor for updating beat period
         * @param {Number} [params.maxChange=0.2] - the maximum allowed deviation from the initial tempo, expressed as a fraction of the initial beat period
         * @param {Number} [params.penaltyFactor=0.5] - factor for correcting score, if onset do not coincide precisely with predicted beat time
         */
        /* @__PURE__ */ __name(function MusicTempo3(audioData) {
          var _this = this;
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          _classCallCheck(this, MusicTempo3);
          if (audioData instanceof Float32Array) {
            if (!Array.from) {
              Array.from = function() {
                var toStr = Object.prototype.toString;
                var isCallable = /* @__PURE__ */ __name(function isCallable2(fn) {
                  return typeof fn === "function" || toStr.call(fn) === "[object Function]";
                }, "isCallable");
                var toInteger = /* @__PURE__ */ __name(function toInteger2(value) {
                  var number = Number(value);
                  if (isNaN(number)) {
                    return 0;
                  }
                  if (number === 0 || !isFinite(number)) {
                    return number;
                  }
                  return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
                }, "toInteger");
                var maxSafeInteger = Math.pow(2, 53) - 1;
                var toLength = /* @__PURE__ */ __name(function toLength2(value) {
                  var len = toInteger(value);
                  return Math.min(Math.max(len, 0), maxSafeInteger);
                }, "toLength");
                return /* @__PURE__ */ __name(function from(arrayLike) {
                  var C = this;
                  var items = Object(arrayLike);
                  if (arrayLike == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                  }
                  var mapFn = arguments.length > 1 ? arguments[1] : void 0;
                  var T;
                  if (typeof mapFn !== "undefined") {
                    if (!isCallable(mapFn)) {
                      throw new TypeError("Array.from: when provided, the second argument must be a function");
                    }
                    if (arguments.length > 2) {
                      T = arguments[2];
                    }
                  }
                  var len = toLength(items.length);
                  var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                  var k = 0;
                  var kValue;
                  while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                      A[k] = typeof T === "undefined" ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                      A[k] = kValue;
                    }
                    k += 1;
                  }
                  A.length = len;
                  return A;
                }, "from");
              }();
            }
            audioData = Array.from(audioData);
          } else if (!Array.isArray(audioData)) {
            throw "audioData is not an array";
          }
          var timeStep = params.timeStep || 0.01;
          var res = _OnsetDetection2.default.calculateSF(audioData, _FFT2.default, params);
          this.spectralFlux = res;
          _OnsetDetection2.default.normalize(this.spectralFlux);
          this.peaks = _OnsetDetection2.default.findPeaks(this.spectralFlux, params);
          this.events = this.peaks.map(function(a) {
            return a * timeStep;
          });
          var clusters = _TempoInduction2.default.processRhythmicEvents(this.events, params);
          clusters = _TempoInduction2.default.mergeClusters(clusters, params);
          var scores = _TempoInduction2.default.calculateScore(clusters, params);
          clusters = {
            clIntervals: clusters.clIntervals,
            clSizes: clusters.clSizes,
            clScores: scores.clScores,
            clScoresIdxs: scores.clScoresIdxs
          };
          this.tempoList = _TempoInduction2.default.createTempoList(clusters, params);
          var minSFValue = this.spectralFlux.reduce(function(a, b) {
            return Math.min(a, b);
          });
          var eventsScores = this.peaks.map(function(a) {
            return _this.spectralFlux[a] - minSFValue;
          });
          this.agents = _BeatTracking2.default.trackBeat(this.events, eventsScores, this.tempoList, params);
          var bestScore = -1;
          var idxBestAgent = -1;
          this.tempo = -1;
          this.beats = [];
          this.beatInterval = -1;
          for (var i = 0; i < this.agents.length; i++) {
            if (this.agents[i].score > bestScore) {
              bestScore = this.agents[i].score;
              idxBestAgent = i;
            }
          }
          if (this.agents[idxBestAgent]) {
            this.bestAgent = this.agents[idxBestAgent];
            this.bestAgent.fillBeats();
            this.tempo = (60 / this.bestAgent.beatInterval).toFixed(3);
            this.beatInterval = this.bestAgent.beatInterval;
            this.beats = this.bestAgent.events;
          }
          if (this.tempo == -1) {
            throw "Tempo extraction failed";
          }
        }, "MusicTempo")
      );
      exports2.default = MusicTempo2;
      module2.exports = exports2["default"];
    });
  }
});

// .wrangler/tmp/bundle-oqTlZj/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-oqTlZj/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/compose.js
init_checked_fetch();
init_modules_watch_stub();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/request.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/http-exception.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/request/constants.js
init_checked_fetch();
init_modules_watch_stub();
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_modules_watch_stub();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
init_checked_fetch();
init_modules_watch_stub();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = /* @__PURE__ */ __name(class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// node_modules/hono/dist/utils/html.js
init_checked_fetch();
init_modules_watch_stub();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  };
}, "Context");

// node_modules/hono/dist/router.js
init_checked_fetch();
init_modules_watch_stub();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// node_modules/hono/dist/utils/constants.js
init_checked_fetch();
init_modules_watch_stub();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "_Hono");

// node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/matcher.js
init_checked_fetch();
init_modules_watch_stub();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "_Node");

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_checked_fetch();
init_modules_watch_stub();
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
}, "RegExpRouter");

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_modules_watch_stub();
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = /* @__PURE__ */ __name(class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "_Node");

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// node_modules/hono/dist/middleware/cors/index.js
init_checked_fetch();
init_modules_watch_stub();
var cors = /* @__PURE__ */ __name((options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// node_modules/hono/dist/middleware/logger/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/utils/color.js
init_checked_fetch();
init_modules_watch_stub();
function getColorEnabled() {
  const { process, Deno } = globalThis;
  const isNoColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : process !== void 0 ? (
    // eslint-disable-next-line no-unsafe-optional-chaining
    "NO_COLOR" in process?.env
  ) : false;
  return !isNoColor;
}
__name(getColorEnabled, "getColorEnabled");
async function getColorEnabledAsync() {
  const { navigator } = globalThis;
  const cfWorkers = "cloudflare:workers";
  const isNoColor = navigator !== void 0 && navigator.userAgent === "Cloudflare-Workers" ? await (async () => {
    try {
      return "NO_COLOR" in ((await import(cfWorkers)).env ?? {});
    } catch {
      return false;
    }
  })() : !getColorEnabled();
  return !isNoColor;
}
__name(getColorEnabledAsync, "getColorEnabledAsync");

// node_modules/hono/dist/middleware/logger/index.js
var humanize = /* @__PURE__ */ __name((times) => {
  const [delimiter, separator] = [",", "."];
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter));
  return orderTimes.join(separator);
}, "humanize");
var time = /* @__PURE__ */ __name((start) => {
  const delta = Date.now() - start;
  return humanize([delta < 1e3 ? delta + "ms" : Math.round(delta / 1e3) + "s"]);
}, "time");
var colorStatus = /* @__PURE__ */ __name(async (status) => {
  const colorEnabled = await getColorEnabledAsync();
  if (colorEnabled) {
    switch (status / 100 | 0) {
      case 5:
        return `\x1B[31m${status}\x1B[0m`;
      case 4:
        return `\x1B[33m${status}\x1B[0m`;
      case 3:
        return `\x1B[36m${status}\x1B[0m`;
      case 2:
        return `\x1B[32m${status}\x1B[0m`;
    }
  }
  return `${status}`;
}, "colorStatus");
async function log(fn, prefix, method, path, status = 0, elapsed) {
  const out = prefix === "<--" ? `${prefix} ${method} ${path}` : `${prefix} ${method} ${path} ${await colorStatus(status)} ${elapsed}`;
  fn(out);
}
__name(log, "log");
var logger = /* @__PURE__ */ __name((fn = console.log) => {
  return /* @__PURE__ */ __name(async function logger2(c, next) {
    const { method, url } = c.req;
    const path = url.slice(url.indexOf("/", 8));
    await log(fn, "<--", method, path);
    const start = Date.now();
    await next();
    await log(fn, "-->", method, path, c.res.status, time(start));
  }, "logger2");
}, "logger");

// node_modules/uuid/dist/esm-browser/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/uuid/dist/esm-browser/rng.js
init_checked_fetch();
init_modules_watch_stub();
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
__name(rng, "rng");

// node_modules/uuid/dist/esm-browser/stringify.js
init_checked_fetch();
init_modules_watch_stub();
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
__name(unsafeStringify, "unsafeStringify");

// node_modules/uuid/dist/esm-browser/v4.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/uuid/dist/esm-browser/native.js
init_checked_fetch();
init_modules_watch_stub();
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = {
  randomUUID
};

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
__name(v4, "v4");
var v4_default = v4;

// services/database.js
init_checked_fetch();
init_modules_watch_stub();
var DatabaseService = class {
  constructor(db) {
    this.db = db;
  }
  // Generic Methods
  prepare(sql) {
    return this.db.prepare(sql);
  }
  // Project Logic
  async saveProject(project) {
    return await this.db.prepare(`
            INSERT INTO projects (id, user_id, name, genre, bpm, mix_url, instrumental_url, vocal_url, quality, storage_provider, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                mix_url = excluded.mix_url,
                instrumental_url = excluded.instrumental_url,
                vocal_url = excluded.vocal_url,
                status = excluded.status,
                bpm = excluded.bpm,
                updated_at = CURRENT_TIMESTAMP
        `).bind(
      project.id || null,
      project.user_id || null,
      project.name || null,
      project.genre || null,
      project.bpm || null,
      project.mix_url || null,
      project.instrumental_url || null,
      project.vocal_url || null,
      project.quality || "standard",
      project.storage_provider || "r2",
      project.status || "completed"
    ).run();
  }
  async updateProjectStatus(projectId, status) {
    return await this.db.prepare("UPDATE projects SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(status, projectId).run();
  }
  async getUserProjects(userId) {
    const { results } = await this.db.prepare("SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC").bind(userId).all();
    return results;
  }
  async getProjectById(projectId) {
    return await this.db.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId).first();
  }
  async deleteProject(projectId) {
    return await this.db.prepare("DELETE FROM projects WHERE id = ?").bind(projectId).run();
  }
  // Usage Tracking Logic
  async checkUsageLimit(userId, tier) {
    const currentMonth = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
    const usage = await this.db.prepare(`
            SELECT * FROM usage_tracking 
            WHERE user_id = ? AND month = ?
            `).bind(userId, currentMonth).first();
    const limits = {
      silver: 20,
      gold: 50,
      platinum: 100
    };
    const limit = limits[tier] || 0;
    const used = usage ? usage.standard_count : 0;
    return {
      used,
      limit,
      remaining: limit - used,
      canGenerate: used < limit
    };
  }
  async incrementUsage(userId, isPremium2 = false) {
    const currentMonth = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
    const column = isPremium2 ? "premium_count" : "standard_count";
    return await this.db.prepare(`
            INSERT INTO usage_tracking(user_id, month, ${column}) 
            VALUES(?, ?, 1)
            ON CONFLICT(user_id, month) DO UPDATE SET 
                ${column} = ${column} + 1,
            updated_at = CURRENT_TIMESTAMP
                `).bind(userId, currentMonth).run();
  }
  // Auth Logic
  async getUserByApiKey(apiKey) {
    return await this.db.prepare("SELECT * FROM users WHERE api_key = ?").bind(apiKey).first();
  }
  async getUserByEmail(email) {
    return await this.db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
  }
  async getUserById(userId) {
    return await this.db.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first();
  }
  async createUser(user) {
    return await this.db.prepare(`
            INSERT INTO users(id, username, email, password_hash, api_key, tier)
            VALUES(?, ?, ?, ?, ?, ?)
                `).bind(
      user.id || null,
      user.username || null,
      user.email || null,
      user.password_hash || null,
      user.api_key || null,
      user.tier || "silver"
    ).run();
  }
  async updateUserId(oldId, newId) {
    const user = await this.getUserById(oldId);
    if (!user)
      return false;
    const tempSuffix = `_mig_${Date.now()}`;
    try {
      await this.db.prepare(`
                INSERT INTO users(id, username, email, password_hash, api_key, tier, stripe_customer_id, subscription_id, subscription_status, premium_credits, created_at)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `).bind(
        newId,
        `${user.username}${tempSuffix}`,
        user.email ? `${user.email}${tempSuffix}` : null,
        // append to email if exists 
        user.password_hash,
        `${user.api_key}${tempSuffix}`,
        user.tier,
        user.stripe_customer_id,
        user.subscription_id,
        user.subscription_status,
        user.premium_credits,
        user.created_at
      ).run();
      await this.db.prepare("UPDATE projects SET user_id = ? WHERE user_id = ?").bind(newId, oldId).run();
      await this.db.prepare("UPDATE usage_tracking SET user_id = ? WHERE user_id = ?").bind(newId, oldId).run();
      await this.db.prepare("DELETE FROM users WHERE id = ?").bind(oldId).run();
      await this.db.prepare(`
                UPDATE users 
                SET username = ?, email = ?, api_key = ?
            WHERE id = ?
                `).bind(user.username, user.email, user.api_key, newId).run();
      return true;
    } catch (error) {
      console.error("Migration failed:", error);
      throw error;
    }
  }
  async usernameExists(username) {
    const result = await this.db.prepare("SELECT 1 FROM users WHERE username = ?").bind(username).first();
    return !!result;
  }
};
__name(DatabaseService, "DatabaseService");
var database_default = DatabaseService;

// services/storageService.js
init_checked_fetch();
init_modules_watch_stub();
var StorageService = class {
  constructor(bucket) {
    this.bucket = bucket;
  }
  /**
   * Uploads a file (as ArrayBuffer or ReadableStream) to R2
   */
  async uploadFile(data, key, contentType) {
    if (!this.bucket) {
      console.warn(`[Storage] R2 Bucket not configured. Mocking upload for ${key}`);
      return key;
    }
    await this.bucket.put(key, data, {
      httpMetadata: { contentType }
    });
    return key;
  }
  /**
   * Generates a signed URL for a file (Using a custom Worker endpoint or R2 public URL)
   * For now, we'll return the key or a projected URL if public access is enabled.
   * In a real Worker, you'd usually serve these via another route or a public bucket domain.
   */
  async getSignedUrl(key) {
    return `/api/storage/${key}`;
  }
  /**
   * Fetches a file from R2
   */
  async getFile(key) {
    const object = await this.bucket.get(key);
    if (!object)
      return null;
    return object;
  }
  /**
   * Deletes a file from R2
   */
  async deleteFile(key) {
    await this.bucket.delete(key);
  }
};
__name(StorageService, "StorageService");
var storageService_default = StorageService;

// services/vocalEnhancement.js
init_checked_fetch();
init_modules_watch_stub();

// services/elevenLabsApi.js
init_checked_fetch();
init_modules_watch_stub();
var ElevenLabsService = class {
  /**
   * Cleans/Isolates vocals from an audio buffer
   * @param {ArrayBuffer} audioBuffer - Raw audio data
   * @param {Object} env - Cloudflare environment bindings
   * @returns {Promise<ArrayBuffer>} - Processed audio
   */
  async isolateVoice(audioBuffer, env) {
    const apiKey = env.PRODUCTION_AI_KEY_1;
    console.log(`Sending buffer to ElevenLabs for voice isolation`);
    const formData = new FormData();
    formData.append("audio", new Blob([audioBuffer]), "vocal.wav");
    const response = await fetch("https://api.elevenlabs.io/v1/audio-isolation", {
      method: "POST",
      headers: {
        "xi-api-key": apiKey
      },
      body: formData
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ElevenLabs Isolation Failed: ${error}`);
    }
    return await response.arrayBuffer();
  }
  /**
   * Generates music using ElevenLabs Music (Premium)
   */
  async generateMusic(params, env) {
    const apiKey = env.PRODUCTION_AI_KEY_1;
    console.log(`Generating Music with ElevenLabs: ${params.prompt}`);
    const response = await fetch("https://api.elevenlabs.io/v1/text-to-sound-effects", {
      // Use correct music/sound endpoint
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: params.prompt,
        duration_seconds: params.duration || 30,
        prompt_influence: 0.7
      })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ElevenLabs Music Generation Failed: ${error}`);
    }
    return await response.arrayBuffer();
  }
};
__name(ElevenLabsService, "ElevenLabsService");
var elevenLabsApi_default = new ElevenLabsService();

// services/vocalEnhancement.js
var VocalEnhancementService = class {
  /**
   * Enhances a vocal track buffer
   * For Cloudflare, we'll use ElevenLabs Isolation as the primary enhancer
   */
  async enhance(vocalBuffer, env) {
    console.log(`Enhancing vocal buffer...`);
    try {
      const enhanced = await elevenLabsApi_default.isolateVoice(vocalBuffer, env);
      console.log(`Vocal enhancement complete.`);
      return enhanced;
    } catch (error) {
      console.error("Vocal Enhancement Failed:", error.message);
      return vocalBuffer;
    }
  }
};
__name(VocalEnhancementService, "VocalEnhancementService");
var vocalEnhancement_default = new VocalEnhancementService();

// services/queueService.js
init_checked_fetch();
init_modules_watch_stub();

// services/audioAnalysis.js
init_checked_fetch();
init_modules_watch_stub();
var import_node_wav = __toESM(require_node_wav(), 1);
var import_music_tempo = __toESM(require_MusicTempo(), 1);
var AudioAnalysisService = class {
  /**
   * Analyzes an audio buffer
   * @param {ArrayBuffer|Buffer} buffer - Raw audio data
   * @returns {Promise<Object>} - Analysis results
   */
  async analyze(buffer) {
    try {
      console.log(`Analyzing audio buffer...`);
      const result = import_node_wav.default.decode(new Uint8Array(buffer));
      const sampleRate = result.sampleRate;
      const channelData = result.channelData[0];
      const mt = new import_music_tempo.default(channelData);
      const bpm = Math.round(mt.tempo);
      const duration = channelData.length / sampleRate;
      const key = "C Major";
      return {
        bpm,
        key,
        duration: parseFloat(duration.toFixed(2)),
        confidence: mt.tempoConf || 0.5
      };
    } catch (error) {
      console.error("Audio Analysis Error:", error);
      throw new Error(`Failed to analyze audio: ${error.message}`);
    }
  }
};
__name(AudioAnalysisService, "AudioAnalysisService");
var audioAnalysis_default = new AudioAnalysisService();

// services/stabilityApi.js
init_checked_fetch();
init_modules_watch_stub();
var StabilityService = class {
  /**
   * Generates music based on a prompt
   */
  async generateMusic({ prompt, bpm, duration = 30 }, env) {
    const apiKey = env.PRODUCTION_AI_KEY_2;
    if (!apiKey) {
      throw new Error("PRODUCTION_AI_KEY_2 is not configured");
    }
    const fullPrompt = `${prompt}, ${bpm} BPM, studio quality, professional instrumental, no vocals`;
    console.log(`Requesting music generation from Stability AI: "${fullPrompt}"`);
    const response = await fetch("https://api.stability.ai/v2/generate/audio", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
      },
      body: JSON.stringify({
        model: "stable-audio",
        prompt: fullPrompt,
        seconds_total: Math.min(duration, 47),
        steps: 100
      })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stability AI generation failed: ${response.status} ${error}`);
    }
    return await response.arrayBuffer();
  }
};
__name(StabilityService, "StabilityService");
var stabilityApi_default = new StabilityService();

// services/audioProcessor.js
init_checked_fetch();
init_modules_watch_stub();
var AudioProcessor = class {
  /**
   * Mixes vocal and instrumental buffers using Cloudinary
   */
  async mixTracks(vocalBuffer, instrumentalBuffer, env) {
    const cloudName = env.ASSET_MANAGER_ID;
    const apiKey = env.ASSET_MANAGER_KEY;
    const apiSecret = env.ASSET_MANAGER_SECRET;
    console.log(`Mixing via Cloudinary...`);
    try {
      const instUpload = await this.uploadToCloudinary(instrumentalBuffer, "inst", env);
      const instId = instUpload.public_id;
      const vocalUpload = await this.uploadToCloudinary(vocalBuffer, "vocal", env);
      const vocalId = vocalUpload.public_id.replace(/\//g, ":");
      const mixUrl = `https://res.cloudinary.com/${cloudName}/video/upload/l_video:${vocalId},fl_layer_apply/${instId}.mp3`;
      console.log(`Cloudinary Mix URL: ${mixUrl}`);
      const response = await fetch(mixUrl);
      if (!response.ok)
        throw new Error(`Failed to fetch mix from Cloudinary: ${response.statusText}`);
      return await response.arrayBuffer();
    } catch (error) {
      console.error("Cloudinary Mixing Failed:", error.message);
      throw error;
    }
  }
  /**
   * Helper to upload buffer to Cloudinary using signed upload
   */
  async uploadToCloudinary(buffer, folder, env) {
    const cloudName = env.ASSET_MANAGER_ID;
    const apiKey = env.ASSET_MANAGER_KEY;
    const apiSecret = env.ASSET_MANAGER_SECRET;
    const timestamp = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
    const signatureStr = `folder=temp_mix/${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = await this.sha1(signatureStr);
    const formData = new FormData();
    formData.append("file", new Blob([buffer]));
    formData.append("folder", `temp_mix/${folder}`);
    formData.append("timestamp", timestamp);
    formData.append("api_key", apiKey);
    formData.append("signature", signature);
    formData.append("resource_type", "video");
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cloudinary Upload Failed: ${error}`);
    }
    return await response.json();
  }
  /**
   * Simple SHA1 implementation for Cloudinary signature
   */
  async sha1(str) {
    const msgUint8 = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }
};
__name(AudioProcessor, "AudioProcessor");
var audioProcessor_default = new AudioProcessor();

// services/queueService.js
var QueueService = class {
  constructor(env) {
    this.env = env;
    this.db = new database_default(env.DB);
    this.storage = new storageService_default(env.BUCKET);
  }
  /**
   * Entry point for processing a job from the queue
   */
  async processJob(data) {
    const { projectId, userId, username, vocalKey, vocalFilename, bpm, genre, name, tier } = data;
    try {
      console.log(`[QueueWorker] Starting Job ${projectId} for ${username}`);
      const vocalObject = await this.storage.getFile(vocalKey);
      if (!vocalObject)
        throw new Error(`Vocal file not found: ${vocalKey}`);
      const vocalBuffer = await vocalObject.arrayBuffer();
      const augmentedVocal = await vocalEnhancement_default.enhance(vocalBuffer, this.env);
      const analysis = await audioAnalysis_default.analyze(vocalBuffer);
      const finalBpm = bpm || analysis.bpm;
      console.log(`[TEMP] Generating silent instrumental track (${analysis.duration}s)`);
      const sampleRate = 44100;
      const numSamples = Math.floor(analysis.duration * sampleRate);
      const wavHeader = this.createWavHeader(numSamples, sampleRate);
      const silentSamples = new Uint8Array(numSamples * 2);
      const instrumentalBuffer = new Uint8Array(wavHeader.length + silentSamples.length);
      instrumentalBuffer.set(wavHeader, 0);
      instrumentalBuffer.set(silentSamples, wavHeader.length);
      const mixedAudio = await audioProcessor_default.mixTracks(augmentedVocal, instrumentalBuffer, this.env);
      const mixKey = `output/${projectId}.mp3`;
      await this.storage.uploadFile(mixedAudio, mixKey, "audio/mpeg");
      const instKey = `instrumentals/${projectId}.wav`;
      await this.storage.uploadFile(instrumentalBuffer, instKey, "audio/wav");
      const projectData = {
        id: projectId,
        user_id: userId,
        name,
        genre,
        bpm: parseInt(finalBpm),
        mix_url: await this.storage.getSignedUrl(mixKey),
        instrumental_url: await this.storage.getSignedUrl(instKey),
        vocal_url: await this.storage.getSignedUrl(vocalKey),
        quality: isPremium ? "premium" : "standard",
        status: "completed",
        storage_provider: "r2"
      };
      await this.db.saveProject(projectData);
      await this.db.incrementUsage(userId, isPremium);
      console.log(`[QueueWorker] Job ${projectId} Successful!`);
      return projectData;
    } catch (error) {
      console.error(`[QueueWorker] Job ${projectId} Failed:`, error.message);
      await this.env.DB.prepare("UPDATE projects SET status = ? WHERE id = ?").bind("failed", projectId).run();
      throw error;
    }
  }
  /**
   * Creates a WAV file header
   */
  createWavHeader(numSamples, sampleRate = 44100) {
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * bitsPerSample / 8;
    const blockAlign = numChannels * bitsPerSample / 8;
    const dataSize = numSamples * blockAlign;
    const buffer = new ArrayBuffer(44);
    const view = new DataView(buffer);
    view.setUint32(0, 1380533830, false);
    view.setUint32(4, 36 + dataSize, true);
    view.setUint32(8, 1463899717, false);
    view.setUint32(12, 1718449184, false);
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    view.setUint32(36, 1684108385, false);
    view.setUint32(40, dataSize, true);
    return new Uint8Array(buffer);
  }
};
__name(QueueService, "QueueService");
var queueService_default = QueueService;

// index.js
var app = new Hono2();
app.use("*", logger());
app.use("*", cors());
app.get("/health", (c) => {
  return c.json({
    status: "operational",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    version: "2.0.0-edge",
    platform: "Cloudflare Workers"
  });
});
app.post("/api/auth/register", async (c) => {
  const db = new database_default(c.env.DB);
  try {
    const { username, email, firebaseId } = await c.req.json();
    if (!email || !firebaseId) {
      return c.json({ error: "Email and Firebase ID are required" }, 400);
    }
    let user = await db.getUserById(firebaseId);
    if (user) {
      return c.json({
        message: "Profile synchronized",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          tier: user.tier,
          api_key: user.api_key
        }
      }, 200);
    }
    user = await db.getUserByEmail(email);
    if (user) {
      console.log(`Migrating user ${user.id} to new ID ${firebaseId}`);
      await db.updateUserId(user.id, firebaseId);
      user = await db.getUserById(firebaseId);
    } else {
      let finalUsername = username || email.split("@")[0];
      const baseUsername = finalUsername;
      let counter = 1;
      while (await db.usernameExists(finalUsername)) {
        finalUsername = `${baseUsername}${Math.floor(Math.random() * 1e3)}`;
        counter++;
        if (counter > 10)
          break;
      }
      const apiKey = `ir_${v4_default().replace(/-/g, "")}`;
      await db.createUser({
        id: firebaseId,
        username: finalUsername,
        email,
        api_key: apiKey,
        tier: "silver"
      });
      user = await db.getUserById(firebaseId);
    }
    return c.json({
      message: "Profile synchronized",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        tier: user.tier,
        api_key: user.api_key
      }
    }, 201);
  } catch (error) {
    console.error("Registration/Sync Error:", error);
    return c.json({ error: "Failed to sync user profile: " + error.message }, 500);
  }
});
app.get("/api/projects", async (c) => {
  const db = new database_default(c.env.DB);
  const apiKey = c.req.header("x-api-key");
  const user = await db.getUserByApiKey(apiKey);
  if (!user)
    return c.json({ error: "Unauthorized" }, 401);
  try {
    const projects = await db.getUserProjects(user.id);
    return c.json(projects);
  } catch (error) {
    return c.json({ error: "Failed to fetch projects" }, 500);
  }
});
app.post("/api/debug-produce", async (c) => {
  try {
    const db = new database_default(c.env.DB);
    const storage = new storageService_default(c.env.BUCKET);
    const apiKey = c.req.header("x-api-key");
    let user = await db.getUserByApiKey(apiKey);
    if (!user) {
      const result = await c.env.DB.prepare("SELECT * FROM users LIMIT 1").first();
      if (result)
        user = result;
      else
        return c.json({ error: "No users found for debug" }, 401);
    }
    const formData = await c.req.formData();
    const vocalFile = formData.get("vocal");
    const genre = formData.get("genre") || "pop";
    const name = formData.get("name") || "Debug Project";
    const bpm = formData.get("bpm");
    if (!vocalFile)
      return c.json({ error: "Vocal file required" }, 400);
    const jobId = "debug-" + v4_default();
    const vocalKey = `projects/${user.id}/${jobId}/vocal`;
    await db.saveProject({
      id: jobId,
      user_id: user.id,
      name,
      genre,
      bpm: bpm ? parseInt(bpm) : null,
      vocal_url: vocalKey,
      status: "processing",
      quality: "standard"
    });
    await storage.uploadFile(await vocalFile.arrayBuffer(), vocalKey, vocalFile.type);
    const queueService = new queueService_default(c.env);
    console.log("Starting synchronous debug job...");
    try {
      const result = await queueService.processJob({
        projectId: jobId,
        userId: user.id,
        username: user.username,
        vocalKey,
        vocalFilename: vocalFile.name,
        bpm: bpm ? parseInt(bpm) : null,
        genre,
        name,
        tier: user.tier
      });
      return c.json({ status: "success", result });
    } catch (processError) {
      return c.json({
        status: "failed",
        error: processError.message,
        stack: processError.stack
      }, 500);
    }
  } catch (error) {
    return c.json({ error: error.message, stack: error.stack }, 500);
  }
});
app.post("/api/produce", async (c) => {
  try {
    const db = new database_default(c.env.DB);
    const storage = new storageService_default(c.env.BUCKET);
    const apiKey = c.req.header("x-api-key");
    const user = await db.getUserByApiKey(apiKey);
    if (!user)
      return c.json({ error: "Unauthorized" }, 401);
    const formData = await c.req.formData();
    const vocalFile = formData.get("vocal");
    const genre = formData.get("genre") || "pop";
    const name = formData.get("name") || "Untitled Project";
    const bpm = formData.get("bpm");
    if (!vocalFile) {
      return c.json({ error: "Vocal file is required" }, 400);
    }
    const jobId = v4_default();
    const vocalKey = `projects/${user.id}/${jobId}/vocal`;
    await db.saveProject({
      id: jobId,
      user_id: user.id,
      name,
      genre,
      bpm: bpm ? parseInt(bpm) : null,
      vocal_url: vocalKey,
      // Temporary reference
      status: "processing",
      quality: user.tier === "platinum" || user.tier === "gold" ? "premium" : "standard"
    });
    await storage.uploadFile(await vocalFile.arrayBuffer(), vocalKey, vocalFile.type);
    const queueService = new queueService_default(c.env);
    c.executionCtx.waitUntil(async function() {
      try {
        await queueService.processJob({
          projectId: jobId,
          userId: user.id,
          username: user.username,
          vocalKey,
          vocalFilename: vocalFile.name,
          bpm: bpm ? parseInt(bpm) : null,
          genre,
          name,
          tier: user.tier
        });
      } catch (err) {
        console.error("Background Job Failed:", err);
      }
    }());
    return c.json({
      message: "Production started",
      jobId,
      statusUrl: `/api/jobs/${jobId}`
    }, 202);
  } catch (error) {
    console.error("Production Error:", error);
    return c.json({ error: "Failed to start production: " + error.message }, 500);
  }
});
app.get("/api/storage/:key", async (c) => {
  const storage = new storageService_default(c.env.BUCKET);
  const key = c.req.param("key");
  if (!key)
    return c.json({ error: "Key required" }, 400);
  const object = await storage.getFile(key);
  if (!object)
    return c.json({ error: "File not found" }, 404);
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  return new Response(object.body, {
    headers
  });
});
app.get("/api/user/usage", async (c) => {
  const db = new database_default(c.env.DB);
  const apiKey = c.req.header("x-api-key");
  const user = await db.getUserByApiKey(apiKey);
  if (!user)
    return c.json({ error: "Unauthorized" }, 401);
  try {
    const usage = await db.checkUsageLimit(user.id, user.tier);
    return c.json({
      tier: user.tier,
      usage
    });
  } catch (error) {
    console.error("Usage Fetch Error:", error);
    return c.json({ error: "Failed to fetch usage" }, 500);
  }
});
app.get("/api/user/invoices", async (c) => {
  const db = new database_default(c.env.DB);
  const apiKey = c.req.header("x-api-key");
  const user = await db.getUserByApiKey(apiKey);
  if (!user)
    return c.json({ error: "Unauthorized" }, 401);
  return c.json([]);
});
app.get("/api/jobs/:id", async (c) => {
  const db = new database_default(c.env.DB);
  const jobId = c.req.param("id");
  try {
    const project = await db.getProjectById(jobId);
    if (!project)
      return c.json({ error: "Job not found" }, 404);
    let progress = 0;
    switch (project.status) {
      case "processing":
        progress = 45;
        break;
      case "completed":
        progress = 100;
        break;
      case "failed":
        progress = 0;
        break;
      default:
        progress = 10;
    }
    return c.json({
      id: project.id,
      state: project.status,
      // processing, completed, failed
      progress,
      result: project.status === "completed" ? project : null
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch job status" }, 500);
  }
});
var server_default = {
  fetch: app.fetch
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// .wrangler/tmp/bundle-oqTlZj/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default
];
var middleware_insertion_facade_default = server_default;

// node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-oqTlZj/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map

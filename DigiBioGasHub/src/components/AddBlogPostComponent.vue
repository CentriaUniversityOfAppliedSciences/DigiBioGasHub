<template>
  <div>
    <umo-editor ref="editorRef" v-bind="options" @save="onSave"></umo-editor>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { UmoEditor } from '@umoteam/editor';
import axios from 'axios';
import { jwtDecode } from '../router/index';

export default defineComponent({
  name: 'AddBlogPostComponent',
  components: {
    UmoEditor,
  },
  setup() {
    const editorRef = ref(null);
    return { editorRef };
  },
  data() {
    return {
      postID: null,
      options: {
        "editorKey": "default",
        "locale": "en-US",
        "theme": "light",
        "height": "100%",
        "onFileUpload": this.processImg,
        "dicts": {
          "fonts": [
            {
              "label": {
                "en_US": "Default Font",

              },
              "value": null
            },
            {
              "label": {
                "en_US": "Songti",

              },
              "value": "SimSun"
            },
            {
              "label": {
                "en_US": "Heiti",

              },
              "value": "SimHei"
            },

            {
              "label": "Arial",
              "value": "Arial"
            },
            {
              "label": "Times New Roman",
              "value": "Times New Roman"
            },
            {
              "label": "Verdana",
              "value": "Verdana"
            },
            {
              "label": "Helvetica",
              "value": "Helvetica"
            },
            {
              "label": "Calibri",
              "value": "Calibri"
            },
            {
              "label": "Cambria",
              "value": "Cambria"
            },
            {
              "label": "Tahoma",
              "value": "Tahoma"
            },
            {
              "label": "Georgia",
              "value": "Georgia"
            },
            {
              "label": "Comic Sans MS",
              "value": "Comic Sans MS"
            },
            {
              "label": "Impact",
              "value": "Impact"
            }
          ],
          "colors": [
            "#FFF",
            "#000",
            "#4A5366",
            "#3B74EC",
            "#45A2EF",
            "#529867",
            "#CD4A3F",
            "#EA8D40",
            "#EEC543",
            "#8E45D0",
            "#F2F2F2",
            "#7F7F7F",
            "#F4F5F7",
            "#CBDCFC",
            "#E8F6FE",
            "#EDFAF2",
            "#FCEAE9",
            "#FDF3EC",
            "#FEF9E5",
            "#FAECFE",
            "#EEE",
            "#595959",
            "#C6CAD2",
            "#CEEBFD",
            "#CBDCFC",
            "#CBE9D7",
            "#F7CBC9",
            "#FADDC7",
            "#FDEEB5",
            "#EBCAFC",
            "#BFBFBF",
            "#3F3F3F",
            "#828B9D",
            "#A0BEFA",
            "#A7DCFC",
            "#A6D5B8",
            "#F2A19C",
            "#F5BC8C",
            "#FBE281",
            "#CB94F9",
            "#A5A5A5",
            "#262626",
            "#363B44",
            "#2452B2",
            "#3473A1",
            "#417A53",
            "#922B22",
            "#AD642A",
            "#9E8329",
            "#57297D",
            "#939393",
            "#0D0D0D",
            "#25272E",
            "#15316A",
            "#1C415A",
            "#284D34",
            "#511712",
            "#573213",
            "#635217",
            "#36194E"
          ],
          "lineHeights": [
            {
              "label": {
                "en_US": "Single",

              },
              "value": 1
            },
            {
              "label": {
                "en_US": "1.5 Line Spacing",

              },
              "value": 1.5,
              "default": true
            },
            {
              "label": {
                "en_US": "Double",

              },
              "value": 2
            },
            {
              "label": {
                "en_US": "2.5 Line Spacing",

              },
              "value": 2.5
            },
            {
              "label": {
                "en_US": "Triple",

              },
              "value": 3
            }
          ],
          "symbols": [
            {
              "label": {
                "en_US": "Plain Text",

              },
              "items": "‹›«»‘’“”‚„¡¿‥…‡‰‱‼⁈⁉⁇©®™§¶⁋"
            },
            {
              "label": {
                "en_US": "Currency Symbols",

              },
              "items": "$€¥£¢₠₡₢₣₤¤₿₥₦₧₨₩₪₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽"
            },
            {
              "label": {
                "en_US": "Mathematical Symbols",

              },
              "items": "<>≤≥–—¯‾°−±÷⁄×ƒ∫∑∞√∼≅≈≠≡∈∉∋∏∧∨¬∩∪∂∀∃∅∇∗∝∠¼½¾"
            },
            {
              "label": {
                "en_US": "Arrows",

              },
              "items": "←→↑↓⇐⇒⇑⇓⇠⇢⇡⇣⇤⇥⤒⤓↨"
            },
            {
              "label": {
                "en_US": "Latin Script",

              },
              "items": "ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſ"
            }
          ],
          "emojis": [
            {
              "label": {
                "en_US": "Emotions & People",

              },
              "items": "😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 🫠 😉 😊 😇 🥰 😍 🤩 😘 😗 ☺️ 😚 😙 🥲 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🫢 🫣 🤫 🤔 🫡 🤐 🤨 😐 😑 😶 🫥 😶‍🌫️ 😏 😒 🙄 😬 😮‍💨 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 🥵 🥶 🥴 😵 😵‍💫 🤯 🤠 🥳 🥸 😎 🤓 🧐 😕 🫤 😟 🙁 ☹️ 😮 😯 😲 😳 🥺 🥹 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 🥱 😤 😡 😠 🤬 😈 👿 💀 ☠️ 💩 🤡 👹 👺 👻 👽 👾 🤖 👋 🤚 🖐️ ✋ 🖖 🫱 🫲 🫳 🫴 👌 🤌 🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 🫵 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 🦻"
            },
            {
              "label": {
                "en_US": "Animals & Nature",

              },
              "items": "🐵 🐒 🦍 🦧 🐶 🐕 🦮 🐕‍🦺 🐩 🐺 🦊 🦝 🐱 🐈 🐈‍⬛ 🦁 🐯 🐅 🐆 🐴 🐎 🦄 🦓 🦌 🦬 🐮 🐂 🐃 🐄 🐷 🐖 🐗 🐽 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦣 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐇 🐿️ 🦫 🦔 🦇 🐻 🐻‍❄️ 🐨 🐼 🦥 🦦 🦨 🦘 🦡 🐾 🦃 🐔 🐓 🐣 🐤 🐥 🐦 🐧 🕊️ 🦅 🦆 🦢 🦉 🦤 🪶 🦩 🦚 🦜 🐸 🐊 🐢 🦎 🐍 🐲 🐉 🦕 🦖 🐳 🐋 🐬 🦭 🐟 🐠 🐡 🦈 🐙 🐚 🪸 🐌 🦋 🐛 🐜 🐝 🪲 🐞 🦗 🪳 🕷️ 🕸️ 🦂 🦟 🪰 🪱 🦠 💐 🌸 💮 🪷 🏵️ 🌹 🥀 🌺 🌻 🌼 🌷 🌱 🪴 🌲 🌳 🌴 🌵 🌾 🌿 ☘️ 🍀 🍁 🍂 🍃 🪹 🪺"
            },
            {
              "label": {
                "en_US": "Food & Drink",

              },
              "items": "🥬 🥦 🧄 🧅 🍄 🥜 🫘 🌰 🍞 🥐 🥖 🫓 🥨 🥯 🥞 🧇 🧀 🍖 🍗 🥩 🥓 🍔 🍟 🍕 🌭 🥪 🌮 🌯 🫔 🥙 🧆 🥚 🍳 🥘 🍲 🫕 🥣 🥗 🍿 🧈 🧂 🥫 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🍢 🍣 🍤 🍥 🥮 🍡 🥟 🥠 🥡 🦀 🦞 🦐 🦑 🦪 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🥧 🍫 🍬 🍭 🍮 🍯 🍼 🥛 ☕ 🫖 🍵 🍶 🍾 🍷 🍸 🍹 🍺 🍻 🥂 🥃 🫗 🥤 🧋 🧃 🧉 🧊 🥢 🍽️ 🍴 🥄 🔪 🫙 🏺"
            },
            {
              "label": {
                "en_US": "Activities",

              },
              "items": "🎗️ 🎟️ 🎫 🎖️ 🏆 🏅 🥇 🥈 🥉 ⚽ ⚾ 🥎 🏀 🏐 🏈 🏉 🎾 🥏 🎳 🏏 🏑 🏒 🥍 🏓 🏸 🥊 🥋 🥅 ⛳ ⛸️ 🎣 🤿 🎽 🎿 🛷 🥌 🎯 🪀 🪁 🎱 🔮 🪄 🧿 🪬 🎮 🕹️ 🎰 🎲 🧩 🧸 🪅 🪩 🪆 ♠️ ♥️ ♦️ ♣️ ♟️ 🃏 🀄 🎴 🎭 🖼️ 🎨 🧵 🪡 🧶 🪢"
            },
            {
              "label": {
                "en_US": "Travel & Places",

              },
              "items": "🚈 🚉 🚊 🚝 🚞 🚋 🚌 🚍 🚎 🚐 🚑 🚒 🚓 🚔 🚕 🚖 🚗 🚘 🚙 🛻 🚚 🚛 🚜 🏎️ 🏍️ 🛵 🦽 🦼 🛺 🚲 🛴 🛹 🛼 🚏 🛣️ 🛤️ 🛢️ ⛽ 🛞 🚨 🚥 🚦 🛑 🚧 ⚓ 🛟 ⛵ 🛶 🚤 🛳️ ⛴️ 🛥️ 🚢 ✈️ 🛩️ 🛫 🛬 🪂 💺 🚁 🚟 🚠 🚡 🛰️ 🚀 🛸 🛎️ 🧳 ⌛ ⏳ ⌚ ⏰ ⏱️ ⏲️ 🕰️ 🕛 🕧 🕐 🕜 🕑 🕝 🕒 🕞 🕓 🕟 🕔 🕠 🕕 🕡 🕖 🕢 🕗 🕣 🕘 🕤 🕙 🕥 🕚 🕦 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌙 🌚 🌛 🌜 🌡️ ☀️ 🌝 🌞 🪐 ⭐ 🌟 🌠 🌌 ☁️ ⛅ ⛈️ 🌤️ 🌥️ 🌦️ 🌧️ 🌨️ 🌩️ 🌪️ 🌫️ 🌬️ 🌀 🌈 🌂 ☂️ ☔ ⛱️ ⚡ ❄️ ☃️ ⛄ ☄️ 🔥 💧 🌊"
            },
            {
              "label": {
                "en_US": "Objects",

              },
              "items": "📃 📜 📄 📰 🗞️ 📑 🔖 🏷️ 💰 🪙 💴 💵 💶 💷 💸 💳 🧾 💹 ✉️ 📧 📨 📩 📤 📥 📦 📫 📪 📬 📭 📮 🗳️ ✏️ ✒️ 🖋️ 🖊️ 🖌️ 🖍️ 📝 💼 📁 📂 🗂️ 📅 📆 🗒️ 🗓️ 📇 📈 📉 📊 📋 📌 📍 📎 🖇️ 📏 📐 ✂️ 🗃️ 🗄️ 🗑️ 🔒 🔓 🔏 🔐 🔑 🗝️ 🔨 🪓 ⛏️ ⚒️ 🛠️ 🗡️ ⚔️ 🔫 🪃 🏹 🛡️ 🪚 🔧 🪛 🔩 ⚙️ 🗜️ ⚖️ 🦯 🔗 ⛓️ 🪝 🧰 🧲 🪜 ⚗️ 🧪 🧫 🧬 🔬 🔭 📡 💉 🩸 💊 🩹 🩼 🩺 🩻 🚪 🛗 🪞 🪟 🛏️ 🛋️ 🪑 🚽 🪠 🚿 🛁 🪤 🪒 🧴 🧷 🧹 🧺 🧻 🪣 🧼 🫧 🪥 🧽 🧯 🛒 🚬 ⚰️ 🪦 ⚱️ 🗿 🪧 🪪"
            },
            {
              "label": {
                "en_US": "Symbols",

              },
              "items": "➰ ➿ 〽️ ✳️ ✴️ ❇️ ©️ ®️ ™️ #️⃣ *️⃣ 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔠 🔡 🔢 🔣 🔤 🅰️ 🆎 🅱️ 🆑 🆒 🆓 ℹ️ 🆔 Ⓜ️ 🆕 🆖 🅾️ 🆗 🅿️ 🆘 🆙 🆚 🈁 🈂️ 🔴 🟠 🟡 🟢 🔵 🟣 🟤 ⚫ ⚪ 🟥 🟧 🟨 🟩 🟦 🟪 🟫 ⬛ ⬜ ◼️ ◻️ ◾ ◽ ▪️ ▫️ 🔶 🔷 🔸 🔹 🔺 🔻 💠 🔘 🔳 🔲"
            },
            {
              "label": {
                "en_US": "Flags",

              },
              "items": "🏁 🇨🇳 🎌 🇩🇪 🇪🇸 🇦🇨 🇦🇩 🇦🇪 🇦🇫 🇦🇬 🇦🇮 🇦🇱 🇦🇲 🇦🇴 🇦🇶 🇦🇷 🇦🇸 🇦🇹 🇦🇺 🇦🇼 🇦🇽 🇦🇿 🇧🇦 🇧🇧 🇧🇩 🇧🇪 🇧🇫 🇧🇬 🇧🇭 🇧🇮 🇧🇯 🇧🇱 🇧🇲 🇧🇳 🇧🇴 🇧🇶 🇧🇷 🇧🇸 🇧🇹 🇧🇻 🇧🇼 🇧🇾 🇧🇿 🇨🇦 🇨🇨 🇨🇩 🇨🇫 🇨🇬 🇨🇭 🇨🇮 🇨🇰 🇨🇱 🇨🇲 🇨🇴 🇨🇵 🇨🇷 🇨🇺 🇨🇻 🇨🇼 🇨🇽 🇨🇾 🇨🇿 🇩🇬 🇩🇯 🇩🇰 🇩🇲 🇩🇴 🇩🇿 🇪🇦 🇪🇨 🇪🇪 🇪🇬 🇪🇭 🏴󠁧󠁢󠁥󠁮󠁧󠁿 🇪🇷 🇪🇹 🇪🇺 🇫🇮 🇫🇯 🇫🇰 🇫🇲 🇫🇴 🇬🇦 🇬🇩 🇬🇪 🇬🇫 🇬🇬 🇬🇭 🇬🇮 🇬🇱 🇬🇲 🇬🇳 🇬🇵 🇬🇶 🇬🇷 🇬🇸 🇬🇹 🇬🇺 🇬🇼 🇬🇾 🇭🇰 🇭🇲 🇭🇳 🇭🇷 🇭🇹 🇭🇺 🇮🇨 🇮🇩 🇮🇪 🇮🇱 🇮🇲 🇮🇳 🇮🇴 🇮🇶 🇮🇷 🇮🇸 🇯🇪 🇯🇲 🇯🇴 🇰🇪 🇰🇬 🇰🇭 🇰🇮 🇰🇲 🇰🇳 🇰🇵 🇰🇼 🇰🇾 🇰🇿 🇱🇦 🇱🇧 🇱🇨 🇱🇮 🇱🇰 🇱🇷 🇱🇸 🇱🇹 🇱🇺 🇱🇻 🇱🇾 🇲🇦 🇲🇨 🇲🇩 🇲🇪 🇲🇫 🇲🇬 🇲🇭 🇲🇰 🇲🇱 🇲🇲 🇲🇳 🇲🇴 🇲🇵 🇲🇶 🇲🇷 🇲🇸 🇲🇹 🇲🇺 🇲🇻 🇲🇼 🇲🇽 🇲🇾 🇲🇿 🇳🇦 🇳🇨 🇳🇪 🇳🇫 🇳🇬 🇳🇮 🇳🇱 🇳🇴"
            }
          ],
          "pageSizes": [
            {
              "label": "A4",
              "width": 21,
              "height": 29.4,
              "default": true
            },
            {
              "label": "A3",
              "width": 29.7,
              "height": 42
            },
            {
              "label": "A5",
              "width": 14.8,
              "height": 21
            },
            {
              "label": "B5",
              "width": 17.6,
              "height": 25
            },
            {
              "label": {
                "en_US": "No. 5 Envelope",

              },
              "width": 10.9,
              "height": 12.9
            },
            {
              "label": {
                "en_US": "No. 6 Envelope",

              },
              "width": 11.9,
              "height": 22.9
            },
            {
              "label": {
                "en_US": "No. 7 Envelope",

              },
              "width": 16.1,
              "height": 22.8
            },
            {
              "label": {
                "en_US": "No. 9 Envelope",

              },
              "width": 22.8,
              "height": 32.3
            },
            {
              "label": {
                "en_US": "Legal Paper",

              },
              "width": 21.5,
              "height": 33.5
            },
            {
              "label": {
                "en_US": "Letter Paper",

              },
              "width": 21.5,
              "height": 27.9
            }
          ]
        },
        "toolbar": {
          "defaultMode": "ribbon",
          "enableSourceEditor": true,
          "menus": [
            "base",
            "insert",
            "table",
            "tools",
            "page",
            "export"
          ],
          "disableMenuItems": [],
          "importWord": {
            "enabled": true,
            "options": {},
            "useCustomMethod": true
          }
        },
        "page": {
          "defaultMargin": {
            "left": 3.18,
            "right": 3.18,
            "top": 2.54,
            "bottom": 2.54
          },
          "defaultOrientation": "portrait",
          "defaultBackground": "#fff",
          "watermark": {
            "type": "compact",
            "alpha": 0.2,
            "fontColor": "#000",
            "fontFamily": "SimSun",
            "fontSize": 16,
            "fontWeight": "normal",
            "text": ""
          },
          "nodesComputedOption": {
            "types": [],
            "nodesComputed": {}
          }
        },
        "document": {
          "title": "",
          "content": "",
          "placeholder": {
            "en_US": "Please enter the document content...",

          },
          "enableSpellcheck": true,
          "enableMarkdown": true,
          "enableBubbleMenu": true,
          "enableBlockMenu": true,
          "enableComment": false,
          "readOnly": false,
          "autofocus": true,
          "characterLimit": 0,
          "typographyRules": {},
          "editorProps": {},
          "parseOptions": {
            "preserveWhitespace": "full"
          },
          "autoSave": {
            "enabled": true,
            "interval": 300000
          }
        },
        "assistant": {
          "enabled": false,
          "maxlength": 100,
          "commands": [
            {
              "label": {
                "en_US": "Continuation",

              },
              "value": {
                "en_US": "Continuation",

              }
            },
            {
              "label": {
                "en_US": "Rewrite",

              },
              "value": {
                "en_US": "Rewrite",

              }
            },
            {
              "label": {
                "en_US": "Abbreviation",

              },
              "value": {
                "en_US": "Abbreviation",

              }
            },
            {
              "label": {
                "en_US": "Expansion",

              },
              "value": {
                "en_US": "Expansion",

              }
            },
            {
              "label": {
                "en_US": "Polish",

              },
              "value": {
                "en_US": "Polish",

              }
            },
            {
              "label": {
                "en_US": "Proofread",

              },
              "value": {
                "en_US": "Proofread",

              }
            },
            {
              "label": {
                "en_US": "Translate",

              },
              "value": {
                "en_US": "Translate to chinese",

              },
              "autoSend": false
            }
          ]
        },
        "shareUrl": "",
        "templates": [],
        "cdnUrl": "https://unpkg.com/@umoteam/editor-external@4",
        "diagrams": {
          "domain": "https://embed.diagrams.net",
          "params": {}
        },
        "file": {
          "allowedMimeTypes": [],
          "maxSize": 104857600
        },
        "user": {},
        "extensions": [],
        "translations": {
          "en_US": {},

        }
      }
    }
  },
  methods: {

    async onSave() {

      const content = this.$refs.editorRef.getContent();
      console.log('Content:', content);

      if (!content) {
        console.error('No content to save.');
        return false;
      }

      try {
        const isUpdate = this.postID !== null && this.postID !== undefined;
        const result = await this.savePost(content, isUpdate);
        if (result) {
          console.log(isUpdate ? 'Document updated successfully' : 'Document saved successfully');
        } else {
          console.log('Unable to save. See logs for more info.');
        }
        return result;
      } catch (error) {
        console.error('Error saving document:', error);
        return false;
      }
    },

    async savePost(content, isUpdate) {

      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');

      const title = this.extractTitle(doc) || 'Default Title';
      console.log('Title:', title);

      const image = this.extractImage(doc) || this.imageBase64;
      console.log('Image:', image);

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userID = decodedToken.id;

      try {
        console.log('Saving blog post...');

        let url = isUpdate ? `http://localhost:28765/updateBlogPost` : "http://localhost:28765/createblogpost";

        const response = await axios.post(url, { "postID": this.postID, "title": title, "content": content, "image": image, "userID": userID, "blogPostType": 2 }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });

        console.log(response);

        if (response.data.type == "result" && response.data.result == "ok") {
          console.log('Blog post saved successfully ---');

          this.postID = response.data.message.postID;

          return response.data.message.postID;
        } else {
          console.error('Failed to save blog post');
          return false;
        }
      } catch (error) {
        console.error('Error:', error);
        return false;
      }
    },
    extractTitle(doc) {
      const title = doc.querySelector('h1');
      return title ? title.textContent : '';
    },

    extractImage(doc) {
      const img = doc.querySelector('img');
      return img ? img.src : '';
    },

    async processImg(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageBase64 = reader.result;
          resolve({ url: reader.result });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },

    // onSaved() {
    //   console.log('Document has been saved.');
    // }

  },
  mounted() {
    this.$refs.editorRef.setOptions(this.options);
    this.$refs.editorRef.setLocale('en-US');
  },
  metaInfo() {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.9.0/mammoth.browser.min.js', async: true, defer: true
      }
    ]
  }
})
</script>
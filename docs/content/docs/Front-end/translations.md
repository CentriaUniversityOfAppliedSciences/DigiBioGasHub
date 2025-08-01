---
weight: 403
title: "Translations"
description: ""
icon: "article"
date: "2025-07-14T12:57:03Z"
lastmod: "2025-07-14T12:57:03Z"
draft: false
toc: true
---

DigiBiogasHubs frontend uses i18n for translations. JSON-files containing translations can be found in src/locale. Currently available translations are english, finnish and swedish.

In Vue you can add tranlations in Pages or Components with syntax ```{{ $t('translation_key.sub_key') }}```

For example: if current language in session is english,  
```{{ $t('menu.home') }}``` will get translation in en.json from ```{ "menu": { "home": "Home"}}``` where value is "Home"

In javascript (ionic/vue code) the translation can be used with syntax ```this.$t('menu.home')```
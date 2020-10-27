<template>
  <ClientOnly>
    <tiptap-vuetify @change="onChangeContent" :extensions="extensions" />
    <template #placeholder> Loading... </template>
  </ClientOnly>
</template>

<script>
  // import the component and the necessary extensions
  import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History,
  } from 'tiptap-vuetify';

  export default {
    // specify TiptapVuetify component in "components"
    props: {
      content: String,
    },
    components: {TiptapVuetify},
    data: () => ({
      // declare extensions you want to use
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    }),
  };
</script>

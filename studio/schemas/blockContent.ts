import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Strikethrough', value: 's'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    }),
    {
      name: 'break',
      type: 'object',
      title: 'Break',
      fields: [
        {
          name: 'style',
          type: 'string',
          options: {
            list: ['break', 'readMore'],
          },
        },
      ],
    },
    {
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
        {
          name: 'floatLeft',
          type: 'boolean',
          title: 'Float Left?',
        },
        {
          name: 'floatRight',
          type: 'boolean',
          title: 'Float Right?',
        },
      ],
    },
    {
      name: 'gallery',
      type: 'gallery',
      title: 'Gallery',
    },
    {
      name: 'imagerow',
      type: 'imagerow',
      title: 'Image Row',
    },
    {
      name: 'youtubeVideo',
      type: 'youtubeEmbed',
      title: 'YouTube Video',
    },
    {
      name: 'button',
      type: 'Button',
      title: 'Button',
    },
    {
      name: 'vroidEmbed',
      type: 'vroidEmbed',
      title: 'VRoid Embed',
    },
  ],
})
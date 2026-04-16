import {defineType} from 'sanity'

export default defineType({
  name: 'vroidEmbed',
  title: 'VRoid Embed',
  type: 'object',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'VRoid Hub Embed URL',
      description: 'Paste the /embed URL from VRoid Hub here',
    },
  ],
})
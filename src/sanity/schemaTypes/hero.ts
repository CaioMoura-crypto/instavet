import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Imagem de Fundo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Descrição da Imagem (Alt)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'imageAlt',
      media: 'backgroundImage',
    },
  },
})

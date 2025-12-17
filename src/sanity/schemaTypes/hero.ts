import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo/Descrição',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textoBotao',
      title: 'Texto do Botão',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
      title: 'titulo',
      subtitle: 'subtitulo',
      media: 'backgroundImage',
    },
  },
})

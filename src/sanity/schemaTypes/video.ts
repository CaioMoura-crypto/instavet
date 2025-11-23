import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Vídeos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Localização', value: 'localizacao' },
          { title: 'Estrutura', value: 'estrutura' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoFile',
      title: 'Arquivo de Vídeo',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload direto do vídeo (MP4, WebM, etc.)',
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL do Vídeo (alternativo)',
      type: 'string',
      description: 'URL do vídeo (YouTube, Vimeo, etc.) - usar se não fizer upload',
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Ordem de exibição',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { title, category } = selection
      return {
        ...selection,
        subtitle: category === 'localizacao' ? 'Localização' : 'Estrutura',
      }
    },
  },
})

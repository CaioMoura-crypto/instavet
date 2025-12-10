import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Localização',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Estamos por aqui!',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Copie o endereço ou se preferir dê uma olhadinha no Google Maps',
    }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whatsappUrl',
      title: 'URL do WhatsApp',
      type: 'url',
      description: 'Link do WhatsApp (ex: https://wa.me/5571999999999)',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'URL do Instagram',
      type: 'url',
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Embed do Google Maps',
      type: 'text',
      description: 'Cole aqui a URL do iframe do Google Maps (src do iframe)',
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
            },
          ],
        },
      ],
      description: 'Galeria de fotos da localização',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

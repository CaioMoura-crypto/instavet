import { type SchemaTypeDefinition } from 'sanity'
import course from './course'
import hero from './hero'
import testimonial from './testimonial'
import video from './video'
import location from './location'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [course, hero, testimonial, video, location],
}

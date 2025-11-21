import { type SchemaTypeDefinition } from 'sanity'
import course from './course'
import hero from './hero'
import testimonial from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [course, hero, testimonial],
}

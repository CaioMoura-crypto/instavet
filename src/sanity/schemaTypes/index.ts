import { type SchemaTypeDefinition } from 'sanity'
import course from './course'
import courseLandingPage from './courseLandingPage'
import hero from './hero'
import testimonial from './testimonial'
import video from './video'
import location from './location'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [course, courseLandingPage, hero, testimonial, video, location],
}

import { describe, expect, it } from 'vitest'
import { messageRequestSchema } from '../../shared/schemas/message'

describe('messageRequestSchema', () => {
  it('accepts a non-empty message', () => {
    expect(messageRequestSchema.parse({ message: 'hello' })).toEqual({ message: 'hello' })
  })

  it('rejects an empty message', () => {
    expect(() => messageRequestSchema.parse({ message: '' })).toThrow()
  })
})

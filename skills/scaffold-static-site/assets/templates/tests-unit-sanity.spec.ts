import { describe, expect, it } from 'vitest'

describe('project sanity', () => {
  it('runs TypeScript unit tests', () => {
    expect({ ready: true }).toEqual({ ready: true })
  })
})

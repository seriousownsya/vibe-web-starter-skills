import { z } from 'zod'

export const messageRequestSchema = z.object({
  message: z.string().trim().min(1).max(500),
})

export type MessageRequest = z.infer<typeof messageRequestSchema>

export type MessageResponse = {
  message: string
  receivedAt: string
}

import { messageRequestSchema, type MessageResponse } from '../../shared/schemas/message'

export default defineEventHandler(async (event): Promise<MessageResponse> => {
  const body = await readValidatedBody(event, value => messageRequestSchema.parse(value))

  return {
    message: body.message,
    receivedAt: new Date().toISOString(),
  }
})

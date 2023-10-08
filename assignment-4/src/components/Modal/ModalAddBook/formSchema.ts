import { z } from 'zod'
import { BookType, TopicEnum } from '../../../types/BookType'
import ERROR_MESSAGES from '../../../constants/errorMessages'

export const defaultForm: BookType = {
  name: '',
  author: '',
  topic: TopicEnum.Programming,
} as BookType

export const formSchema = z.object({
  name: z.string().min(1, ERROR_MESSAGES.REQUIRE_FIELD('Name')),
  author: z.string().min(1, ERROR_MESSAGES.REQUIRE_FIELD('Author')),
  topic: z.nativeEnum(TopicEnum),
})

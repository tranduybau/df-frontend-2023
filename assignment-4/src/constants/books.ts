import { BookType, TopicEnum } from '../types/BookType'
import randomId from '../helpers/utils/randomId'

const defaultBooks: Array<BookType> = [
  {
    id: randomId(),
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: TopicEnum.Programming,
  },
  {
    id: randomId(),
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: TopicEnum.Database,
  },
  {
    id: randomId(),
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: TopicEnum.DevOps,
  },
]

export const TABLE_PAGE_SIZE = 5

export default defaultBooks

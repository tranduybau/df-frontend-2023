import BookType, {TopicEnum} from "../types/book";

const initValue: BookType[] = [
  {
    id: 1,
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: TopicEnum.Programming,
  },
  {
    id: 2,
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: TopicEnum.Database,
  },
  {
    id: 3,
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: TopicEnum.DevOps,
  }
]

export default initValue

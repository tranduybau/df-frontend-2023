export enum TopicEnum {
  Programming = 'Programming',
  Database = 'Database',
  DevOps = 'DevOps',
}

interface BookType {
  author: string,
  name: string,
  topic: TopicEnum,
  id: string | number
}

export default BookType

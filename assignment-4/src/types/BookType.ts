export enum TopicEnum {
  Programming = 'Programming',
  Database = 'Database',
  DevOps = 'DevOps',
}

export interface BookType {
  id: string
  name: string
  author: string
  topic: TopicEnum
}

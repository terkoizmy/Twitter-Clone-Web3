export default {
    name: 'tweets',
    type: 'document',
      title: 'Tweets',
    fields: [
      {
        name: 'tweet',
        title: 'Tweet',
        type: 'string'
      },
      {
        name: 'timestamp',
        title: 'Timestamp',
        type: 'datetime'
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'users' }],
      },
    ]
}
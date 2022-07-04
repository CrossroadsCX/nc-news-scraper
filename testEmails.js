import { sendEmail } from './dist/sendinblue/sendEmail.js'

const main = async () => {
  const articles = [
    {
      title: 'Test Title',
      description: 'Test Description',
      link: 'https://crossroadscx.com'
    },
    {
      title: 'Another Test Title',
      link: 'https://google.com'
    },
  ]

  return sendEmail(articles)
}

main()
  .then((result) => {
    console.log(result)
    process.exit(0)
  }).catch((err) => {
    console.error(err)
    process.exit(1)
  })

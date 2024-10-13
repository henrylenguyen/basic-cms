import { urlRegex } from '@/constants/urlRegex'

export const convertUrlsToLinks = (text = '') => {
  const words = text?.replace(/[\r\n]+/g, ' ').split(' ')
  const result: JSX.Element[] = []

  words?.forEach((word) => {
    if (word !== '') {
      if (urlRegex.test(word)) {
        result.push(
          <a href={word} className='text-blue-dark' target='_blank'>
            {word}
          </a>
        )
      } else result.push(<span>{word}</span>)
    }
  })

  return result
}

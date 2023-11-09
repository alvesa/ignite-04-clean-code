import { Either, left, right } from './either'

function doSomething(shouldSucess: boolean): Either<string, string> {
  if (shouldSucess) {
    return right('success')
  } else {
    return left('error')
  }
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('error result', () => {
  const result = left('error')

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})

---
templateKey: 'blog-post'
title: 'What Test Runner Does'
date: 2020-06-02T22:55:10.000Z
description: >
  How did I more or less figure it out
---

Writing tests is awesome, and probably pretty much everybody, yours truly included, should do that more. I might write more about that later, but not here.

Here I accidentally created a simplified version of a test runner and why it does what it does.

## Let's get this party started

The sample code used is of course `const add = (a, b) => a + b`

To begin with, I had to do this, as I was preparing for a technical interview on a platform I wasn't used to, and I wasn't familiar with the provided testing tools for my language of choice (go TypeScript). Getting the assertions going with chai happened to be simple enough, just <code>const assert = require('assert')</code> and we're rockin. For some reason I didn't get a proper test runner going on though.

Then I decided to look into what actually happens, when I just try `assert(add(1, 2), 3, 'simple add operation')`. Nothing, damn it. Maybe there's some magic behind it? For fun, let's try a failing test.

```javascript
assert(add(1, 2), 4, 'simple add operation')

/**
Result:

assert.js:92
  throw new AssertionError(obj);
  ^

AssertionError [ERR_ASSERTION]: simple adding works
    at runTests (/home/coderpad/solution.ts:14:10)
    at /home/coderpad/solution.ts:35:1
    at Script.runInContext (vm.js:127:20)
    at Script.runInNewContext (vm.js:133:17)
    at Object.runInNewContext (vm.js:299:38)
    at /home/coderpad/repl.js:29:10
    at processTicksAndRejections (internal/process/task_queues.js:76:11)
*/
```

It throws an error! Awesome! Now what I can do is just wrap everything in a try-catch, and work from there.

```javascript
try {
  assert(add(1, 2), 3, 'simple add operation')
  assert(add(1, 2), 4, 'simple add operation')
} catch(e) {
  console.log(e)
}

/**
Result:

AssertionError [ERR_ASSERTION]: simple adding works
    at runTests (/home/coderpad/solution.ts:14:10)
    at /home/coderpad/solution.ts:36:3
    at Script.runInContext (vm.js:127:20)
    at Script.runInNewContext (vm.js:133:17)
    at Object.runInNewContext (vm.js:299:38)
    at /home/coderpad/repl.js:29:10
    at processTicksAndRejections (internal/process/task_queues.js:76:11) {
  generatedMessage: false,
  code: 'ERR_ASSERTION',
  actual: -1,
  expected: 3,
  operator: '=='
}
*/
```

Awesome. So, apparently the AssertionError object contains a bunch of useful information: The test message specified, as well as the expected and actual values and even the operator, which was used to run the test. This should all come in handy when displaying all this in a bit more clean message.

```javascript
try {
  assert(add(1, 2), 3, 'simple add operation')
  assert(add(1, 2), 4, 'simple add operation')
} catch(e) {
  console.error(e.toString())
  console.error(`Expected ${e.actual} ${e.operator} ${e.expected}`)
}

/**
Result:

AssertionError [ERR_ASSERTION]: simple adding works
Expected -1 == 3
*/
```

Nice. Throw in some emojis and a neat little indentation and I think we're there.

```javascript
try {
  assert(add(1, 2), 3, 'simple add operation')
  assert(add(1, 2), 4, 'simple add operation')
} catch(e) {
  console.error(`❗️ ${e.toString()}`)
  console.error(`    🙅‍  Expected ${e.actual} ${e.operator} ${e.expected}`)
}

/**
Result:

❗️ AssertionError [ERR_ASSERTION]: simple adding works
    🙅 Expected -1 == 3
*/
```

But wait, what if we write tests that have errors in them? Let's just re-throw the error, if we catch something other than AssertionError. (This should probably be done with e instanceof AssertionError, but as I don't have AssertionError available, TypeScript will throw an error, so I'll just use the code provided.)

```javascript
try {
  assert(add(1, 2), 3, 'simple add operation')
  assert(add(1, 2), 4, 'simple add operation')
} catch(e) {
  if (e.code != 'ERR_ASSERTION') {
    throw e
  }

  console.error(`❗️ ${e.toString()}`)
  console.error(`    🙅‍  Expected ${e.actual} ${e.operator} ${e.expected}`)
}

/**
Result:

❗️ AssertionError [ERR_ASSERTION]: simple adding works
    🙅 Expected -1 == 3
*/
```

Separating the tests and this ridiculous test runner might be a good idea, as well as a comment or two. Also, a message which tells us that all tests have passed. With that we end up with something like this:

```javascript
////////// CODE
const add = (a:number, b:number) => a - b



////////// TESTS
const assert = require('assert')

const runTests = () => {
  assert.equal(add(1, 2), 3, 'simple adding works')
}



////////// SO OVERLY SIMPLIFIED TEST RUNNER THAT IT HURTS
try {
  runTests()
  console.log('✅  tests passed')
} catch(e) {
  if (e.code != 'ERR_ASSERTION') {
    throw e
  }
  console.error(`❗️ ${e.toString()}`)
  console.error(`    🙅‍  Expected ${e.actual} ${e.operator} ${e.expected}`)
}

```

I could add some kind of counter to log how many tests have passed and failed, a timer to check how long running the tests takes and whatnot, but that's a bit too much for a fifteen minute thought experiment. Unlike emojis, which are definitely compulsory.
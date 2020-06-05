---
templateKey: 'blog-post'
title: 'Asynchronous Javascript'
date: 2020-06-01T21:52:10.000Z
description: >
  How do Promises and async/await work?
---

So, I was in this technical interview, and I was presented a task to do some data fetching from an api, writing that data to a database and then processing that data from the aforementioned database. Sounds simple, and it is. Expect that as soon as I saw those API end points, I realised I haven't worked with APIs since maybe two years ago.

So I totally fucked up the interview, and decided that it might be worthwhile to write about what I should've done so that I hopefully don't fail the same question ever again -.-

## Promise Me That You'll Return Something

First concept to understand is promises. Basically, they are functions that when run will start to do something in the background (often network requests, but could be anything), and they'll run a callback that either handles the resolved rersponse, or in case of an error (ie. network blackout) a rejected response.

```javascript
// Fetch is a prime example of promises
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'

// Fetch returns a promise, which means it is "thenable"
fetch(apiUrl)
  // Then gets as parameter whatever the promise resolves to
  .then(response => response.json()) // .json() returns Promise<object>
  // Second then statement takes care of Promise of json and handles the processed json object
  .then(data => console.log(data))
  // If there's an error of some sorts, we'll use a catch statement and elegantly handle our error
  .catch(err => console.error(err))
```

Cool beans. But what if I want to do get some more in-depth data of my pokémon? I could handle that stuff in a separate handler function:

```javascript
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'

const handlePokemon = pokemon => {
	pokemon.forEach(p => {
		fetch(p.url)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(err => console.error(err))
  })
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => handlePokemon(data.results))
  .catch(err => console.error(err))
```

This quickly becomes quite unwieldy, as we'll need to use more and more callbacks. Also, if we wanted to combine the processed data somehow, we'd have to use some variables outside our fetch requests, which is quite spaghetti-like.

## Await For Me

This is the issue that is solved by async and await keywords. They are basically syntactic sugar on top of promises, so let's first look into how we could replicate what we have above with using async await, with explanation below.

```javascript
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'

// Wrap into async fn, so we can use our awaits, furhter explanation after the snippet. We're passing our apiUrl as a parameter, as relying on globals is quite icky.
const getPokemonData = async api => {
  const pokemonResponse = await fetch(apiUrl)
  const pokemonData = await pokemonResponse.json()
  const pokemon = pokemonData.results
  console.log(pokemon)

  // Runni
  const pokemonDataRequests = pokemon.map(p => fetch(p.url))
  const pokemonDatas = await Promise.all(pokemonDataRequests)

  console.log(pokemonDatas)
}

getPokemonData(apiUrl)
```

First of all, we wrap this whole thing in an _async_ function, indicated by the keyword. This is to tell our javascript engine that "inside this function, whenever you see await keyword, pause the execution of this function until the promise after await keyword has resolved. Then you are fere to proceed.

This is done so that when this code is run, everything outside this function could keep on being run, but within this function we need these specific promises to be resolved before proceeding. This allows for better performance, as if for example our api requests would take ages, browser could still go and run other things while we wait for the response.

The other necessary thing is the _await_ keyword. This is the actual pause button, which says that we need to wait until the promise is resolved. For example on line 4 we stop until we have our fetched data, on line 5 we stop until we have our processed json and then on line 6 & 7 we can be certain, that we have our data available for logging.

Another difference to our previous example is `Promise.all()` -function call, but that's also nothing too complicated. On line 10 we use map, we get an array of promises (every fetch request returns a promise). Promise.all simply takes an array of promises, and creates a new promise that resolves, when all of the promises within the array have resolved.

That's why again on line 12, we have all of our pokémon's data available.

And that's what I should've done. FFS.
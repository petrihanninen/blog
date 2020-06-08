---
templateKey: 'blog-post'
title: 'Notes on Types'
date: 2020-06-01T21:52:10.000Z
description: >
  Some things I've learnt along the way
---

Lately, more and more of the things I work with on a day-to-day basis have involved types — both Mypy for Python and Typescript for JS. Here are my notes on some things I struggled with, so that I hopefully won't struggle with them anymore, or at least can find my own answers instead of re-googling or god forbid _ask from a colleague_. (Thanks <a href="https://github.com/MetalRain">@Otto</a> for the clarification below).

## Using an instance as type

```python
# Instead with a List of Articles
articles: List[Article] = []

# We don't have to check for None
for a in articles:
  print(a.slug)

  # Unfortunately, mypy doesn't know the structure of our Article instance, so this will pass type check even thoguh it's an error
  a.non_existing_method()
```

## Optional

```python
# This can be either Article or none
a: Optional[Article] = get_object_or_None(Article, slug=slug)

# And it's useful, as it forces us to check for None:
# This thing will throw an error, as it can be None and thus have no property "image"
a.image = 'https://path/to/image.jpg'
```
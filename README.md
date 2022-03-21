# mongo-tut

# mongo db common use
Items
    .find({author: 'Roberto', isPublished: true})
    .sort({name: 1}) // sort ascending.  Use -1 for decending
    .limit(10) // get first 10 results
    .count() // returns total

Items
    .select({name: 1, tags: 1}) // return only the listed items (1 is for TRUE)



## comparison operators - using $
eq (equal)
ne (not equal)
gt (greater than)
gte (greater than or equal to)
lt (less than)
lte (less than or equal to)
in 
nin (not in)

```
Items
    .find({price: {$gt: 10}})  // find all entries greater than 10 
    .find({price: {$gte: 10}})  // find all entries greater than or equal to 10 
    .find({price: {$gte: 10, $lte: 20}})  // find all entries inclusive of 10-20
    .find({})



```

## logical operators - using $
or 
and

```
Items
    .find()
    .or([{author: 'Mosh'}, {isPublished: True}]) // find all itmes containing author:Mosh or isPublished

Items.
    .find()
    .and([ ]) // combining
```

# regex


```
Items.
    find({author: /pattern/})

// Starts with 'Rob'

Items.
    find({author: /^Rob/}) //string that starts with 'Rob'

Items.
    find({author: /Cannella$/i}) //string that starts with 'Cannella' 
    (trailing 'i' negates case)

Items.
    find({author: /.*Rob.*$/i}) //string that contain 'Rob'
```

## Pagination with .skip() and .limit()

// endpoint /api/courses?pageNumber=2&pageSize=10
```
    const pageNumber = 2;
    const pageSeze = 10;

    const courses = await Course
        .find({ author: 'Mosh', isPublised: true })
        .skip((pageNumber -1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .count()

```
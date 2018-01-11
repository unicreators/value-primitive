## value-primitive

convert value to primitive value.

&nbsp;
&nbsp;

## Install

```sh
$ npm install object-primitive
```

&nbsp;
&nbsp;

## Usage

```js


const primitive = require('value-primitive');



let v1 = primitive.int('1');
console.log(v1 === 1); 
// true

let v2 = primitive.date('1990-01-31T16:00:00.000Z');
console.log(v2 instanceof Date); 
// true

let v3 = primitive.float('1.12345');
console.log(v3 === 1.12345); 
// true

let v4 = primitive.boolean('true');
console.log(v4 === true); 
// true

let v5 = primitive.boolean(0);
console.log(v5 === false); 
// true

let v6 = primitive.int('s');
console.log(v6 === undefined); 
// true

let v7 = primitive.int('s', 10);
console.log(v7 === 10); 
// true


```


&nbsp;
&nbsp;


### License

[MIT](LICENSE)
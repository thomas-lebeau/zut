# zut! 

> We all swear at our computers when things go sideways. Now it's time for payback!  
> **i.e.:** Makes your computer say random stuffs to you.


## Install

```
$ npm install --save zut
```

## Requirements

**zut!** uses OS specific dependancies.

  - It works on **MacOS** using [say](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/say.1.html). Configure it in the _System Preference_
  - It works on **Linux** using [Festival](http://www.cstr.ed.ac.uk/projects/festival/)

## Usage

```js
var zut = require('zut');

zut();
//=> 📢 probably something stupid
```

## Example
### With gulp

```js
...
var zut = require('zut');

gulp.task('sass', function() {
	return gulp.src('style.scss')
		.pipe(plumber({errorHandler: zut}))
		.pipe(sass.sync()).on('error', sass.logError)
		.pipe(gulp.dest('.'));
});
//=> 📢 "Oooh Snap!"
```

### Custom Messages

```js
var zut = require('zut');

zut({voice: 'Junior', messages: ['foo', 'bar', 'baz']});
//=> 📢 "bar" (randomly)
```

## API

### zut([options])

#### options

##### voice

Type: `String`  
Default: System Default


##### messages

Type: `String`, `Array` or `Object`  

##### filters

Type: `String`, `Array`  

Restrict to one or more category.  
_For now only one category is available: `errors`._

## Contribute

Contributions welcome! You may want to check issue #1 but any other PR will be considered.


## License

MIT © [Thomas Lebeau](https://github.com/thomas-lebeau)

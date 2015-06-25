;;
/*    = BibleQuery
*     author: Brookes Stephens
*     date: June 20, 2015 -
*     version 0.1
*     dependencies: {}
*
------------------------------------
* Documentation
------------------------------------
1. Init:
  var obj = new BibleQuery([mode]) // returns singleton


//these all return an Promise object
2. Search Types:
  obj.getChapter(book, chapter [,opts])
  obj.getVerse(book, chapter, verse [,opts])
  obj.getPassage(startArray [book, chapter,verse], endArray[book, chapter,verse])

  -> opts = {
    advanced_mode: bool,
    html: bool //if advanced then search returns html instead of JSON
  }
*/

(function (context, BIBLE_KEY) {
  'use strict';
  var _version = "0.1.0";
  var exports = context;
  var _url_base = location.origin + "/api"; //"http://localhost:4567/api";
  var _mode_string = function (mode_bool) {
    return (mode_bool || typeof mode_bool !== "boolean")? 'advanced' : 'simple';
  }

  //takes an array
  Array.prototype.addToSelf = function (arr) {
    return this.concat(arr);
  }

  //bible query object constructor
  function BibleQueryInstanceConstructor (advanced_mode, isTest) {
    return {
      version: _version,
      url: _url_base,
      advanced_mode: (typeof advanced_mode === 'boolean')? advanced_mode : true,
      getChapter: getChapter,
      getVerse: getVerse,
      getVerseById: getVerseById,
      bible_key: BIBLE_KEY,
      current_book: null,
      current_chapter: null
    }
  };


  /* = Internals -----------  */
  function _idFormatter (id_segment) {
    //example id: Matthew 5:12 = 040005012
    var num = id_segment;
    if (typeof id_segment === 'string') {
        num = parseIng(id_segment, 10);
    }

    //150 is the highest chapter number (psalms)
    if (typeof num !== "number" || isNaN(num) || num > 150) {
      throw "please enter a valid id";
      console.log("ID isn't valid");
    }

    if (num < 10) {
      return "00"+ num;
    } else if (num >= 10 && num < 100) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function _checkMode(opts) {
    return (opts)? _mode_string(opts.mode) : _mode_string(this.advanced_mode)
  }

  function _request (url) {
    //let's be async and return a promise
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            console.log("ERROR", xhr)
            reject(Error(xhr.statusText))
          }
        }
      };
      xhr.send();
    });
  }

  /* = Externals -----------  */
  function getChapter (book, chapter, opts) {
    if (!book || !chapter) {
      throw 'please make sure both book and chapter are provided';
      return {};
    }
    var mode = _checkMode.call(this, opts);
    var url = [this.url, mode, "chapter", book, chapter].join('/');
    return _request(url);
  }

  function getVerse(book, chapter, verse, opts) {
    var id_array = [book, chapter, verse].map(_idFormatter);
    this.getVerseById(id_array.join(''), opts);
  }

  function getVerseById(id, opts) {
    var mode = _checkMode.call(this, opts);
    var url = [this.url, mode, 'verse', id].join('/');
    return _request(url);
  }

  function _nextChapter () {

  }

  function _prevChapter () {

  }




  // return a constructor
  exports.BibleQuery = BibleQueryInstanceConstructor;
})(this, (function () {
  // I didn't want to put this at the top of the file :)
  return [
    { name: "Genesis", id: 1, ch: 50},
    { name: "Exodus", id: 2, ch: 40},
    { name: "Leviticus", id: 3, ch: 27},
    { name: "Numbers", id: 4, ch: 36},
    { name: "Deuteronomy", id: 5, ch: 34},
    { name: "Joshua", id: 6, ch: 24},
    { name: "Judges", id: 7, ch: 21},
    { name: "Ruth", id: 8, ch: 4},
    { name: "1 Samuel", id: 9, ch: 31},
    { name: "2 Samuel", id: 10, ch: 24},
    { name: "1 Kings", id: 11, ch: 22},
    { name: "2 Kings", id: 12, ch: 25},
    { name: "1 Chronicles", id: 13, ch: 29},
    { name: "2 Chronicles", id: 14, ch: 36},
    { name: "Ezra", id: 15, ch: 10},
    { name: "Nehemiah", id: 16, ch: 13},
    { name: "Esther", id: 17, ch: 10},
    { name: "Job", id: 18, ch: 18},
    { name: "Psalms", id: 19, ch: 150},
    { name: "Proverbs", id: 20, ch: 31},
    { name: "Ecclesiastes", id: 21, ch: 12},
    { name: "Song of Songs", id: 22, ch: 8},
    { name: "Isaiah", id: 23, ch: 66},
    { name: "Jeremiah", id: 24, ch: 52},
    { name: "Lamentations", id: 25, ch: 5},
    { name: "Ezekiel", id: 26, ch: 48},
    { name: "Daniel", id: 27, ch: 12},
    { name: "Hosea", id: 28, ch: 14},
    { name: "Joel", id: 29, ch: 3},
    { name: "Amos", id: 30, ch: 9},
    { name: "Obadiah", id: 31, ch: 1},
    { name: "Jonah", id: 32, ch: 4},
    { name: "Micah", id: 33, ch: 7},
    { name: "Nahum", id: 34, ch: 3},
    { name: "Habakkuk", id: 35, ch: 3},
    { name: "Zephaniah", id: 36, ch: 3},
    { name: "Haggai", id: 37, ch: 2},
    { name: "Zechariah", id: 38, ch: 14},
    { name: "Malachi", id: 39, ch: 4},
    { name: "Matthew", id: 40, ch: 28},
    { name: "Mark", id: 41, ch: 16},
    { name: "Luke", id: 42, ch: 24},
    { name: "John", id: 43, ch: 21},
    { name: "Acts", id: 44, ch: 28},
    { name: "Romans", id: 45, ch: 16},
    { name: "1 Corinthians", id: 46, ch: 16},
    { name: "2 Corinthians", id: 47, ch: 13},
    { name: "Galatians", id: 48, ch: 6},
    { name: "Ephesians", id: 49, ch: 6},
    { name: "Philippians", id: 50, ch: 4},
    { name: "Colossians", id: 51, ch: 4},
    { name: "1 Thessalonians", id: 52, ch: 5},
    { name: "2 Thessalonians", id: 53, ch: 3},
    { name: "1 Timothy", id: 54, ch: 6},
    { name: "2 Timothy", id: 55, ch: 4},
    { name: "Titus", id: 56, ch: 3},
    { name: "Philemon", id: 57, ch: 1},
    { name: "Hebrews", id: 58, ch: 13},
    { name: "James", id: 59, ch: 5},
    { name: "1 Peter", id: 60, ch: 5},
    { name: "2 Peter", id: 61, ch: 3},
    { name: "1 John", id: 62, ch: 5},
    { name: "2 John", id: 63, ch: 1},
    { name: "3 John", id: 64, ch: 1},
    { name: "Jude", id: 65, ch: 1},
    { name: "Revelations", id: 66, ch: 22}
  ];
}()));

;;

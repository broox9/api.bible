//TODO: pull in es6-promise & lodash or underscore

$(function() {
  var submit_btn = $('#submitVerse');
  var verse_input = $('#verseInput');
  var verse = $('#verse');
  var Bq = window.bq  = new BibleQuery(false);
  console.log("BQ", Bq);
  var current_book = null;
  var current_chapter = null;

  // = FUNCTIONS ----------------------------------------------------------
  function addBooks (element, books) {
    var html = books.map(function (book, i) {
      return '<option value ="' + book.id + '">' + book.name + '</option>';
    });

    $(element).append(html.join(''))
  }

  function buildSimpleChapterHtml (element, chapter) {
    var html = chapter.map(function (item) {
      return '<span class="verse"><span class="verse-number">' + item.verse + '</span><span class="verse-text">' + item.words + '</span></span>';
    })
    $(element).attr('data-mode','simple').html(html.join(''));
  }

  function buildAdvancedChapterHtml (element, chapter) {
    var html = [];
    console.log("CHAPTER", chapter)
    for (verse in chapter) {
      console.log("VERSE", verse, chapter[verse]);
      var verseArray = chapter[verse].forEach(buildAdvancedVerseHtml, html);

    }
    console.log("HTML", html)
    html.join('');
    $(element).attr('data-mode','advanced').html(html)
  }

  function buildAdvancedVerseHtml (wordItem) {
    //console.log(wordItem.word);
    var item =  "<span>" + wordItem.word + "</span>";
    this.push(item);
  }



  // = HANDLERS ----------------------------------------------------------
  $('#submitVerse').click(function (e) {
    var id = $('#verseInput').val();
    var verse = Bq.getVerseById(id);

    verse.then(function (json) {
      return JSON.parse(json);
    }).then(function (payload) {
      console.log("payload", payload)
      buildSimpleChapterHtml('#single-verse', [payload]);
    }).catch(function (err) {
      console.log("Single Verse Error", err);
    });
  })

  $('#selector').change(function (e) {
    var book = Bq.bible_key[e.target.value -1];
    var html = ["<option value=''>select a chapter</option>"];
    current_book = book.id;
    //TODO: change to a while loop
    for (var i = 1; i <= book.ch; i++) {
      html.push("<option value=" + i + ">" + i + "</option>")
    }
    $('#chapter').html(html.join(''))
  });

  $('#chapter').change(function (e) {
      current_chapter = e.target.value;
      var isAdvancedMode = Bq.advanced_mode; //false;
      var req_promise = Bq.getChapter(current_book, current_chapter)//, {advanced_mode: isAdvancedMode});

      req_promise.then(function (json) {
        var payload = JSON.parse(json);
        return payload;
      }).then(function (payload) {
        console.log("PAYLOAD", isAdvancedMode, payload)
        if (isAdvancedMode) {
          buildAdvancedChapterHtml('#reader-content', payload);
          return;
        }
        buildSimpleChapterHtml('#reader-content', payload);


      }).catch(function(err) {
        console.log("Catch ERROR", err)
      })
  })

  // = START IT ----------------------------------------------------------
  addBooks('#selector', Bq.bible_key);
});

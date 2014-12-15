$(function() {
  var submit_btn = $('#submitVerse');
  var verse_input = $('#verseInput');
  var verse = $('#verse');

  submit_btn.click(function (e) {
    var verse_id = verse_input.val();

    var url = 'api/verse/' + verse_id;

    var req = $.get(url, function (data) {
      console.log("return data", data);

      verse.text(data.t)
    })

  })

});
$.getJSON("/true", function(data) {
    for (let i = 0; i < data.length; i++) {

        // Tag Elements
        let div = $("<div>")
        let h4 = $("<h4>")
        let p = $("<p>")
        let img = $("<img>")
        let a = $("<a>")
        let notes = $("<button>")
        let button = $("<button>")

        // Appending Data to Elements
        h4.text(data[i].title)
        p.text(data[i].summary)
        a.attr("href", data[i].link)
        a.attr("target", "_blank")
        a.html(h4)
        img.attr("src", data[i].img)

        // Creating Notes Button
        notes.attr("type", "button")
        notes.attr("data-id", data[i]._id)
        notes.addClass("btn btn-danger notes")
        notes.text("Article Notes")

        // Creating Delete Button
        button.attr("type", "button")
        button.attr("data-id", data[i]._id)
        button.addClass("btn btn-danger delete")
        button.text("Remove From Saved")
        
        // Appending Elements to a Div
        div.append(img, a, p, notes, button)
        div.addClass("singleArticle")
        div.attr("data-id-master", data[i]._id)

        // Appending the Div to the Page
        $("#articles").append(div)
    }
})

// Unsave Article Button Listener
$(document).on("click", ".delete", function () {

  let thisId = $(this).attr("data-id")

  // AJAX Call
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      saved: false
    }
  })
    .then(function (data) {
      console.log(data)
    })
})

// Show Notes Button Listener
$(document).on("click", ".notes", function () {
    let thisId = $(this).attr("data-id")

    // AJAX Call
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function (data) {
        console.log(data)
      })

    // Tag Elements for an Existing Note
    let exists = $("<div>")
    let p = $("<p>")

    exists.addClass("oldNotes")

    // Logic for adding notes text goes here:

    exists.append(p)

    // Tag Elements for New Note
    let div = $("<div>")
    let hr = $("<hr>")
    let h4 = $("<h4>")
    let textarea = $("<textarea>")
    let br = $("<br>")
    let button = $("<button>")
    let shrink = $("<button>")

    // Appending Data to Elements
    h4.text("Notes")
    textarea.attr("placeholder", "Type your note here:")
    textarea.addClass("notesBox")
    button.addClass("btn btn-danger submit")
    button.attr("data-id-submit", thisId)
    button.text("Submit")
    shrink.addClass("btn btn-danger shrink")
    shrink.text("Close")
    
    // Appending Elements to a Div
    div.append(hr, h4, textarea, br, button, shrink)
    div.addClass("notesDiv")
    
    // Appending Div to the Page
    $(".singleArticle[data-id-master='" + thisId + "']").append(div)
})

// Close Notes Button Listener
$(document).on("click", ".shrink", function () {
    $(".notesDiv").empty()
})

// Close Notes Button Listener
$(document).on("click", ".submit", function () {
  let thisId = $(this).attr("data-id-submit")

  // AJAX Call
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      body: $(".notesBox").val().trim()
    }
  })
    .then(function (data) {
      console.log(data)

      $(".notesBox").val("")
    })
})
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

        // Creating Delete Button
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

        // Appending the Div to the Page
        $("#articles").append(div)
    }
})

// Unsave Article Button
$(document).on("click", ".delete", function() {
    
    var thisId = $(this).attr("data-id")
  
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        saved: false
      }
    })
      .then(function(data) {
        console.log(data)
      })
  })
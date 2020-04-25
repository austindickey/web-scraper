$.getJSON("/articles", function(data) {
    for (let i = 0; i < data.length; i++) {

        // Tag Elements
        let div = $("<div>")
        let h4 = $("<h4>")
        let p = $("<p>")
        let img = $("<img>")
        let a = $("<a>")
        let button = $("<button>")

        // Appending Data to Elements
        h4.text(data[i].title)
        p.text(data[i].summary)
        a.attr("href", data[i].link)
        a.attr("target", "_blank")
        a.html(h4)
        img.attr("src", data[i].img)

        // Creating Save Button
        button.attr("type", "button")
        button.attr("data-id", data[i]._id)
        button.addClass("btn btn-danger save")
        button.text("Save Article")
        
        // Appending Elements to a Div
        div.append(img, a, p, button)
        div.addClass("singleArticle")

        // Appending the Div to the Page
        $("#articles").append(div)
    }
})

// Save Article Button
$(document).on("click", ".save", function() {
    
    var thisId = $(this).attr("data-id")
  
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        saved: true
      }
    })
      .then(function(data) {
        console.log(data)
      })
  })
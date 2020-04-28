# web-scraper

This is a website that scrapes NFL stories from https://www.usatoday.com/. The articles are then saved in a mongo database. You can save specific articles from the scraped list if you desire to do so.

Deployed website url: https://newsball.herokuapp.com/

---

### **NPM Dependencies**

* cheerio
* express
* mongojs
* mongoose
* path

---

### **Initial Setup**
If you want to set this app up locally, navigate to the folder in your terminal, and install all the necessary dependencies with:

```
npm i
```

---

### **How To Utilize Friend Finder**

Run the following code in your terminal:

```
node server
```

This will initiate a website running on http://localhost:8000/

Click the scrape articles button in the navbar, to pull the data to the page
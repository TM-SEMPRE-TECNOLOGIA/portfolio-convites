# -*- coding: utf-8 -*-
with open("templates/sacred-garden/index.html", "r", encoding="utf-8", errors="ignore") as f:
    c = f.read()

# Replace swans header with our clean romantic swans art
c = c.replace("https://pub-96ce671efbac4dbfbc89b044c631a913.r2.dev/ChatGPT%20Image%20Jun%2023%2C%202026%2C%2004_40_29%20PM.png", "../../assets/images/swans-garden-header.jpg")
# Replace mosque drawing with our elegant Brazilian chapel sketch
c = c.replace("https://thb.tildacdn.net/tild3637-3939-4864-a263-333836383139/-/resize/20x/ChatGPT_Image_May_25.png", "../../assets/images/chapel-garden.jpg")
c = c.replace("https://static.tildacdn.net/tild3637-3939-4864-a263-333836383139/ChatGPT_Image_May_25.png", "../../assets/images/chapel-garden.jpg")

with open("templates/sacred-garden/index.html", "w", encoding="utf-8") as f:
    f.write(c)
print("Updated sacred-garden images successfully")

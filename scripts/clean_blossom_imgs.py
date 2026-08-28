with open("templates/blossom-oud/index.html", "r", encoding="utf-8", errors="ignore") as f:
    c = f.read()

# Replace Gemini Generated Arabic header image if present with clean gold floral frame
c = c.replace("https://thb.tildacdn.net/tild6233-6433-4662-a437-316665346637/-/resize/20x/Gemini_Generated_Ima.png", "")
c = c.replace("https://static.tildacdn.net/tild6233-6433-4662-a437-316665346637/Gemini_Generated_Ima.png", "")

with open("templates/blossom-oud/index.html", "w", encoding="utf-8") as f:
    f.write(c)
print("Cleaned blossom-oud images")

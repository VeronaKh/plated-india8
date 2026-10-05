# Plated
Alle Dateien (html, css, js, jpg) liegen absichtlich im selben Ordner, ganz oben im Repo.
GitHub: Settings > Pages > Deploy from branch > main / (root).
Optionales Hero-Video: hero.mp4 (unter 25 MB) in denselben Ordner legen.

## Bestell-Mails einrichten (EmailJS, kostenlos)
1. Auf emailjs.com Konto erstellen, unter "Email Services" das Restaurant-Gmail verbinden (Service ID kopieren).
2. Unter "Email Templates" ein Template anlegen: To Email = {{to_email}}, Subject = {{subject}}, Inhalt = {{{message}}} (drei geschweifte Klammern).
3. Unter Account die Public Key kopieren.
4. In script.js ganz oben bei CFG die drei Werte eintragen und restaurantEmail anpassen.

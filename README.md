# Shopowo.pl — instrukcja krok po kroku (Android, tylko przeglądarka)

Projekt to zwykłe pliki HTML/CSS/JS — nie wymaga budowania ani serwera. Działa na GitHub Pages
także z adresu repozytorium (używa ścieżek względnych i adresów z #).

Pliki: `index.html`, `styles.css`, `app.js`, `products.js` (dane produktów — tu edytujesz ofertę).

## 1. Repozytorium na GitHubie
1. Otwórz w Chrome: github.com i zaloguj się (lub załóż darmowe konto).
2. Menu Chrome (⋮) → zaznacz **Wersja na komputer** (ułatwia obsługę ustawień).
3. Kliknij **+** → **New repository**. Nazwa: `shopowo`. Wybierz **Public**. Kliknij **Create repository**.

## 2. Dodanie plików
1. W repozytorium kliknij **uploading an existing file** (lub **Add file → Upload files**).
2. Wybierz 4 pliki: `index.html`, `styles.css`, `app.js`, `products.js`.
3. Kliknij **Commit changes**.

## 3. Włączenie GitHub Pages
1. **Settings → Pages**.
2. W „Build and deployment": Source = **Deploy from a branch**, Branch = **main**, folder **/(root)** → **Save**.
3. Po 1–3 minutach zobaczysz adres `https://TWOJ-LOGIN.github.io/shopowo/`. Otwórz go i sprawdź sklep.

## 4. Domena shopowo.pl (home.pl)
1. Na GitHubie: **Settings → Pages → Custom domain** → wpisz `shopowo.pl` → **Save**.
2. W panelu home.pl otwórz zarządzanie DNS domeny shopowo.pl (nazwy menu mogą się różnić).
3. Usuń stare rekordy A/AAAA dla `shopowo.pl` (np. parking domeny), po czym dodaj 4 rekordy **A** dla `shopowo.pl`:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Dodaj rekord **CNAME**: nazwa `www`, wartość `TWOJ-LOGIN.github.io`.
5. Poczekaj (od kilku minut do 24 h) na propagację DNS.

## 5. HTTPS
1. Wróć do **Settings → Pages**. Gdy pojawi się zielone potwierdzenie domeny, zaznacz **Enforce HTTPS**.
2. Jeśli opcja jest nieaktywna, odczekaj i odśwież — certyfikat generuje GitHub automatycznie.

## 6. Test na telefonie
Otwórz `https://shopowo.pl`, sprawdź: menu (☰), wyszukiwarkę, filtry, dodanie do koszyka, usuwanie, koszyk po odświeżeniu strony.

## Co wymaga zewnętrznej usługi (nie ma tego w projekcie)
- **Zamówienia i płatności:** operator płatności (np. Stripe Checkout, Przelewy24, PayU) + backend lub usługa no-code. Przycisk w koszyku jest zaślepką (`CONFIG.checkoutUrl` w `app.js`).
- **Dropshipping, stany magazynowe, ceny:** API dostawcy wywoływane z serwera (np. funkcje serverless), nie z przeglądarki.
- **E-maile transakcyjne, analityka:** zewnętrzne usługi.
- **Sekrety:** klucze API i hasła NIGDY nie trafiają do plików frontendu — tylko do backendu/usługi.
- **Przed prawdziwą sprzedażą:** uzupełnij regulamin, politykę prywatności, zwroty i dane firmy (wymogi prawne).

/* ==========================================================================
   GALERIA HERBÓW — dane miejscowości
   --------------------------------------------------------------------------
   Aby dodać nową miejscowość:
   1. Wgraj plik herbu do  assets/herby/<slug>.svg  (lub .png — zmień pole "herb").
   2. Skopiuj jeden z obiektów poniżej, zmień "slug" i uzupełnij pola.
   3. Pole "typ": "miasto" albo "gmina".
   4. "strona" (opcjonalnie) — adres oficjalnej strony miasta/gminy; przycisk
      „Zaplanuj wizytę” w karcie herbu otworzy ją w nowej karcie (bez pola → formularz kontaktowy).
   5. "zweryfikuj: true" wyświetla na karcie dopisek, że opis czeka na
      zatwierdzenie przez urząd — usuń go po weryfikacji treści.
   ========================================================================== */

window.HERBY = [
  {
    slug: 'krakow',
    nazwa: 'Kraków',
    typ: 'miasto',
    wojewodztwo: 'małopolskie',
    herb: 'assets/herby/krakow.webp',
    krotko: 'Królewskie miasto pod Wawelem',
    symbolika:
      'W błękitnym polu czerwony, ceglany mur z trzema blankowanymi wieżami i otwartą bramą o złotych wrotach i podniesionej bronie; w bramie biały orzeł w koronie, a nad tarczą korona. ' +
      'Mury i wieże mówią o sile i bezpieczeństwie miasta, a orzeł w bramie i korona — o jego królewskim charakterze i związku z historią państwa polskiego.',
    historia:
      'Przez stulecia stolica Polski i miejsce koronacji królów. Lokowany na prawie magdeburskim w 1257 roku, był ośrodkiem władzy, nauki i kultury — ' +
      'tu działa Akademia Krakowska, jeden z najstarszych uniwersytetów w Europie Środkowej. Stare Miasto znalazło się na pierwszej liście światowego dziedzictwa UNESCO w 1978 roku.',
    ciekawostki: [
      'Hejnał mariacki grany co godzinę urywa się w połowie melodii — na pamiątkę strażnika trafionego strzałą.',
      'Legenda o Smoku Wawelskim to jedna z najstarszych polskich opowieści.',
      'Rynek Główny należy do największych średniowiecznych placów miejskich w Europie.'
    ],
    zobacz: ['Wzgórze Wawelskie', 'Rynek Główny i Sukiennice', 'Bazylika Mariacka z ołtarzem Wita Stwosza', 'Kazimierz'],
    zaproszenie: 'Przejdź Drogą Królewską od Barbakanu po Wawel i poczuj, jak historia Polski ożywa na każdym kroku.',
    strona: 'https://www.turystykakrakow.pl/'
  }
];

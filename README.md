Zadanie 1 na: http://www.bootcamp.vazco.eu/

podstawowy layout:
![alt tag](http://i68.tinypic.com/23idx6s.png)

akordeon Report:
![alt tag](http://i65.tinypic.com/mbo57q.png)


TODO:
1) select form Flatmates in AddNewItem (using react-select?)
2) add login to app: remove User and use instead accounts-ui i accounts-password (username instead of nick)
3) + some task as private, "uregulowano" tylko dla własciciela (contractor)
4) personal bilance of flatmate?
5) walidation to forms other than Materialize.toast


Zadanie 2:

Waszym poprzednim zadaniem było napisanie front-end’u aplikacji, która pomoże współlokatorom pilnować domowych rozliczeń. Aplikacja ta miała działać w oparciu o local storage, który wymaga dokonywania rozliczeń w ramach jednej tylko przeglądarki. 

Aktualnie przyszedł czas na dodanie naszej aplikacji odrobiny mobilności.
Chcielibyśmy aby dane zapisywane były w naszej bazie danych (MongoDB), a strona umożliwiała rejestrowanie wielu grup (mieszkań). Każdy lokator powinien mieć możliwość dodania zobowiązań jakie mają inni wobec niego. Lokatorzy mogą mieć wgląd jedynie do danych grup, których są członkami.

Dodatkowym atutem będzie system komunikacji w grupie (czat grupowy).

Podsumowując do zrobienia jest:
rejestracja użytkowników
rejestracja wielu grup
tworzenie zobowiązań (w MongoDB)
polityka dostępu
dodatkowo dla chętnych - chat

Ważne aby zadanie zostało wykonane zgodnie z założeniami.

Zadanie 1:
Napisz front-end aplikacji, która pomoże współlokatorom pilnować domowych rozliczeń.
Lokatorzy mogą robić zakupy dla kogoś innego bądź te dotyczące wszystkich - wówczas cenna powinna być dzielona na każdego z domowników.

Pola, które powinny się znaleźć w formularzu:
Kupujący,
lista produktów,
kto winien.

W dowolnym momencie, klikając w przycisk raport, powinniśmy móc wstanie zobaczyć
prostą listę kto ile jest winien lub ile otrzyma (jeśli jest na plusie).

Każdą pozycję w raporcie powinniśmy móc zatwierdzić jako “uregulowana”,
celem zerowania zobowiązań poszczególnych lokatorów.

Na potrzeby tego zadania, aplikacja może zapisywać informacje w local storage w
przeglądarce. Cały interface użytkownika zostawiony jest do twojej własnej inwencji twórczej.

Pamiętaj jednak, że twoja aplikacja będzie rozwijana w następnych zadaniach.
Dlatego postaraj się o potencjalne możliwości rozwoju.

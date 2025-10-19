# Prompt Master - Twój Drugi Pilot Inżynierii Promptów AI

Prompt Master to aplikacja full-stack zaprojektowana, aby pomagać użytkownikom w generowaniu, optymalizowaniu i zarządzaniu wysokiej jakości promptami dla różnych Dużych Modeli Językowych (LLM), takich jak GPT-4, Claude, Gemini i inne.

## Cel i Główne Funkcje

Celem aplikacji jest uproszczenie procesu tworzenia skutecznych promptów, co pozwala na uzyskanie lepszych rezultatów od modeli AI.

-   **Optymalizacja pod Konkretne Modele**: Automatycznie dostosowuje strukturę i treść promptu do najlepszych praktyk dla wybranego modelu (np. GPT-4, Claude).
-   **Konfiguracja Parametrów**: Umożliwia łatwą regulację kluczowych parametrów, takich jak `temperatura` (kreatywność), `maksymalna długość` i `poziom szczegółowości`.
-   **Edytor i Podgląd na Żywo**: Interfejs z dwoma panelami pozwala na bieżąco obserwować, jak wprowadzane zmiany wpływają na finalną wersję zoptymalizowanego promptu.
-   **Biblioteka Szablonów**: Zawiera gotowe do użycia szablony promptów dla różnych zastosowań, które można łatwo modyfikować i wykorzystywać jako punkt wyjścia.
-   **Wsparcie dla Różnych Trybów**: Umożliwia wybór trybu optymalizacji (np. `Akademicki`, `Kreatywny`, `Techniczny`), aby lepiej dopasować styl i ton odpowiedzi AI.

## Architektura Projektu

Aplikacja składa się z dwóch głównych części:

-   **Frontend**: Zbudowany w oparciu o **React**, **TypeScript** i **Vite**. Komunikuje się z backendem za pomocą API REST. Za wygląd odpowiada **Tailwind CSS**.
-   **Backend**: Serwer **Node.js** z frameworkiem **Express.js**. Odpowiada za logikę biznesową, w tym za algorytmy optymalizacji promptów. Jako baza danych wykorzystywana jest **MongoDB** do przechowywania szablonów.

Obie części są skonteneryzowane za pomocą **Docker**, a ich uruchomienie i wzajemna komunikacja są zarządzane przez **Docker Compose**.

## Instalacja i Uruchomienie

### Wymagania
-   Zainstalowany [Docker](https://www.docker.com/get-started) i Docker Compose na Twojej maszynie.

### Uruchomienie
1.  Otwórz terminal w głównym katalogu projektu.
2.  Uruchom następującą komendę:
    ```bash
    docker-compose up --build
    ```
3.  Aplikacja będzie dostępna w przeglądarce pod adresem `http://localhost:3000`.

## Instrukcje Użytkowania

1.  **Wybierz Model LLM**: Z listy po lewej stronie wybierz model AI, dla którego chcesz zoptymalizować prompt. Pod selektorem wyświetlą się kluczowe informacje o modelu, takie jak limit tokenów i jego mocne strony.
2.  **Skonfiguruj Optymalizację**:
    -   **Tryb**: Wybierz tryb, który najlepiej pasuje do charakteru zadania (np. `Biznesowy` do pisania maili, `Akademicki` do researchu).
    -   **Parametry**: Użyj suwaków, aby dostosować `temperaturę`, `maksymalną długość` i `poziom szczegółowości` odpowiedzi.
3.  **Wpisz Swój Prompt**: W panelu "Edytor Promptu" wpisz tekst, który chcesz zoptymalizować. Możesz też wybrać gotowy szablon z biblioteki poniżej.
4.  **Obserwuj Wynik**: W panelu "Zoptymalizowany Prompt" na bieżąco będzie pojawiać się wersja twojego promptu, dostosowana do wybranego modelu i parametrów.
5.  **Kopiuj i Użyj**: Kliknij ikonę schowka, aby skopiować gotowy prompt i użyć go w wybranym modelu językowym.

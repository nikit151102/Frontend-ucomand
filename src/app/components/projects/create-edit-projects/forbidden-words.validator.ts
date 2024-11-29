import { AbstractControl, ValidationErrors } from '@angular/forms';

export function forbiddenWordsValidator(forbiddenWordsList: { letter: string; words: string[] }[]): any {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null;

        // Преобразуем текст в массив нормализованных слов
        const wordsInInput = normalizeInput(control.value);

        // Создаем массив всех запрещённых слов с учётом склонений
        const allForbiddenWords = forbiddenWordsList.flatMap(item =>
            item.words.map(word => createRegExpForWord(word))
        );

        // Ищем запрещённые слова
        const forbiddenWordsFound = wordsInInput.filter((word: string) =>
            allForbiddenWords.some(regex => regex.test(word))
        );

        return forbiddenWordsFound.length > 0
            ? { forbiddenWords: forbiddenWordsFound } 
            : null;
    };
}

// Создание регулярного выражения для слова
function createRegExpForWord(word: string): RegExp {
    const endings = [
        '',   // точное совпадение
        'а', 'ов', 'ам', 'ами', 'ах', // склонения
        'ы', 'и',                     // множественное число
        'е', 'у', 'ом', 'ой', 'ею'    // другие окончания
      ];

    const basePattern = word.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'); // Экранируем спецсимволы
    const pattern = `^${basePattern}(${endings.join('|')})?$`; // Учитываем окончания
    return new RegExp(pattern, 'i'); // Игнорируем регистр
}


function normalizeInput(input: string): string[] {
    return input
        .replace(/[.,!?;:()\[\]{}"']/g, '') // Убираем знаки препинания
        .split(/[\s-]+/) // Разделяем по пробелам и дефисам
        .map((word: string) => word.toLowerCase()); // Приводим к нижнему регистру
}

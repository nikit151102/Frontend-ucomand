import { AbstractControl, ValidationErrors } from '@angular/forms';
import { forbiddenWordsList } from './bad-words';

export function forbiddenWordsValidator(): any {
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


function normalizeInput(input: any): string[] {
    if (typeof input !== 'string') {
        input = String(input); // приводим к строке на всякий случай
    }

    return input
        .replace(/[.,!?;:()\[\]{}"']/g, '') // убираем знаки препинания
        .split(/[\s-]+/) // разделяем по пробелам и дефисам
        .map((word: string) => word.toLowerCase());
}

export function getAlphabet(locale: string): string[] {
  // 1st caracter should be a space
  switch (locale) {
    case 'fr':
      return [
        ...' DUlâ19MfühtùèÙ4mcÊE.QPgO!éôxîFA6Ce-0ÜGzuVHnSTZasÔjdrX7L?ÈïbwyRIÏ2Îi5Jà8Éop3qêvBWN',
      ];
    case 'nl':
      return [
        ...' gz4BCAf5ÎTxnmàujHQtKdOJvprîâÙa3ÈÉükFïWlLoêq-w.6XSNèMU7!ZRhbsIÜEGÊc1Pe8i?0Vù9ÏDé2',
      ];
    case 'ru':
      return [
        ...' ЕбявЩфЗПиёлС!ЪшмУЫ3еЦуцд-нЯтЬИОь2ЧШБр14Э?хз6ДЮъю.п8гФйВЙНРчХКМэГк95ТЛЁаыжщ7АЖ0ос',
      ];
    default:
      return [...' NcTv7lzqDZIKBr4ntuW53OmJVMCdYPx-jswayh2po8XRL6!9SEei.HQkF0fU?b1gAG'];
  }
}

export const DEFAULT_CHAR_SPACING_Y = 4;

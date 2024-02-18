export type TextRange = { from: number; to: number };

export const smartMatch = (input: string, searchText: string): Array<TextRange> | null => {
  const inputSections = splitIntoSections(input);
  const searchSections = splitIntoSections(searchText);

  const matches: TextRange[] = [];
  let currentMatchIndex = 0;

  for (let i = 0; i < inputSections.length; i++) {
    const inputSection = inputSections[i];
    const searchSection = searchSections[currentMatchIndex];

    if (inputSection.startsWith(searchSection)) {
      matches.push({ from: i, to: i + searchSection.length - 1 });
      currentMatchIndex++;

      // If all search sections have been matched, stop searching
      if (currentMatchIndex === searchSections.length) {
        return matches;
      }
    }
  }

  // If not all search sections were matched, return null
  return matches;
};

export function splitIntoSections(str: string): string[] {
  const sections: string[] = [];
  let currentSection = "";

  for (const char of str) {
    if (/[a-zA-Z0-9]/.test(char)) {
      currentSection += char.toLowerCase();
    } else if (currentSection) {
      sections.push(currentSection);
      currentSection = "";
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}


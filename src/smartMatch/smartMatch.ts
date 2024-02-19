export type TextRange = { from: number; to: number };

export const smartMatch = (input: string, searchText: string): Array<TextRange> | null => {
  const inputSections = splitIntoSections(input);
  const searchSections = splitIntoSections(searchText);

  const matches: TextRange[] = [];
  let currentMatchIndex = 0;
  let inputWordIndex = 0;

  for (let i = 0; i < inputSections.length; i++) {
    const inputSection = inputSections[i];
    const searchSection = searchSections[currentMatchIndex];

    if (inputSection.startsWith(searchSection)) {
      matches.push({
        from: inputWordIndex + i,
        to: inputWordIndex + i + (searchSection.length - 1)
      });
      currentMatchIndex++;

      if (currentMatchIndex === searchSections.length) {
        return matches;
      }
    } else {
      inputWordIndex += inputSections[i].length - 1;
    }
  }

  return matches;
};

export function splitIntoSections(str: string): string[] {
  const sections: string[] = [];
  let currentSection = "";

  for (const char of str) {
    if (/[a-z0-9/]/.test(char)) {
      currentSection += char;
    } else if(currentSection.length === 0 && /[A-Z]/.test(char)) {
      currentSection += char.toLowerCase();
    } else if (currentSection) {
      sections.push(currentSection);
      sections.push(char);
      currentSection = "";
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}


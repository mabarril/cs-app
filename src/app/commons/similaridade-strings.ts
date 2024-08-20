// Função para calcular a distância de Levenshtein
function levenshteinDistance(a : string, b : string) {
  const matrix = [];

  // Inicializa a primeira linha e coluna da matriz
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Preenche a matriz
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substituição
          matrix[i][j - 1] + 1,     // Inserção
          matrix[i - 1][j] + 1      // Remoção
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Função para calcular a similaridade com base na distância de Levenshtein
function similarity(a: string, b:string) {
  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  return (maxLength - distance) / maxLength;
}

// Exemplo de uso
// const string1 = "kitten";
// const string2 = "sitting";
// const similarityScore = similarity(string1, string2);
// console.log(`A similaridade entre "${string1}" e "${string2}" é: ${similarityScore}`);